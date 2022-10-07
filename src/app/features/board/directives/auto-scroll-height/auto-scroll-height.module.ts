import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoScrollHeightDirective } from './auto-scroll-height.directive';


@NgModule({
  declarations: [
    AutoScrollHeightDirective,
  ],
  exports: [
    AutoScrollHeightDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class AutoScrollHeightModule {
}
