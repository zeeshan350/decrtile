import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  @ViewChild('userForm') form: NgForm;
  @ViewChild("fullname") fullname;
  @ViewChild("password") password;
  @ViewChild("newpassword") newpassword;
  @ViewChild("confirmpassword") confirmpassword;
  @ViewChild("email") email;
  @ViewChild("fulladdress") fulladdress;
  @ViewChild("telephone") telephone;
  storageSub: Subscription;
  items:any;
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
      
      let loader = this.loading.create({
        content: 'Recovering details, please wait...',
      });

      //var link = this.baseURI + "manage-data.php";
      var body = JSON.stringify({testname: localStorage.getItem('storedData')});

      //alert("DATA: "+body);
      loader.present().then(() => 

      this.http.post('http://rooftg-afme.com/fetch_data.php', body,options)
      .map(res => res.json())
      .subscribe(res => {
        loader.dismiss()
        this.items=res.server_response;
         //console.log("DATA received:", body);
      }
         //err => {
         //console.log("ERROR!: ", err);
        // alert(err);
    )
    )     
}
   



signIn(){

  //// check to confirm the username and password fields are filled

  if(this.fullname.value=="" ){

   let alert = this.alertCtrl.create({
  
   title:"ATTENTION",
   subTitle:"Full Name field is empty",
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
          fullname: this.fullname.value,
          email: this.email.value,
          telephone: this.telephone.value,
          password: this.password.value,
          newpassword: this.newpassword.value,
          confirmpassword: this.confirmpassword.value,
        };
  
        
  
   let loader = this.loading.create({
      content: 'Updating details, please wait...',
    });
  
   loader.present().then(() => {
  
  
    this.http.post('http://rooftg-afme.com/update.php',data,options)
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
        //this.navCtrl.push(LoginPage, data);
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

