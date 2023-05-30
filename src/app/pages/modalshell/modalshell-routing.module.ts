import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalshellPage } from './modalshell.page';

const routes: Routes = [
  {
    path: '',
    component: ModalshellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalshellPageRoutingModule {}
