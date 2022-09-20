import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoScrollHeight]',
})
export class AutoScrollHeightDirective {

  constructor(public elementRef: ElementRef) {
  }

  @HostListener('focus') onFocus() {
    this.onKeyUp();
  }

  @HostListener('keyup') onKeyUp() {
    const scrollHeight = this.elementRef.nativeElement.scrollHeight;
    if (scrollHeight <= 250) {
      this.elementRef.nativeElement.style.height = scrollHeight + 2 + 'px';
      this.elementRef.nativeElement.style.overflow = 'hidden';
    } else if (scrollHeight > 250) {
      this.elementRef.nativeElement.style.height = 250 + 'px';
      this.elementRef.nativeElement.style.overflow = 'auto';
    }
  }

}
