import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from "firebase";
import { Storage } from '@ionic/storage';

import { GlobalProvider } from "../../providers/global";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginError: string;
  loginform: FormGroup;
  loadingView: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, private global: GlobalProvider, private afAuth: AngularFireAuth, private storage: Storage) {
    this.loginform = formBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidEnter() {
    this.storage.get('uuid').then((val)=> {
      if (val) {
        this.navCtrl.setRoot('TabsPage');
      }
    });
      // let elem = <HTMLElement>document.querySelector(".tabbar");
      // if (elem != null) {
      //   elem.style.display = 'none';
      // }
  }
  
  showLoadingView(show = true, desc?: String) {
    if (show) {
      // show showLoading view
      this.loadingView = this.loadingCtrl.create();
      this.loadingView.present();
    }
    else {
      if (this.loadingView) {
        // hide
        this.loadingView.dismiss();
      }
    }
  }

  showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  login() {
    let data = this.loginform.value;
    let credential = {
      email: data.email,
      password: data.password
    };
    
    // check input validity
    
    if (!data.email) {
      let alert = this.alertCtrl.create({
        title: 'Email Invalid',
        message: 'Please enter your email',
        buttons: ['Ok']
      });
      alert.present();
      return;
    }

    if (!data.password) {
      let alert = this.alertCtrl.create({
        title: 'Password Invalid',
        message: 'Please enter your password',
        buttons: ['Ok']
      });
      alert.present();
      return;
    }

    this.showLoadingView();

    this.afAuth.auth.signInWithEmailAndPassword(credential.email, credential.password)
    .then((res) => {
      firebase.database().ref('users/' + res.user.uid).on('value',(snapshot)=>{
        this.global.current_user = snapshot.val();
        this.storage.set('uuid', res.user.uid);
      });
      this.showLoadingView(false);
      this.navCtrl.setRoot('TabsPage');
    })
    .catch (error => {
      this.showLoadingView(false);
      this.showToast('Could not find authentication details.');
    })
  }
}
