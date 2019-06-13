import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController  } from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Http, Headers, RequestOptions}  from "@angular/http";
import 'rxjs/add/operator/map';



/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  


  @ViewChild("email") email;
  @ViewChild("enquiry") enquiry;

  data:string;
  items:any;
  emailvalue:any;

  forgetForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    private http: Http, 
    public loading: LoadingController,
    ) {
      this.emailvalue = window.localStorage.getItem('storedData');

    }

  signIn(){

    //// check to confirm the username and password fields are filled
  
    if(this.enquiry.value=="" ){
 
     let alert = this.alertCtrl.create({
    
     title:"ATTENTION",
     subTitle:"Please enter your enquiry",
     buttons: ['OK']
     });
    
     alert.present();
      } else 
    
     {
    
      var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });
    
          let data = {
            email: this.email.value,
            enquiry: this.enquiry.value,
          };
    
          
    
     let loader = this.loading.create({
        content: 'Sending enquiry...',
      });
    
     loader.present().then(() => {
    
    
      this.http.post('http://rooftg-afme.com/enquiry.php',data,options)
      .map(res => res.json())
      .subscribe(res => {
      console.log(res)
       loader.dismiss()

      if(res=="Your Login success"){
       
        let alert = this.alertCtrl.create({
          title:"Enquiry Sent",
          subTitle:"We have received your enquiry. Thank you",
          buttons: ['OK']
          });
         
          alert.present();
      }else
      {
       let alert = this.alertCtrl.create({
       title:"ERROR",
       subTitle:"Something happen wrong. We are fixing it.",
       buttons: ['OK']
       });
      
       alert.present();
        } 
      });
      });
       }
      
      }


}
