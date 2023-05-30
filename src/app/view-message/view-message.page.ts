
import { Component, OnInit } from '@angular/core';
import { Loteria, Numbers } from '../interface/interface';
import { NumbersService } from '../services/numbers.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ModalshellPage } from '../pages/modalshell/modalshell.page';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
 number: Numbers[] = [];
 id: string= '';
 title: string = '';

  constructor(
    private servicio: NumbersService,
    private route: ActivatedRoute,
    private modal: ModalController,
    private navCtrl: NavController
   ) {
    // .getCollection();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    // Obtén el parámetro "data"
    this.getLoteria();
  }

  ionViewDidEnter() {
    // Este método se ejecutará cuando regreses a la página "Lotería"
    this.getLoteria();
  }

  async openModal(id: number){
    
      const modal = await this.modal.create({
      component: ModalshellPage,
      componentProps: { 
        loteryID: this.id,
        id: id }
      });

      modal.onDidDismiss().then(() => {
        // console.log('El modal se ha cerrado');
        this.getLoteria();
      });
    
      await modal.present();
    
  }
  

  getLoteria() {
    this.servicio.getLoteriaPorId(this.id).then((Lotery)=>{
      
      this.title = Lotery?.date || 'Detalles';
      this.number = Lotery?.numbers || [];
    });
  }

  showUser(id: number){
    this.navCtrl.navigateForward( '/list-user', {
      queryParams: {
        loteriaId: this.id,
        numberId: id
      }
    })
  }

  showWinners(item: string){
    this.navCtrl.navigateForward( '/show-winners', {
      queryParams: {
        data: item
      }
    })
  }
}
