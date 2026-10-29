import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
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
export class SectionModal implements AfterViewInit, OnDestroy {
  readonly section = input.required<PortfolioSection>();
  readonly closed = output<void>();
  readonly content = DIALOGUE_CONTENT;
  private readonly dialogElement =
    viewChild<ElementRef<HTMLDialogElement>>('sectionDialog');
  private previousFocus: HTMLElement | null = null;
  private animationContext?: gsap.Context;
  private readonly closing = signal(false);

  ngAfterViewInit(): void {
    const dialog = this.dialogElement()?.nativeElement;
    if (dialog && !dialog.open) {
      this.previousFocus = document.activeElement as HTMLElement | null;
      dialog.showModal();
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.animationContext = gsap.context(() => {
          gsap.from(dialog, {
            opacity: 0,
            y: 8,
            scale: 0.98,
            duration: 0.3,
            ease: 'power2.out',
          });
          const rows = Array.from(dialog.querySelectorAll('.skill-row')).slice(
            0,
            8,
          );
          if (rows.length) {
            gsap.from(rows, {
              opacity: 0,
              x: -8,
              duration: 0.2,
              stagger: 0.035,
            });
          }
        }, dialog);
      }
    }
  }

  close(): void {
    const dialog = this.dialogElement()?.nativeElement;
    if (!dialog?.open || this.closing()) return;
    if (!this.animationContext) {
      dialog.close();
      return;
    }
    this.closing.set(true);
    this.animationContext.add(() => {
      gsap.to(dialog, {
        opacity: 0,
        y: 10,
        scale: 0.98,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => dialog.close(),
      });
    });
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.close();
  }

  onClosed(): void {
    this.closed.emit();
    this.previousFocus?.focus();
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }
}
