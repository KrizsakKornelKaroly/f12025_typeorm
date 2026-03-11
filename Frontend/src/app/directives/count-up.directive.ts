import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnChanges {
  @Input('appCountUp') targetValue: number = 0;
  @Input() duration: number = 2000;

  private currentValue = 0;
  private animationId: any;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['targetValue']) {
      this.animate(this.currentValue, this.targetValue);
    }
  }

  private animate(start: number, end: number): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    const startTime = performance.now();
    const diff = end - start;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);

      this.currentValue = Math.round(start + diff * eased);
      this.el.nativeElement.textContent = this.currentValue;

      if (progress < 1) {
        this.animationId = requestAnimationFrame(step);
      }
    };

    this.animationId = requestAnimationFrame(step);
  }
}
