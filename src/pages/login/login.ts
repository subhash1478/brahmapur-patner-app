import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { UtilityProvider } from '../../providers/utility/utility';
import { AlertController ,MenuController} from 'ionic-angular';
 import { Events } from 'ionic-angular';
/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {}
  login_page: boolean = true
  constructor(public utility: UtilityProvider,
    public events: Events,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu:MenuController,
    public _services: ServicesProvider) {
    }
    ionViewDidLoad() {
      this.menu.enable(false);
      console.log('ionViewDidLoad LoginPage');
      this.getaddress();
    }
    gotoregister() {
      this.login_page = false
    }
    gotologin() {
      this.login_page = true
    }
    login() {
      this._services.doLogin(this.user).subscribe((Response: any) => {
        console.log("crash", Response);
        if (Response.success == true) {
          localStorage.setItem('token', Response.data.token)
          localStorage.setItem('userdetails', JSON.stringify(Response.data.userDetails))
          this.navCtrl.setRoot("DashboardPage")
          this.events.publish('userdetails');
        } else {
          var msg = {
            msg: Response.message,
            duration: 3000,
            position: 'centre',
          }
          this.utility.messageToast(msg)
        }
      })
    }
   
    getaddress() {
      this._services.getaddress().subscribe((Response) => {
        if (Response.status === 'OK') {
          var results = Response.results
          console.log(results)
          if (results[0]) {
            console.log(results[0].formatted_address)
            var street = "";
            var city = "";
            var state = "";
            var country = "";
            var zipcode = "";
            for (var i = 0; i < results.length; i++) {
              if (results[i].types[0] === "locality") {
                city = results[i].address_components[0].long_name;
                state = results[i].address_components[2].long_name;
                console.log(city, state)
              }
              if (results[i].types[0] === "postal_code" && zipcode == "") {
                zipcode = results[i].address_components[0].long_name;
              }
              if (results[i].types[0] === "country") {
                country = results[i].address_components[0].long_name;
              }
              if (results[i].types[0] === "route" && street == "") {
                for (var j = 0; j < 4; j++) {
                  if (j == 0) {
                    street = results[i].address_components[j].long_name;
                  } else {
                    street += ", " + results[i].address_components[j].long_name;
                  }
                }
              }
              if (results[i].types[0] === "street_address") {
                for (var j = 0; j < 4; j++) {
                  if (j == 0) {
                    street = results[i].address_components[j].long_name;
                  } else {
                    street += ", " + results[i].address_components[j].long_name;
                  }
                }
              }
            }
            if (zipcode == "") {
              if (typeof results[0].address_components[8] !== 'undefined') {
                zipcode = results[0].address_components[8].long_name;
              }
            }
            if (country == "") {
              if (typeof results[0].address_components[7] !== 'undefined') {
                country = results[0].address_components[7].long_name;
              }
            }
            if (state == "") {
              if (typeof results[0].address_components[6] !== 'undefined') {
                state = results[0].address_components[6].long_name;
              }
            }
            if (city == "") {
              if (typeof results[0].address_components[5] !== 'undefined') {
                city = results[0].address_components[5].long_name;
              }
            }
            var address = {
              "street": results[0].formatted_address,
              "city": city,
              "state": state,
              "country": country,
              "zipcode": zipcode,
            };
            localStorage.setItem('address', JSON.stringify(address))
            console.log(address);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      })
    }
  
    forgetPassword(){
      const prompt = this.alertCtrl.create({
        title: 'Forget Password',
        message: "Enter Email",
        inputs: [
          {
            name: 'email',
            placeholder: 'Email'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Send',
            handler: data => {
              if(!data.email){
                let msg = {msg: 'Please enter your register email',duration: 3000,position: 'centre'}
                this.utility.showToast(msg);
                return false;
              }
               this._services.forgetPassword(data).subscribe((response)=>{
               if(response==null){
                let msg = {msg: 'Please check you email and follow the instruction',duration: 3000,position: 'centre'}
                this.utility.showToast(msg)

               }else{
                let msg = {msg: response.message,duration: 3000,position: 'centre'}
                this.utility.showToast(msg)

               }
             
              })
              
            }
          }
        ]
      });
      prompt.present();
    }
  }
  