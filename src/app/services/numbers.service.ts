import * as shortid from 'shortid';

import { Injectable, OnInit } from '@angular/core';
import { ColeccionLoterias, Info, Loteria, Numbers, Personas, Winners } from '../interface/interface';
import { Storage } from '@ionic/storage-angular';
import { DataService } from './data.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class NumbersService {
  // private _storage: Storage | null = null;
  private coleccionLoterias: ColeccionLoterias = {
    loterias: []
  };
  constructor(private storage: Storage,
    private alertCtrl: AlertController, 
    private dataService: DataService) {
    this.init();
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Important message',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.create();
    // this.storage= storage;
  }

  generarJson(id: number, title: string) {
    const shortId = shortid.generate();
    const loteria: Loteria = {
      id: shortId,
      date: title,
      numbers: []
    };

    for (let i = 0; i <= 99; i++) {
      const number: Numbers = {
        id: i,
        number: i.toString().padStart(2, "0"),
        available: id,
        bussy: 0,
        personas: []
      };
      loteria.numbers.push(number);
    }

    this.coleccionLoterias.loterias.push(loteria);
    this.saveCollection();
    this.dataService.createWinner(shortId);
    
  }



  // Método para obtener la colección completa de loterías
  async getColections(): Promise<ColeccionLoterias> {
    const storedData = await this.storage.get('coleccionLoterias');
    console.log(storedData);
    if (storedData) {
      this.coleccionLoterias = storedData;
    } else {
      this.coleccionLoterias = { loterias: [] };
    }
    return this.coleccionLoterias;
  }

  // Método para obtener una lotería por su ID
  async getLoteriaPorId(id: string): Promise<Loteria | undefined> {
    const coleccionLoterias = await this.getColections();
    return coleccionLoterias.loterias.find(loteria => loteria.id === id);
  }

  async getNumeroPorId(loteriaId: string, numeroId: number): Promise<Numbers | undefined> {

    const loteria = await this.getLoteriaPorId(loteriaId);
    if (loteria) {
      return loteria.numbers.find(numero => numero.id === Number(numeroId));
    }
    return undefined;
  }

  async buscarNumerosLoteria(loteriaId: string, numeros: number[]): Promise<Info[]> {
    const ganadores: Info[] = [];
    const loteria = await this.getLoteriaPorId(loteriaId);
    if (loteria) {
      for (const numero of loteria.numbers) {
        const win: Info = {
          id: loteriaId,
          number: numero.number,
          persona: []
        }
        
       
        if (numeros.includes(Number(numero.number))) {
          
          for (const persona of numero.personas) {
              win.persona.push(persona);
                
          }
          ganadores.push(win); 
        }
      }
      
    }

    console.log('ganadores', ganadores);
    this.dataService.updateWinner(loteriaId, numeros, ganadores);
    return ganadores;
  }
  

  async updateNumber(loteriaId: string, numeroId: number, quantity: number, newPerson: string,
    phone: string) {
    const numero = await this.getNumeroPorId(loteriaId, numeroId);
    if (numero) {
      numero.available -= quantity;
      numero.bussy += quantity;
      const person: Personas = {
        id: shortid.generate(),
        name: newPerson,
        phone: phone,
        quantity: quantity
      }
      numero.personas.push(person);
      await this.saveCollection();
    }
  }

  // Método para guardar la colección de loterías en el almacenamiento
  private saveCollection() {
    this.storage.set('coleccionLoterias', this.coleccionLoterias);
  }

  async deleteLoteria(loteriaId: string) {
    const loteria = await this.getLoteriaPorId(loteriaId);
    if (loteria) {
      const index = this.coleccionLoterias.loterias.indexOf(loteria);
      if (index !== -1) {
        this.coleccionLoterias.loterias.splice(index, 1); // Eliminar la lotería del arreglo
        await this.saveCollection(); // Guardar los cambios en el almacenamiento
      }
    }
  }

  async deletePersona(loteriaId: string, numeroId: number, personaId: string, quantity: number) {
    const numero = await this.getNumeroPorId(loteriaId, numeroId);
    if (numero) {
      const index = numero.personas.findIndex(persona => persona.id === personaId);
      if (index !== -1) {
        numero.personas.splice(index, 1); // Eliminar la persona del arreglo
        numero.available += quantity; // Incrementar la quantity de números disponibles
        numero.bussy -= quantity; // Decrementar la quantity de números ocupados
        await this.saveCollection(); // Guardar los cambios en el almacenamiento
      }
    }
  }
  


  async deleteAllData() {
    this.coleccionLoterias = { loterias: [] }; // Vaciar la colección de loterías
    await this.saveCollection(); // Guardar la colección vacía en el almacenamiento
    this.dataService.deleteAllWin();
  }

}