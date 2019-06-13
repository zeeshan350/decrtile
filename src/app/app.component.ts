import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav;

  rootPage:any = LoginPage;
  //rootPage:any;
  //loader: any;
  account: any;

  showSplash = true; // <-- show animation

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    

    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false) 
     // timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
      //setTimeout(() => {splashScreen.hide();}, 300)
      

      this.storage.get('introShown').then((result) => {

       if(result){

         this.account = window.localStorage.getItem('storedData');
      
         if (this.account){
            this.nav.push(TabsPage);
    
         }
         else {
           this.nav.push(LoginPage);
         }
  
        } else {
         this.nav.push(IntroPage);
        }
      });

      //timer(3000).subscribe(() => this.showSplash = false)

    });
  }

  

}
