import { Component } from '@angular/core';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  updateStatus: string = 'Update not started';

  constructor(private _deploy: Deploy) {}
  
  async performManualUpdate() {
    this.updateStatus = 'Checking for Update';
    const update = await this._deploy.checkForUpdate()
    if (update.available){
      this.updateStatus = 'Update found. Downloading update';
      await this._deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      this.updateStatus = 'Update downloaded. Extracting update';
      await this._deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      console.log('Reloading app');
      this.updateStatus = 'Update extracted. Reloading app';
      await this._deploy.reloadApp();
    } else {
      console.log('No update available');
      this.updateStatus = 'No update available';
    }
   }
 
}
