import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NumbersService } from 'src/app/services/numbers.service';

@Component({
  selector: 'app-modalshell',
  templateUrl: './modalshell.page.html',
  styleUrls: ['./modalshell.page.scss'],
})
export class ModalshellPage implements OnInit {

  loteryID!: string;
  numero = 0;
  //_____________________________________
  id!: number;
  number!: string;
  available: number = 0;
  bussy!: number;
  // personas: Personas[];
  //_____________________________________
  quantity: number = 0;
  user: string = '';
  phone: string = '';

  constructor(private modal: ModalController,
    private navParam: NavParams,
    private servicio: NumbersService) { }

  ngOnInit() {
    this.numero = this.navParam.get('id');
    this.loteryID = this.navParam.get('loteryID');
    this.getData();
  }

  getData() {
    this.servicio.getNumeroPorId(this.loteryID, this.numero).then((numero) => {
      if (numero) {
        this.id = numero.id;
        this.number = numero.number;
        this.available = numero.available;
        this.bussy = numero.bussy;

      }
    })
  }

  // En tu controlador de componentes
  areFieldsFilled(): boolean {
    return this.quantity > 0 && this.quantity <= this.available && this.user.length > 0 && this.phone.length == 9;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  guardar() {
    console.log(
      this.loteryID,
      this.numero,
      this.quantity,
      this.user,
      this.phone)
    this.servicio.updateNumber(
      this.loteryID,
      this.numero,
      this.quantity,
      this.user,
      this.phone
    );

    this.modal.dismiss();
  }


  applyPhoneMask(event: any) {
    // Obtener el valor del campo de entrada
    let value = event.target.value;

    // Eliminar los caracteres que no sean números
    value = value.replace(/\D/g, '');

    // Limitar la longitud del valor a 9 caracteres
    if (value.length > 9) {
      value = value.substring(0, 8);
    }

    // Aplicar la máscara "9999-9999" al valor
    if (value.length > 4) {
      value = value.substring(0, 4) + '-' + value.substring(4);
    }

    if (value.length > 9) {
      value = value.substring(0, 8);
    }

    // Asignar el valor con la máscara al campo de entrada
    this.phone = value;
  }


}
