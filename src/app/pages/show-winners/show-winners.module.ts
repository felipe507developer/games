import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowWinnersPageRoutingModule } from './show-winners-routing.module';

import { ShowWinnersPage } from './show-winners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowWinnersPageRoutingModule
  ],
  declarations: [ShowWinnersPage]
})
export class ShowWinnersPageModule {}
