import { AfterContentInit, ChangeDetectorRef, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})

export class AutoFocusDirective implements AfterContentInit {
  @Input() public appAutoFocus: boolean;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {
  }

  public ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
      this.cdr.detectChanges();
    }, 0);
  }
}

