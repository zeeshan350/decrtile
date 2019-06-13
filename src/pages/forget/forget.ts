  import { Component, ViewChild } from '@angular/core';
  import { NavController, AlertController, LoadingController  } from 'ionic-angular';
  import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
  import { AuthService } from '../core/auth.service';
  import { LoginPage } from '../login/login';
  import { RecoverPage } from '../recover/recover';
  import { Http, Headers, RequestOptions}  from "@angular/http";

  import 'rxjs/add/operator/map';
  //import { Router } from '@angular/router';

/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {

  @ViewChild("username") username;

  data:string;
  items:any;

  forgetForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';


  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    private http: Http, 
    public loading: LoadingController
    
  ) {}



  ionViewWillLoad(){
    this.forgetForm = this.formBuilder.group({
      username: new FormControl()
    });
  }

  goLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  signIn(){

    //// check to confirm the username and password fields are filled
  
    if(this.username.value=="" ){
 
     let alert = this.alertCtrl.create({
    
     title:"ATTENTION",
     subTitle:"Please enter your email address",
     buttons: ['OK']
     });
    
     alert.present();
      } else
    
     {
    
      var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });
        //username: this.username.value;

          let data = {
            username: this.username.value,
          };

          let info = this.username.value
    
          
     let loader = this.loading.create({
        content: 'Processing please wait...',
      });
    
     loader.present().then(() => {
    
    
      this.http.post('http://rooftg-afme.com/forget.php',data,options)
      .map(res => res.json())
      .subscribe(res => {
      //console.log(data)
       loader.dismiss()

      if(res=="Your Login success"){
       
        let alert = this.alertCtrl.create({
          title:"Password Reset",
          subTitle:"If the email address you entered is registered to an account, you will receive an email with instructions on how to reset your password",
          buttons: ['OK']
          });
         
          //alert.present();
          //this.navCtrl.push(RecoverPage,
            //{firstName: this.data}
          //);
          let page1Data=info;

          localStorage.setItem('recoverData', page1Data);
          this.navCtrl.push(RecoverPage, info);


          //this.router.navigate([RecoverPage, data]);

          

      }else
      {
       let alert = this.alertCtrl.create({
       title:"ERROR",
       subTitle:"Your Email Address doesn't exist in our database!",
       buttons: ['OK']
       });
      
       alert.present();
        } 
      });
      });
       }
      
      }
      
      

}
