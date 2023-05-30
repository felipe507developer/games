import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoteryPageRoutingModule } from './lotery-routing.module';

import { LoteryPage } from './lotery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoteryPageRoutingModule
  ],
  declarations: [LoteryPage]
})
export class LoteryPageModule {}
