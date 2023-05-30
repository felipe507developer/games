import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NumbersService } from 'src/app/services/numbers.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  numero!: number;
  currentDate!: string;
  constructor(private modalController: ModalController, private number: NumbersService) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son base 0, por lo tanto, se suma 1
    const year = date.getFullYear();

    this.currentDate = `${day}/${month}/${year}`;
  }

  ngOnInit(){
    
  }
  dismiss() {
    this.modalController.dismiss();
  }

  guardar() {
    // Aquí puedes hacer lo que necesites con el número ingresado, por ejemplo, enviarlo a un servicio o realizar alguna acción.
    
    const title = 'Loteria: ' + this.currentDate;
    this.number.generarJson(this.numero, title);
    this.modalController.dismiss();
  }

}
