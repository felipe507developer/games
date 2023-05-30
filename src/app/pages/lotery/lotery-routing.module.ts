import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoteryPage } from './lotery.page';

const routes: Routes = [
  {
    path: '',
    component: LoteryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoteryPageRoutingModule {}
