import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';



/**
 * Generated class for the SignoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signout',
  templateUrl: 'signout.html',
})
export class SignoutPage {

  account: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public app: App) {

    let alert = this.alertCtrl.create({
      title: 'Confirm',
      subTitle:"Are you sure you want to sign out?",
        buttons: [
      {
        text: 'Yes',
        handler: () => {
          this.account = window.localStorage.removeItem('storedData');

          this.app.getRootNav().setRoot(LoginPage);
        }
      },
      {
        text: 'No',
        handler: () => {
          this.app.getRootNav().setRoot(TabsPage);

        }
      }
    ]
      });
     
      alert.present();
      



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignoutPage');
  }

}
