import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services'
import { UtilityProvider } from '../../providers/utility/utility'
import { Config } from '../../config';
/**
 * Generated class for the MyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {
  loggedInid: any;
  order: any[];
  productList: any[];
  error_message: string;
  constructor(
  
    public utility: UtilityProvider, public navCtrl: NavController, 
    public navParams: NavParams, public _services: ServicesProvider) 
    {
 let user=JSON.parse(localStorage.getItem('userdetails'));
 this.loggedInid=user._id

 console.log(this.loggedInid);
 
    }

  ionViewDidLoad() {

 
      let shopid=[]
            
            let obj={
              id: this.loggedInid,
          
            }
      
            this._services.getUserShop(obj).subscribe((response)=>{
              
               let result=response.response.data
              for (let index = 0; index < result.length; index++) {
                const element = result[index];
                shopid.push(element.id)
      
              }
              let data={
                id: shopid.toString(),
               type:'partner',
               status:1
              }
        
              console.log(data);
              
              this._services.getNewOrder(data).subscribe((response)=>{
                
                console.log(response.response.data);
                
                this.productList=response.response.data;
                
               // this.startTimer()
                
                
              },(error)=>{
                console.log(error);
                
        
                this.error_message='No new task'
              })
              
            },(error)=>{
              console.log(error);
              
      
             })
             console.log(shopid);
             
      
 
            
      
          }
           
}
