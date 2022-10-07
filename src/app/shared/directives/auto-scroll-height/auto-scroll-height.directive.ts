import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoScrollHeight]',
})
export class AutoScrollHeightDirective {

  constructor(private el: ElementRef) {
  }

  @HostBinding('style.height') elHeight: string;
  @HostBinding('style.overflow') elOverflow: string;

  @HostListener('focus') onFocus() {
    this.onKeyUp();
  }

  @HostListener('keyup') onKeyUp() {
    const scrollHeight = this.el.nativeElement.scrollHeight;

    if (scrollHeight <= 250) {
      this.elHeight = scrollHeight + 2 + 'px';
      this.elOverflow = 'hidden';
    } else if (scrollHeight > 250) {
      this.elHeight = 250 + 'px';
      this.elOverflow = 'auto';
    }
  }

}
