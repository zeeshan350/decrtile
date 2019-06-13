import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-recover',
  templateUrl: 'recover.html',
})
export class RecoverPage {

  @ViewChild('userForm') form: NgForm;
  @ViewChild("newpassword") newpassword;
  @ViewChild("confirmpassword") confirmpassword;
  storageSub: Subscription;
  items:any;
  account: any;

  data:any = {};

  public username: string;

  //public emailaddress:any;
  public result;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private http: Http, public loading: LoadingController
    ) {}

    ionViewWillLoad(){

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      
      let options = new RequestOptions({ headers: headers });
      

      //var link = this.baseURI + "manage-data.php";
      var body = JSON.stringify({testname: localStorage.getItem('recoverData')});

      //alert("DATA: "+body);

      this.http.post('http://rooftg-afme.com/fetch_data.php', body,options)
      .map(res => res.json())
      .subscribe(res => {
        this.items=res.server_response;
         //console.log("DATA received:", body);
      }
         //err => {
         //console.log("ERROR!: ", err);
        // alert(err);
    )
}
goLoginPage() {
  this.navCtrl.push(LoginPage);
}

signIn(){

  //// check to confirm the username and password fields are filled

  if(this.newpassword.value=="" ){

   let alert = this.alertCtrl.create({
  
   title:"ATTENTION",
   subTitle:"Full Name field is empty",
   buttons: ['OK']
   });
  
   alert.present();
    } else
  
   if(this.confirmpassword.value==""){
  
   let alert = this.alertCtrl.create({
  
   title:"ATTENTION",
   subTitle:"Password field is empty",
   buttons: ['OK']
   });
  
   alert.present();
        
  }
  else
  
   if(this.newpassword.value!=this.confirmpassword.value){
  
   let alert = this.alertCtrl.create({
  
   title:"ATTENTION",
   subTitle:"New Passwords do not match",
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
          email: localStorage.getItem('recoverData'),
          newpassword: this.newpassword.value,
          confirmpassword: this.confirmpassword.value,
        };

  
        
   let loader = this.loading.create({
      content: 'Recovering details, please wait...',
    });
  
   loader.present().then(() => {
  
  
    this.http.post('http://rooftg-afme.com/pswrecover.php',data,options)
    .map(res => res.json())
    .subscribe(res => {
    console.log(res)
     loader.dismiss()
    if(res=="Your Login success"){
     
      let alert = this.alertCtrl.create({
        title:"Your Account has been updated",
        buttons: ['OK']
        });
       
        alert.present();
        this.account = window.localStorage.removeItem('recoverData');
        this.navCtrl.push(LoginPage);
    }else
    {
     let alert = this.alertCtrl.create({
     title:"ERROR",
     subTitle:"Sorry, Service is not available. Try Later!",
     buttons: ['OK']
     });
    
     alert.present();
      } 
    });
    });
     }
    
    }




}

