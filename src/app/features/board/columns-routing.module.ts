import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColumnsComponent } from './pages/columns/columns.component';

const routes: Routes = [
  {
    path: '',
    component: ColumnsComponent,
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColumnsRoutingModule {
}
