import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  @ViewChild(Nav) nav;


  constructor(public navCtrl: NavController, public platform: Platform,statusBar: StatusBar, SplashScreen: SplashScreen,public loadingCtrl: LoadingController, public storage: Storage) {
  }

  goToHome(){
    //this.navCtrl.setRoot(LoginPage);

    this.storage.get('introShown').then((result) => {

      if(result){

            this.nav.setRoot(LoginPage);  
            //this.rootPage = 'IntroPage';
          
        //this.navCtrl.push(LoginPage);
        //this.nav.push(LoginPage);

      } else {
          this.storage.set('introShown', true);
          this.navCtrl.setRoot(LoginPage);  

        //this.navCtrl.push(IntroPage);

        //this.rootPage = 'IntroPage';
      }
    });

  }

}
