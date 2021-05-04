import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;
@IonicPage()
@Component({
  selector: 'page-distance',
  templateUrl: 'distance.html',
})
export class DistancePage {
tabBarElement: any;

@ViewChild('map') mapElement: ElementRef;
map: any;
start = 'chicago, il';
end = 'chicago, il';
directionsService = new google.maps.DirectionsService;
directionsDisplay = new google.maps.DirectionsRenderer;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    //  this.ionViewLoaded();
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  ionViewDidLoad() {
    setTimeout(() => {

      this.initMap();
    }, 1000);
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });

    this.directionsDisplay.setMap(this.map);
  }


  }
