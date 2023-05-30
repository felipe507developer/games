import { Component, inject } from '@angular/core';
import { Platform, RefresherCustomEvent } from '@ionic/angular';

import { DataService, Games } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);
  constructor(private platform: Platform) {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  isIos() {
    return this.platform.is('ios')
  }

  getMessages(): Games[] {
    return this.data.getMessages();
  }
}
