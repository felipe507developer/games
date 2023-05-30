import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalshellPageRoutingModule } from './modalshell-routing.module';

import { ModalshellPage } from './modalshell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalshellPageRoutingModule
  ],
  declarations: [ModalshellPage]
})
export class ModalshellPageModule {}
