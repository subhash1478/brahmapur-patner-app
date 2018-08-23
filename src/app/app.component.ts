import { Component, ViewChild } from '@angular/core';
import { Platform, Ion, IonicPage ,NavController, Nav} from 'ionic-angular';
import { ServicesProvider } from '../providers/services/services';
import { Events } from 'ionic-angular'; 
 import { OneSignal } from '@ionic-native/onesignal';

import { enableProdMode } from '@angular/core';
 enableProdMode();
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user:any={}
  rootPage: string;
   constructor(platform: Platform,  public events: Events,
     private oneSignal: OneSignal,
    public _services: ServicesProvider) {
      

      platform.ready().then(() => {
 
          this.oneSignal.startInit("58028d01-d059-4cf1-b6c6-0d99812dfe24", "977511232376")


        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        
        this.oneSignal.enableVibrate(true)
        this.oneSignal.enableSound(true)
         this.oneSignal.handleNotificationReceived().subscribe(() => {
         // do something when notification is received
        });
        
        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });

        this.oneSignal.getIds().then(function(data){
          console.log(data);

         localStorage.setItem('devices_token',data.userId)
          
        })
        
        this.oneSignal.endInit();
    
       

        let logincheck = localStorage.getItem('token')
        this._services.getGeolocation();
        var checkApptour = localStorage.getItem('apptour')
        if (logincheck != null) {
          this.rootPage = "DashboardPage";
        }
        else {
          this.rootPage = "LoginPage";
        }
      });

      events.subscribe('userdetails', () => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        this.ionViewDidEnter();
      });
    }
    ionViewDidEnter(){
      console.log('ngAfterViewInit')
      if(localStorage.getItem('userdetails')!=null){
        let userdata=JSON.parse(localStorage.getItem('userdetails'))
        this.user=userdata;
      }

    }
    goToPage(page){
      
     this.nav.push(page);
    }

    CmsPage(page){
      console.log(page);
      
  this.nav.push("CmsPage",{pagename:page})
    }
    logout() {
      localStorage.removeItem('userdetails')
      localStorage.removeItem('token')
      this.nav.setRoot("LoginPage");
    }
   
  }
  