import { Component } from '@angular/core';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private _deploy: Deploy) {}
}
