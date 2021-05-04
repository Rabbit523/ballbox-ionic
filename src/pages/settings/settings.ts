import { Component } from '@angular/core';
import { IonicPage, NavController, App  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global";
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public app: App, private storage: Storage, private global: GlobalProvider, private fbauth: AngularFireAuth) {
  }
  openprofile(){
    this.navCtrl.parent.select(3);
  }
  logout(){
    this.storage.set('uuid', null);
    this.global.current_user = null;
    this.fbauth.auth.signOut();
    this.app.getRootNav().setRoot('LoginPage');
  }
  
}
