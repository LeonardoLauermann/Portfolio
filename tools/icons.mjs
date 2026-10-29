import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
const NAMES_URL =
  'https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsOutlined%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints';
const sourceRoot = join('src');
const indexPath = join('src', 'index.html');
const check = process.argv.includes('--check');

const validNames = await fetch(NAMES_URL)
  .then((response) =>
    response.ok
      ? response.text()
      : Promise.reject(new Error(String(response.status))),
  )
  .then(
    (text) =>
      new Set(
        text
          .split('\n')
          .map((line) => line.split(' ')[0])
          .filter(Boolean),
      ),
  )
  .catch((error) => {
    console.warn(
      `Aviso: não foi possível baixar a lista oficial de ícones (${error.message}); sem validação.`,
    );
    return null;
  });

function* walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (
      /\.(html|ts)$/.test(entry.name) &&
      !entry.name.endsWith('.spec.ts')
    )
      yield path;
  }
}

const isName = (word) => /^[a-z][a-z0-9_]*$/.test(word);
const found = new Set();
for (const file of walk(sourceRoot)) {
  const text = readFileSync(file, 'utf8');
  const candidates = file.endsWith('.html')
    ? [
        ...text.matchAll(/<[^>]*material-symbols-outlined[^>]*>([^<]*)</g),
      ].flatMap((match) => {
        const content = match[1].trim();
        const dynamicNames = [
          ...content.matchAll(/['"]([a-z][a-z0-9_]*)['"]/g),
        ].map((item) => item[1]);
        return content.includes('{{') ? dynamicNames : content ? [content] : [];
      })
    : [...text.matchAll(/\bicon\b\s*:\s*['"]([a-z][a-z0-9_]*)['"]/g)].map(
        (match) => match[1],
      );
  for (const name of candidates) {
    if (!isName(name)) continue;
    if (validNames && !validNames.has(name)) {
      console.warn(
        `Aviso: "${name}" não existe no Material Symbols (${relative('.', file)})`,
      );
      continue;
    }
    found.add(name);
  }
}

const html = readFileSync(indexPath, 'utf8');
const registered =
  html.match(/Material\+Symbols\+Outlined[^"]*?icon_names=([^&"]*)/)?.[1] ?? '';
const names = [
  ...new Set([...found, ...registered.split(',').filter(isName)]),
].sort();
const url = `${FONT_URL}&icon_names=${names.join(',')}&display=block`;
const next = html.replace(
  /https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols\+Outlined[^"]*/,
  url.replaceAll('&', '&amp;'),
);
if (next === html) {
  console.log(`${names.length} ícones; src/index.html já está atualizado.`);
} else if (check) {
  console.error(`src/index.html desatualizado. Rode npm run icons.`);
  process.exitCode = 1;
} else {
  writeFileSync(indexPath, next);
  console.log(`${names.length} ícones gravados em src/index.html.`);
}
