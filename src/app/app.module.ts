import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Nav, IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SignoutPage } from '../pages/signout/signout';
import { RegisterPage } from '../pages/register/register';
//import { SplashPage } from '../pages/splash/splash';
import { UserPage} from '../pages/user/user';
import { ProfilePage } from '../pages/profile/profile';
import { ContactPage } from '../pages/contact/contact';
import { ForgetPage } from '../pages/forget/forget';
import { TabsPage } from '../pages/tabs/tabs';
import { RecoverPage } from '../pages/recover/recover';
import { VerificationPage } from '../pages/verification/verification';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';

import { HttpModule } from '@angular/http';

import { AuthService } from '../pages/core/auth.service';
import { UserService } from '../pages/core/user.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environment/environment';
import { IonicStorageModule } from '@ionic/storage';
import { Mask } from './mask';

@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    UserPage,
    ProfilePage,
    ContactPage,
    //SplashPage,
    SignoutPage,
    TabsPage,
    ForgetPage,
    RecoverPage,
    VerificationPage,
    Mask,
    LoginPage,
    IntroPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,  
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    UserPage,
    ProfilePage,
    ContactPage,
    //SplashPage,
    SignoutPage,
    TabsPage,
    RecoverPage,
    ForgetPage,
    VerificationPage,
    LoginPage,
    IntroPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Nav,
  ]
})

export class AppModule {}


