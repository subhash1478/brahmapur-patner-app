import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
import { ServicesProvider } from '../../providers/services/services';
import {   Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export interface CountdownTimer {
  seconds: number
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  order: any[];
  productList: any[];
  loggedInid: any;
  @Input() timeInSeconds: number=120;
  timer: CountdownTimer;
  private increment;
  private transform;
  private percent;
  private fixTransform;
  seconds: number;
  error_message: string;
  constructor(  public sanitizer:DomSanitizer,public alertCtrl:AlertController,
    public utility: UtilityProvider, public navCtrl: NavController, 
    public navParams: NavParams, public _services: ServicesProvider) {
      if(localStorage.getItem('token')!=null){
        let user=JSON.parse(localStorage.getItem('userdetails'));
        this.loggedInid=user._id
        
      }
      this.seconds=60
    }
    
    ngOnInit() {
      this.initTimer();
      
      let obj={
        id: this.loggedInid,
        status:0,
        driver_accept:0
      }
      this._services.getOrderList(obj).subscribe((response)=>{
        
        console.log(response.response.data);
        
        this.productList=response.response.data;
        
       // this.startTimer()
        
        
      },(error)=>{
        console.log(error);
        

        this.error_message='No new task'
      })
    }
    
    hasFinished() {
      return this.timer.hasFinished;
    }
    initProgressBar() {
      this.percent = 100;
      this.increment = 180 / 100;
      const progress = 'rotate(' + this.increment * this.percent + 'deg)';
      this.transform = this.sanitizer.bypassSecurityTrustStyle(progress);
      this.fixTransform = this.sanitizer.bypassSecurityTrustStyle(progress);
    }
    
    initTimer() {
      this.initProgressBar();
      if (!this.timeInSeconds) { this.timeInSeconds = 0; }
      
      this.timer = <CountdownTimer>{
        seconds: this.timeInSeconds,
        runTimer: false,
        hasStarted: false,
        hasFinished: false,
        secondsRemaining: this.timeInSeconds
      };
      
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    }
    
    play(){
      console.log('play');
      
      var audio = new Audio('./assets/alarm.mp3');
      
      let a=audio.play();
      console.log(a);
      
    }
    startTimer() {
      this.timer.hasStarted = true;
      this.timer.runTimer = true;
      this.timerTick();
    }
    
    pauseTimer() {
      
      this.timer.runTimer = false;
    }
    
    resumeTimer() {
      this.startTimer();
    }
    
    timerTick() {
      this.play()
      
      setTimeout(() => {
        if (!this.timer.runTimer) { return; }
        this.timer.secondsRemaining--;
        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
        this.percent = this.timer.secondsRemaining / this.timer.seconds * 100;
        this.increment = 180 / 100;
        const progress = 'rotate(' + this.increment * this.percent + 'deg)';
        this.transform = this.sanitizer.bypassSecurityTrustStyle(progress);
        this.fixTransform = this.sanitizer.bypassSecurityTrustStyle(progress);
        if (this.timer.secondsRemaining > 0) {
          this.timerTick();
          
        } else {
          this.timer.hasFinished = true;
        }
        
      }, 1000);
    }
    
    getSecondsAsDigitalClock(inputSeconds: number) {
      const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
      const hours = Math.floor(secNum / 3600);
      const minutes = Math.floor((secNum - (hours * 3600)) / 60);
      const seconds = secNum - (hours * 3600) - (minutes * 60);
      let hoursString = '';
      let minutesString = '';
      let secondsString = '';
      hoursString = (hours < 10) ? '0' + hours : hours.toString();
      minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
      secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
      return hoursString + ':' + minutesString + ':' + secondsString;
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
        this.ngOnInit()
        
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
        this.ngOnInit()
        
      })
    }
  }
  