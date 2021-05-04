import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation, GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

declare var google;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  options : GeolocationOptions;
  currentPos : Geoposition;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    setTimeout(() => {

      this.initMap();
    }, 1000);
  }
  initMap() {
    this.options = {
      enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

      this.currentPos = pos;      
      console.log(pos);


      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        //center: { lat: 41.85, lng: -87.65 }
        //center: { lat: -33.916988, lng: 151.233640 }
        center: { lat: this.currentPos.coords.latitude, lng: this.currentPos.coords.longitude }
      });
  
      this.directionsDisplay.setMap(this.map);
  
      var features = [
        {
          position: new google.maps.LatLng(-33.91721, 151.22630),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91539, 151.22820),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91747, 151.22912),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91910, 151.22907),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91725, 151.23011),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91872, 151.23089),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91784, 151.23094),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91682, 151.23149),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91790, 151.23463),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91666, 151.23468),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.916988, 151.233640),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
          type: 'library'
        }
      ];
  
      // Create markers.
      for (var i = 0; i < features.length; i++) {
        var marker = new google.maps.Marker({
          position: features[i].position,
          map: this.map,
          animation: google.maps.Animation.DROP,
        });
      };

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });

    
  }


  presentModal() {
    let modal = this.modalCtrl.create('CategoryPage');
    modal.present();
  }
}