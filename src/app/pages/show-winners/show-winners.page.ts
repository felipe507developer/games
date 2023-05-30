
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Info, Personas } from 'src/app/interface/interface';
import { NumbersService } from 'src/app/services/numbers.service';

@Component({
  selector: 'app-show-winners',
  templateUrl: './show-winners.page.html',
  styleUrls: ['./show-winners.page.scss'],
})
export class ShowWinnersPage implements OnInit {
  id!: string;
  premio1!: string;
  premio2!: string;
  premio3!: string;

  winnersInfo: Info[] = [];
  numbers: number[] = [];
  status: string = 'false';

  constructor(
    private route: ActivatedRoute,
    private numbersService: NumbersService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['data'];
      // Aquí puedes realizar las acciones necesarias con el parámetro recibido
    });

    this.getData();

  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  async buscarNumeros() {
    // Llamar al método del servicio para buscar los números
    const numeros = [Number(this.premio1), Number(this.premio2), Number(this.premio3)];
    const result = await this.numbersService.buscarNumerosLoteria(this.id, numeros)
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al buscar los números:', error);
      });

    if (result) {
    
      this.getData();
    }
  }

  async getData() {
    // const collection1 = await this.dataService.getWinnersCollections();
    const collection = await this.dataService.getWinnerCollectionById(this.id);
   console.log('64',collection);
    if (collection) {
      this.numbers = collection.numbers;
      if (this.numbers.length > 0) {
        this.premio1 = String(this.numbers[0]).toString().padStart(2, "0");
        this.premio2 = String(this.numbers[1]).toString().padStart(2, "0");
        this.premio3 = String(this.numbers[2]).toString().padStart(2, "0");

        this.winnersInfo = collection.info;
      }
    }
    
  }

}
