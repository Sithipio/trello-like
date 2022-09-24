import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutoScrollHeight]',
})
export class AutoScrollHeightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('focus') onFocus() {
    this.onKeyUp();
  }

  @HostListener('keyup') onKeyUp() {
    const scrollHeight = this.el.nativeElement.scrollHeight;
    const elem = this.el.nativeElement;
    if (scrollHeight <= 250) {
      this.renderer.setStyle(elem, 'height', scrollHeight + 2 + 'px');
      this.renderer.setStyle(elem, 'overflow', 'hidden');
    } else if (scrollHeight > 250) {
      this.renderer.setStyle(elem, 'height', 250 + 'px');
      this.renderer.setStyle(elem, 'overflow', 'auto');
    }
  }

}
