import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { UserService } from '../core/user.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { FirebaseUserModel } from '../core/user.model';

import { Http, Headers, RequestOptions}  from "@angular/http";
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})

export class UserPage{

  registerWarranty: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  user: FirebaseUserModel = new FirebaseUserModel();
  

  @ViewChild("username") username;
  
  data:string;
  items:any;


  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    private http: Http, 
    public loading: LoadingController) {
  }


  ionViewWillLoad(){
    this.registerWarranty = this.formBuilder.group({
      production: new FormControl()
    });
  }




  

  verify(){

//// check to confirm the username and password fields are filled
 
if(this.username.value=="" ){

  let alert = this.alertCtrl.create({
 
  title:"Enter your Production Code",
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
         username: this.username.value

       };
 
       
 
  let loader = this.loading.create({
     content: 'Checking code...',
   });
 
  loader.present().then(() => {
 
 
   this.http.post('http://rooftg-afme.com/verify.php',data,options)
   .map(res => res.json())
   .subscribe(res => {
   console.log(res)
    loader.dismiss()
   if(res=="Your Code is invalid"){
    let alert = this.alertCtrl.create({
      title:"Your Code is invalid",
      subTitle:"Please enter first 11 digits",
      buttons: ['OK']
      });
     
      alert.present();
     
   }else
   {
     
    let alert = this.alertCtrl.create({
      title:"Your Tile is 100% Genuine",
      subTitle:(res),
      buttons: ['OK']
      });
     
      alert.present();
     } 
   });
   });
    }
   
   }
   
   }