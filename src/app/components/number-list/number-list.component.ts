import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Numbers } from 'src/app/interface/interface';

@Component({
  selector: 'app-number-list',
  templateUrl: './number-list.component.html',
  styleUrls: ['./number-list.component.scss'],
})
export class NumberListComponent  implements OnInit {

  constructor(private param: NavParams) { }

  ngOnInit() {
    // this.item = this.param.get('item');
  }

  async openModal(id: number){
   
  }
}
