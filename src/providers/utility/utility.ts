import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController,Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

import { ToastController } from "ionic-angular";

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

  constructor(public http: HttpClient, private platform: Platform,private toast: Toast, public alertCtrl: AlertController, private toastCtrl: ToastController) {
    console.log('Hello UtilityProvider Provider');
  }
  showAlert(data) {
    let alert = this.alertCtrl.create({
      title: data.title,
      subTitle: data.subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  showToast(data) {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      const toast = this.toastCtrl.create({
        message: data.msg,
        duration: data.duration,
        position:  data.position,
      });
      toast.present();
    } else {
      this.toast.show(data.msg, data.duration, 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
     
  }

messageToast(data) {
  if (this.platform.is('core') || this.platform.is('mobileweb')) {
    const toast = this.toastCtrl.create({
      message: data.msg,
      duration: data.duration,
      position:  data.position,
    });
    toast.present();
  } else {
    this.toast.show(data.msg, data.duration, 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
}
