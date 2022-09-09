import { Component } from '@angular/core';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  updateStatus: string = 'Update not started';
  appid: string = 'TBD';
  versionCurrent: string = 'TBD';
  versionsAvailable: string = 'Unknown';
  newChannel: string = 'Production';
  channelCurrent: string = 'Production';
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

  async getUpdateConfig() {
    const info = (await this._deploy.getConfiguration()).appId;
    this.appid = info;
  }
 
  async getCurrVersion() {
    let versionCurrent = (await this._deploy.getCurrentVersion());
    if (versionCurrent) {
      this.versionCurrent = versionCurrent.versionId;
    } else {
      this.versionCurrent = 'No version found';
    }
  }
 
  async onCheckVersions() {
    const versions = await this._deploy.getAvailableVersions();
    if (versions.length > 0) {
      this.versionsAvailable = versions.length.toString();
    } else {
      this.versionsAvailable = "None"
    }
  }
  
  async configureDeploy() {
    let appid = (await this._deploy.getConfiguration()).appId;
    const config = {
      'appId': appid,
      'channel': this.newChannel
    }
    await this._deploy.configure(config);
    this.channelCurrent = this.newChannel;
  }
}
