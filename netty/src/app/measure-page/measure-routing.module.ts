import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeasurePage } from './measure.page';

const routes: Routes = [
  {
    path: '',
    component: MeasurePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
