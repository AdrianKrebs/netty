import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReducePage } from './reduce.page';

const routes: Routes = [
  {
    path: '',
    component: ReducePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReducePageRoutingModule {}
