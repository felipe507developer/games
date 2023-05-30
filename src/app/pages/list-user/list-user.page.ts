import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personas } from 'src/app/interface/interface';
import { NumbersService } from 'src/app/services/numbers.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
})
export class ListUserPage implements OnInit {

  personas: Personas[] = [];
  numeroId!: number;
  loteriaId!: string

  constructor(private numbersService: NumbersService,
    private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.numeroId = params['numberId'];
      this.loteriaId = params['loteriaId'];
      
      this.getPeople();
      // Aquí puedes realizar las acciones necesarias con el parámetro recibido
    });
  }

  async getPeople() {
   
    const numero = await this.numbersService.getNumeroPorId(this.loteriaId, this.numeroId).then((numero)=>{
      console.log(numero);
      if (numero) {
        console.log('numeros', numero);
        this.personas = numero.personas;
      }
    });    
  }

  deleteUser(userId: string, quantity: number){
    this.numbersService.deletePersona(this.loteriaId,this.numeroId , userId, quantity).then(() => {
      console.log('Persona eliminada correctamente');
      this.getPeople();
    }).catch((error) => {
      console.error('No se eliminio:', error);
    });;
  }

}
