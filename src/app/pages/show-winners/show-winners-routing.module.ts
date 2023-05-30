import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowWinnersPage } from './show-winners.page';

const routes: Routes = [
  {
    path: '',
    component: ShowWinnersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowWinnersPageRoutingModule {}
