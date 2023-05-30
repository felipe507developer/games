import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ColeccionLoterias, Loteria } from 'src/app/interface/interface';
import { NumbersService } from 'src/app/services/numbers.service';
import { ModalPage } from '../modal/modal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lotery',
  templateUrl: './lotery.page.html',
  styleUrls: ['./lotery.page.scss'],
})
export class LoteryPage implements OnInit {
  collection: Loteria[] = [];
  constructor(private servicio: NumbersService,
    private modalController: ModalController,
    private navCtrl: NavController) { 
     
  }

  ngOnInit() {
    this.getData();
  }

  async openModal(){
    const modal = await this.modalController.create({
      cssClass: 'ion-model-p',
      component: ModalPage, // Reemplaza "TuModalComponent" con el nombre de tu propio componente modal
    });

    modal.onDidDismiss().then(() => {
      console.log('El modal se ha cerrado');
      this.getData();
    });
  
    await modal.present();
  }

  getData(){
    this.servicio.getColections().then((cuentas)=>{
      this.collection = cuentas.loterias;
      
    });
  }

  goDetails(item: string){
   
    this.navCtrl.navigateForward( '/details', {
      queryParams: {
        data: item
      }
    })
  }

  deleteLoto(id: string){
    this.servicio.deleteLoteria(id).then(() => {
      
      this.getData();
    }).catch((error) => {
      console.error('Ocurrio un error, intentalo de nuevo:', error);
    });;
  }

  showWinners(item: string){
    this.navCtrl.navigateForward( '/show-winners', {
      queryParams: {
        data: item
      }
    })
  }

  deleteAll(){
    this.servicio.deleteAllData().then(() => {
      this.servicio.presentAlert('Datos eliminados correctamente');
      this.getData();
    }).catch((error) => {
      this.servicio.presentAlert('Error al eliminar los datos:' + error);
    });
  }

}
