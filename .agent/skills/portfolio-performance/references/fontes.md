# Fontes: subconjuntos e fallbacks com métricas

## Subconjuntos

`npm run fonts:subset` instala temporariamente `subset-font` e `fontkit` (`--no-save`) e roda `tools/subset-fonts.mjs`, que:

1. gera `<Nome>.latin.woff2` para cada woff2 de `apps/shared/styles/src/fonts` (intervalo "latin" do Google Fonts mais U+25CF);
2. lê o `cmap` do arquivo completo e grava em `apps/shared/styles/src/lib/_font-ranges.scss`:
   - `$font-latin-range`;
   - `$font-extended-ranges`: os caracteres do arquivo completo fora do latim, com intervalos mesclados (lacunas até 128) sem cobrir os blocos de setas, formas, símbolos e dingbats.

Onde as faixas se sobrepõem, o subconjunto latino vence porque `_fonts.scss` o declara depois do arquivo completo.

## Fallbacks

Os valores de `size-adjust`, `ascent-override` e `descent-override` em `_fonts.scss` foram calculados com o fontkit:

- `size-adjust` = largura média de um texto de amostra em português na Roboto ÷ a mesma largura na fonte do sistema (Arial, Arial Bold, Georgia, Courier New);
- `ascent-override` = `hhea.ascent / unitsPerEm / size-adjust` (o mesmo vale para descent; line-gap 0).

Script de referência (rodar numa pasta temporária com `npm i fontkit@2`):

```js
const fontkit = require('fontkit');
const sample =
  'Um CRM que cresce com o seu negócio sem te cobrar pelo que você ainda não usa. 0123456789';
const width = f => f.layout(sample).glyphs.reduce((a, g) => a + g.advanceWidth, 0) / f.unitsPerEm;
const web = fontkit.openSync('apps/shared/styles/src/fonts/roboto/Roboto-Regular.woff2');
const sys = fontkit.openSync('C:/Windows/Fonts/arial.ttf');
const sa = width(web) / width(sys);
console.log({
  sizeAdjust: sa,
  ascent: web.hhea.ascent / web.unitsPerEm / sa,
  descent: -web.hhea.descent / web.unitsPerEm / sa,
});
```

Valores atuais: Roboto/Arial 99,25%, 93,47% e 24,6%; Roboto SemiBold/Arial Bold 93,97%, 98,73% e 25,98%; Roboto Serif/Georgia 115,12%, 80,53% e 21,2%; Roboto Mono/Courier New 100%, 104,79% e 27,1%.
