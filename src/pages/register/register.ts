import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Http, Headers, RequestOptions}  from "@angular/http";
import { ForgetPage } from '../forget/forget';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  @ViewChild("fullname") fullname;
  @ViewChild("password") password;
  @ViewChild("emailaddress") emailaddress;
  @ViewChild("fulladdress") fulladdress;
  @ViewChild("telephone") telephone;

  data:string;
  items:any;


  loginForm: FormGroup;
  errorMessage: string = '';



  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    private http: Http, 
    public loading: LoadingController
  ) {}

  ionViewWillLoad(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
    
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      console.log(res);
      this.navCtrl.push(TabsPage);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  goLoginPage() {
    this.navCtrl.push(LoginPage);
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
    {
   
     var headers = new Headers();
       headers.append("Accept", 'application/json');
       headers.append('Content-Type', 'application/json' );
       let options = new RequestOptions({ headers: headers });
   
   
         let data = {
           fullname: this.fullname.value,
           emailaddress: this.emailaddress.value,
           telephone: this.telephone.value,
           password: this.password.value
         };
   
         
   
    let loader = this.loading.create({
       content: 'Processing please wait...',
     });
   
    loader.present().then(() => {
   
   
     this.http.post('http://rooftg-afme.com/registration.php',data,options)
     .map(res => res.json())
     .subscribe(res => {
     console.log(res)
      loader.dismiss()
     if(res=="Your Login success"){
      
       let alert = this.alertCtrl.create({
         title:"Your Account has been created",
         buttons: ['OK']
         });
        
         alert.present();
         this.navCtrl.push(LoginPage, data);
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
