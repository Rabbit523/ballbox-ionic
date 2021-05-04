import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
category:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.category=[{title:"Airport",checked:"false"},{title:"ATM",checked:"true"},{title:"Bank",checked:"false"},{title:"Bar",checked:"false"},{title:"Beauty Salon",checked:"false"},
    {title:"Book Store",checked:"true"},{title:"Bus Station",checked:"false"},{title:"Cafe",checked:"false"},{title:"Car Rent",checked:"false"},{title:"Clothes Store",checked:"false"},{title:"Dental",checked:"false"}]
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
