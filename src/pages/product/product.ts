import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services'
 import { UtilityProvider } from '../../providers/utility/utility'
 import {  ModalController, ViewController } from 'ionic-angular';
 import { Events } from 'ionic-angular'; 
import { Config } from '../../config';
 /**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'page-product/id/:id'
})
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  categoryid: any;
  prodcuctList: any=[];
  qty: number;

  constructor(public utility: UtilityProvider, 
    
    public events: Events,public navCtrl: NavController, public navParams: NavParams, public _services: ServicesProvider,   public viewCtrl: ViewController,
    public modalCtrl: ModalController) {
    this.categoryid = this.navParams.data.id
    console.log("crash", this.navParams.data.id);
    events.subscribe('cartupdated', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('cartupdated');
      this.countCartItem()
    });
  }
  ngOnInit() {
    console.log('ngOnInit');

    //console.log('ionViewDidLoad PostdetailsPage');
    this._services.getProduct(this.categoryid).subscribe((Response) => {
      //console.log(Response.data);
      this.prodcuctList = Response.response.data
     
      
    })
    this.countCartItem()

   }
   ionViewDidLeave(){
     console.log('leave');
     this.events.unsubscribe('cartupdated')
   }
 
  ionViewDidEnter() {
    console.log('ngOnInit');
this.countCartItem()
    console.log('ionViewDidLoad ProductPage');
  }

  addToCart(item) {
    console.log(item);
    
    let modal = this.modalCtrl.create('QtyModalPage',{id:item});
    modal.present();
 }
 

 countCartItem(){

  let obj={
    id:Config.USER._id
  } 
  
  this._services.getCart(obj).subscribe((Response) => {
    this.qty=0

    console.log(Response);
    let result=Response.response.data
    let pro=[]
    for (let index = 0; index < result.length; index++) {
      const element = result[index];

      
      this.qty+=element.quantity
     }

      console.log(this.qty);
      

  }, (error) => {
 
    this.qty=0
  })
 
 }
 goToCart(){
   if(this.qty<1){
    let msg={
      msg:`Please add some item to your product`,
      duration:3000
    }
    this.utility.showToast(msg)
return false
   }
   this.navCtrl.push('CartPage');

 }
}
