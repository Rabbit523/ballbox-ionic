import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import firebase from "firebase";
import { Tag } from "../../models/tag";

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  list: Array<Tag> = [];
  loadingView: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
    this.list = [];
    this.fetchAllTags().then((tags) => {
        this.list = tags;
      });
    console.log("list=", this.list);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');    
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

  /**
   * get all products
   */
  fetchAllTags() {
    this.showLoadingView();
    
    let tags = [];
    
    // fetch products
    const dbRef = firebase.database().ref();

    let query: any = dbRef.child("location");
    return query.once('value')
      .then((snapshot) => {
        
        snapshot.forEach(function(item) {
          var tag = {
            key: item.key,
            name: item.val().name,
            address: item.val().address,
            image: item.val().image
          };
          tags.push(tag);
        });
        this.showLoadingView(false);
        console.log("tags=", tags);
        return Promise.resolve(tags);
      }).catch((err) => {
        this.showLoadingView(false);
        console.log("err=", err);
        return Promise.resolve(tags);;
      });
  }
}
