import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../core/auth.service';
import { Http, Headers, RequestOptions}  from "@angular/http";
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  @ViewChild("username") username;
  @ViewChild("password") password;

  data:string;
  items:any;

  rootPage:any = 'UserPage';
  loader: any;
  account: any;


  loginForm: FormGroup;
  errorMessage: string = '';


  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    private http: Http, 
    public loading: LoadingController
    ) {

    this.account = window.localStorage.getItem('storedData');
      
      if (this.account){
        this.navCtrl.push(TabsPage);


      }

    //check on how you will access the username



    //this.storage.get('uid0s').then((result) => {

      //if(result){
        //this.navCtrl.push(TabsPage);
      //} 
  
    //});

  }

  ionViewWillLoad(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
    
  }

  



  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  goForgetPage(){
    this.navCtrl.push(ForgetPage);
  }

  signUp(){
    this.navCtrl.push(RegisterPage);
  }

signIn(){

   //// check to confirm the username and password fields are filled
 
   if(this.username.value=="" ){

    let alert = this.alertCtrl.create({
   
    title:"ATTENTION",
    subTitle:"Username field is empty",
    buttons: ['OK']
    });
   
    alert.present();
     } else
   
    if(this.password.value==""){
   
    let alert = this.alertCtrl.create({
   
    title:"ATTENTION",
    subTitle:"Password field is empty",
    buttons: ['OK']
    });
   
    alert.present();
         
   }
    else
    {
   
     var headers = new Headers();
       headers.append("Accept", 'application/json');
       headers.append('Content-Type', 'application/json' );
       let options = new RequestOptions({ headers: headers });
   
   
         let data = {
           username: this.username.value,
           password: this.password.value
         };

         let info = this.username.value
   
         
   
    let loader = this.loading.create({
       content: 'Processing please wait...',
     });
     
    loader.present().then(() => {
   
   
     this.http.post('http://rooftg-afme.com/login.php',data,options)
     .map(res => res.json())
     .subscribe(res => {
     console.log(res)
      loader.dismiss()
      
     if(res=="Your Login success"){
      
        //this.storage.set ('uid0s', info);
        let page1Data=info;
        localStorage.setItem('storedData', page1Data);
        this.navCtrl.push(TabsPage);


     }else
     {
      let alert = this.alertCtrl.create({
        title:"Unable to Sign In",
        subTitle:"The email address and password combination you entered is incorrect. Please try again",
        buttons: ['OK']
      });
     
      alert.present();
       } 
     });
     });
      }
     
     }
     
     }