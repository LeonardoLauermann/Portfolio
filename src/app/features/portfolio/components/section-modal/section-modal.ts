import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  input,
  output,
} from '@angular/core';
import type { PortfolioSection } from '../main-menu/main-menu';
import { DIALOGUE_CONTENT } from '../dialogue/dialogue';
import { Skills } from '../skills/skills';

@Component({
  selector: 'app-section-modal',
  imports: [Skills],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './section-modal.html',
  styleUrl: './section-modal.scss',
})
export class SectionModal implements AfterViewInit {
  readonly section = input.required<PortfolioSection>();
  readonly closed = output<void>();
  readonly content = DIALOGUE_CONTENT;
  @ViewChild('sectionDialog')
  private dialogElement?: ElementRef<HTMLDialogElement>;
  private previousFocus: HTMLElement | null = null;

  ngAfterViewInit(): void {
    const dialog = this.dialogElement?.nativeElement;
    if (dialog && !dialog.open) {
      this.previousFocus = document.activeElement as HTMLElement | null;
      dialog.showModal();
    }
  }

  close(): void {
    const dialog = this.dialogElement?.nativeElement;
    if (dialog?.open) dialog.close();
  }

  onClosed(): void {
    this.closed.emit();
    this.previousFocus?.focus();
  }
}
