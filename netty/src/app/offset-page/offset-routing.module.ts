import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffsetPage } from './offset.page';

const routes: Routes = [
  {
    path: '',
    component: OffsetPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
