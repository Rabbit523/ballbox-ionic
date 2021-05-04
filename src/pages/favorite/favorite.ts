import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import firebase from "firebase";
import { Event } from "../../models/event";

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {
  secList:Array<any> = [];
  loadingView: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController,) {
    /*this.secList=[{img:"assets/images/001.png",title:"Book off Store",rate:"5.0"},{img:"assets/images/002.png",title:"Book off Store2",rate:"4.8"},
    {ig:"assets/images/003.png",title:"Book off Store3",rate:"4.3"},{img:"assets/images/001.png",title:"Book off Store4",rate:"4.0"}]*/
    this.secList = [];
    this.fetchAllEvents().then((events) => {
        this.secList = events;
      });
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

  fetchAllEvents() {
    this.showLoadingView();
    let events = [];
    
    // fetch products
    const dbRef = firebase.database().ref();

    let query: any = dbRef.child('event');
    return query.once('value')
      .then((snapshot) => {
        
        snapshot.forEach(function(item) {
          var event = {
            key: item.key,
            name: item.val().name,
            address: item.val().address,
            image: item.val().image
          };
          events.push(event);
        });
        this.showLoadingView(false);
        console.log("tags=", events);
        return Promise.resolve(events);
      }).catch((err) => {
        this.showLoadingView(false);
        console.log("err=", err);
        return Promise.resolve(events);
      });
  }

  deleteItem(item) {
    this.secList.splice(this.secList.indexOf(item), 1);
  }

  sharePopover(myEvent) {
  let popover = this.popoverCtrl.create('SharepopupPage', {}, {cssClass: 'share-popover'});
  popover.present({
      ev: myEvent
  });
  }
}
