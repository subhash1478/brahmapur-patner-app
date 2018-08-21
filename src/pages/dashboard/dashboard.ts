import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, MenuController } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
import { ServicesProvider } from '../../providers/services/services';
import {   Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../config';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage   {
  timer: number = 30;
  intervalId: number = -1;

  order: any[];
  productList: any[];
  loggedInid: any;
  
  error_message: string;
  shopid: any=[];
  counter: number;
  constructor(  public sanitizer:DomSanitizer,public alertCtrl:AlertController,    public menu:MenuController,
    
    public utility: UtilityProvider, public navCtrl: NavController, 
    public navParams: NavParams, public _services: ServicesProvider) {
      if(localStorage.getItem('userdetails')!=null){
        let user=JSON.parse(localStorage.getItem('userdetails'));
        this.loggedInid=user._id
        this.saveDevicesToken()
      }
    }
    start() {
      this.timer=30
      this.intervalId = setInterval(() => {
        this.timeIt()
      }, 1000);   
    
      if (this.timer <= 0) {
        this.stop();
      }
    
    }
    
    stop() {
       clearInterval(this.intervalId);
       this.intervalId = -1;
    }
    
    startStop() {
      if(this.intervalId == -1) {
        this.start();
        
      }  else {
        this.stop();
 
      }
    }
    
    timeIt() {
      console.log(this.timer );
      
     this.timer--;
     if (this.timer == 0) {
       this.start()
       this.getUsertask()

       clearInterval(this.intervalId);
     }
    }
    
    convertSeconds(s) {
      var minutes = Math.floor(s / 60);
      var seconds = (s % 60)
      var milliseconds = s;
    
     
    }
    
    ngOnInit(){
      
      let shopidlist=[]
      let obj={
        id: this.loggedInid,
        
      }
      this._services.getUserShop(obj).subscribe((response)=>{
        
        let result=response.response.data
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          shopidlist.push(element.id)
          
        }
        
        this.shopid=shopidlist
        localStorage.setItem('shopidlist',JSON.stringify(this.shopid))
        console.log(this.shopid);
        
      },(error)=>{
        console.log(error);
        
        
      })
      
      this.start()
    }
    
    ionViewDidLeave() {
      
       console.log('ionViewDidLeave');
    }
    ionViewDidEnter() {
      
      console.log('ionViewDidEnter');
      this.getUsertask()

      this.menu.enable(true);
      
      
    }
    
    saveDevicesToken(){
      let data = {
        devicesid: localStorage.getItem('devices_token'),
        userid: Config.USER._id,
        user_type:'partner',
      }
      this._services.saveDevicesToken(data).subscribe((response)=>{
        console.log(response);
        
      })
    }
    
    
    getUsertask(){
      this.productList=[]
      this.error_message==''
      let shoplist=JSON.parse(localStorage.getItem('shopidlist'))
      
      console.log(shoplist.toString());
      
      let data={
        id: shoplist.toString(),
        type:'partner',
        status:0
      }
      
      console.log(data);
 

        
        this._services.getNewOrder(data).subscribe((response)=>{
        
          
          this.productList=response.response.data;
          
          // this.startTimer()
          
           
        },(error)=>{
          console.log(error);
          
          
          this.error_message='No new task'
        })
        
        let msg={
          msg:'Refresh',
          duration:1000
        }
        this.utility.messageToast(msg)
       }
       
      
      orderAccept(type,item){
        
        let alert = this.alertCtrl.create({
          title: `Confirm ${type}`,
          message: `Do you want to ${type} this Order`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                
              }
            },
            {
              text: 'OK',
              handler: () => {
                console.log('Buy clicked');
                this.driverOrderAccept(type,item)
                
              }
            }
          ]
        });
        alert.present();
        
      }
      driverOrderAccept(type,item){
        
        let obj={
          id:item.order.id,
          type:type,
          value:1
        }
        console.log(obj);
        
        this._services.task(obj).subscribe((response)=>{
          
          let result=response.response.data;
          console.log(response);
          this.getUsertask()
        })
      }
      
      orderUpdate(type,item){
        
        let obj={
          id:item.order.id,
          type:type,
          value:item.order[type]
        }
        console.log(obj);
        
        this._services.task(obj).subscribe((response)=>{
          
          let result=response.response.data;
          console.log(response);
          
        })
      }
    }
    