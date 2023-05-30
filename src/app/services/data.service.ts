
import { Info, Loteria, Personas, Winners } from './../interface/interface';
import { Injectable } from '@angular/core';
import { ColeccionWinners } from '../interface/interface';
import { Storage } from '@ionic/storage-angular';
import * as shortid from 'shortid';
export interface Games {
  fromName: string;
  subject: string;
  icon: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Games[] = [
    {
      fromName: 'Loteria',
      subject: 'crear una lista de numeros',
      icon: 'calendar-outline',
      id: 0
    },
    {
      fromName: 'Boletos',
      subject: 'crear una lista de boletos',
      icon: 'book-outline',
      id: 1
    }
  ];

  private coleccionWinners: ColeccionWinners = {
    winners: []
  };
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.create();
    // this.storage= storage;
  }

  
  async createWinner(id: string){
    const collectionWinner = await this.getWinnersCollections();
    const temp_win: Winners = {
      id: id,
      numbers: [],
      info: []
    }

    collectionWinner.winners.push(temp_win);
    this.saveCollection();
  }

  async updateWinner(id: string, numeros: number[], ganadores: Info[]){
    const collectionWinner = await this.getWinnerCollectionById(id);
    if(collectionWinner){
      console.log('62', id);
      collectionWinner.id = id;
      collectionWinner.info = ganadores;
      collectionWinner.numbers = numeros;

      this.saveCollection();
    }
  }

  saveCollection(){
    this.storage.set('collectionWinners', this.coleccionWinners);
  }

  async getWinnersCollections(): Promise<ColeccionWinners> {
    const storedData = await this.storage.get('collectionWinners');
    console.log(storedData);
    if (storedData) {
      this.coleccionWinners = storedData;
    } else {
      this.coleccionWinners = { winners: [] };
    }
    return this.coleccionWinners;
  }

  async getWinnerCollectionById(id: string){
    
    const collectionWinner = await this.getWinnersCollections();
    
    return collectionWinner.winners.find(winner => winner.id == id);
  }



  public getMessages(): Games[] {
    return this.messages;
  }

  public getMessageById(id: number): Games {
    return this.messages[id];
  }

  
  async deleteAllWin() {
    this.coleccionWinners = { winners: [] }; // Vaciar la colección de loterías
    await this.saveCollection(); // Guardar la colección vacía en el almacenamiento
  }

}
