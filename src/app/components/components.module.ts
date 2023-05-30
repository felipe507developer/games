import { NumberListComponent } from './number-list/number-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    NumberListComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [
    NumberListComponent
  ]
})
export class ComponentsModule { }
