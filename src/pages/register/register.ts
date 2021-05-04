import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalProvider } from "../../providers/global";
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signupError: string;
  signupform: FormGroup;
  firstname: string;
  lastname: string;
  loadingView: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, private global: GlobalProvider, private afAuth: AngularFireAuth) {
    this.signupform = fb.group({
      firstname: [''],
      lastname: [''],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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

  signup(){
    let data = this.signupform.value;
    let credential = {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname
    };

    if (!credential.firstname) {
      let alert = this.alertCtrl.create({
        title: 'Firstname Invalid',
        message: 'Please enter your firstname',
        buttons: ['Ok']
      });
      alert.present();
      return;
    }

    if (!credential.lastname) {
      let alert = this.alertCtrl.create({
        title: 'Lastname Invalid',
        message: 'Please enter your lastname',
        buttons: ['Ok']
      });
      alert.present();
      return;
    }

    if (!credential.email) {
      let alert = this.alertCtrl.create({
        title: 'Email Invalid',
        message: 'Please enter your email',
        buttons: ['Ok']
      });
      alert.present();
      return;
    }

    if (!credential.password) {
      let alert = this.alertCtrl.create({
        title: 'Password Invalid',
        message: 'Please enter your password',
        buttons: ['Ok']
      });
      alert.present();
      return;
    }

    this.showLoadingView();
    
    this.afAuth.auth.createUserWithEmailAndPassword(credential.email, credential.password)
    .then((res) => {
      firebase.database().ref('users/' + res.user.uid).push(credential). then(()=>{
        this.global.current_user.email = credential.email;
        this.global.current_user.password = credential.password;
        this.global.current_user.firstname = credential.firstname;
        this.global.current_user.lastname = credential.lastname;
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
