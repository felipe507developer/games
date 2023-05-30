import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./view-message/view-message.module').then( m => m.ViewMessagePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'lotery/:id',
    loadChildren: () => import('./pages/lotery/lotery.module').then( m => m.LoteryPageModule)
  },
  {
    path: 'modalshell',
    loadChildren: () => import('./pages/modalshell/modalshell.module').then( m => m.ModalshellPageModule)
  },
  {
    path: 'list-user',
    loadChildren: () => import('./pages/list-user/list-user.module').then( m => m.ListUserPageModule)
  },  {
    path: 'show-winners',
    loadChildren: () => import('./pages/show-winners/show-winners.module').then( m => m.ShowWinnersPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
