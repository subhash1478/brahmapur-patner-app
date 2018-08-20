 import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Config } from '../../config';
import { Response } from "@angular/http";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

/*
Generated class for the ServicesProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  constructor(private http: HttpClient, private geolocation: Geolocation) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message+
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };



  getCategory() {
    return this.http.get(Config.API_ENDPOINT + '/get-category')
      .map((response: Response) => response)
      .catch(this.handleError)
  }




  getVendor() {
    return this.http.get(Config.API_ENDPOINT + '/get-vendor')
      .map((response: Response) => response)
      .catch(this.handleError)
  }

  getFacebookGraphApi(data) {

    return this.http.get('https://graph.facebook.com/me/?fields=picture.type(large),email,about,first_name,last_name,address,birthday,cover,age_range&access_token=' + data.authResponse.accessToken)
      .map((response: Response) => response)
      .catch(this.handleError)
  }


  //
  // ──────────────────────────────────────────────────────────────────── XIII ──────────
  //   :::::: F A C E B O O K   L O G I N : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────
  //

  login(data) {
    return this.http.post(Config.API_ENDPOINT + '/fblogin', data)
      .map((response: Response) => response)
      .catch(this.handleError)

  }
  getaddress() {

    return this.http.get(Config.MAP + '&latlng=' + Config.LOCATION.latitude + ',' + Config.LOCATION.longitude)
      .map((response: Response) => response)
      .catch(this.handleError)
  }

  addreview(data) {
    return this.http.post(Config.API_ENDPOINT + '/add-review', data)
      .map((response: Response) => response)
      .catch(this.handleError)

  }

  getreview(data) {
    return this.http.get(Config.API_ENDPOINT + '/get-review?_id=' + data._id)
      .map((response: Response) => response)
      .catch(this.handleError)

  }


  getGeolocation() {

    return this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords)


      // resp.coords.latitude
      // resp.coords.longitude
      var obj = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      }

      localStorage.setItem('location', JSON.stringify(obj))


    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  getChatHistory(obj) {

    return this.http.get(Config.API_ENDPOINT + '/chatHistory?remoteUserId=' + obj.remoteuserid + '&page=' + obj.page)
      .map((response: Response) => response)
      .catch(this.handleError)

  }

  //
  // ─── GET CHAT USER LIST ─────────────────────────────────────────────────────────
  //

  getChatUserLIst() {

    return this.http.get(Config.API_ENDPOINT + '/chat-user-list')

  }

  getpromoter() {
    return this.http.get(Config.API_ENDPOINT + '/get-promoter')
      .map((response: Response) => response)
      .catch(this.handleError)
  }

  search(data) {
    return this.http.post(Config.API_ENDPOINT + '/search', data)
      .map((response: Response) => response)
      .catch(this.handleError)
  }

  getPostDetails(data) {
    return this.http.get(Config.API_ENDPOINT + '/get-post-details?id=' + data)
      .map((response: Response) => response)
      .catch(this.handleError)
  }
  getPost() {
    return this.http.get(`${Config.API_ENDPOINT}/get-post`)
      .map((response: Response) => response)
      .catch(this.handleError)
  }

  doLogin(data) {
    return this.http.post(Config.API_ENDPOINT + '/login', data)
      .map((response: Response) => response)
      .catch(this.handleError)
  }
  register(data) {
    return this.http.post(Config.API_ENDPOINT + '/register', data)
      .map((response: Response) => response)
      .catch(this.handleError)
  }

  updateuser(data) {
    return this.http.post(Config.API_ENDPOINT + '/updateuser', data)
      .map((response: Response) => response)
      .catch(this.handleError)
  }

  getUserDetails() {
    return this.http.get(Config.API_ENDPOINT + '/userdetails')
      .map((response: Response) => response)
      .catch(this.handleError)
  }

  forgetPassword(data){
    return this.http.post(`${Config.API_ENDPOINT}/forget-password`,data)
    .map((response:Response)=>response)
    .catch(this.handleError)
  }
   
  changePassword(data){
    return this.http.post(`${Config.API_ENDPOINT}/change-password`,data)
    .map((response:Response)=>response)
    .catch(this.handleError)
  }
  feedback(data){
    return this.http.post(`${Config.API_ENDPOINT}/feedback`,data)
    .map((response:Response)=>response)
    .catch(this.handleError)
  }
  getCms(data){
    return this.http.get(`${Config.API_ENDPOINT}/get-cms?pagename=${data}`)
    .map((response:Response)=>response)
    .catch(this.handleError)
  }

  getTagsById(data){
       return this.http.get(`${Config.API_ENDPOINT}/get-tags-by-id?id=${data.id}`)
      .map((response:Response)=>response)
      .catch(this.handleError)
  }

  getProductCategory(data){
    return this.http.get(`${Config.SAIL_ENDPOINT}/get-product-category?shopid=${data.shopid}`)
    .map((response:Response)=>response)
    .catch(this.handleError)
  }

  
  
  getProduct(data){
    return this.http.get(`${Config.SAIL_ENDPOINT}/get-product?id=${data}`)
    .map((response:Response)=>response)
    .catch(this.handleError)
  }

  
  addToCart(data){
    return this.http.post(`${Config.SAIL_ENDPOINT}/add-to-cart`,data)
    .map((response:Response)=>response)
    .catch(this.handleError)
  }

  getCart(data){
  return this.http.get(`${Config.SAIL_ENDPOINT}/get-cart`)
  .map((response:Response)=>response)
  .catch(this.handleError)
}
shippingAddress(data){
  return this.http.post(`${Config.SAIL_ENDPOINT}/add-shipping-address`,data)
  .map((response:Response)=>response)
  .catch(this.handleError)
}


getShippingAddress(data){
  return this.http.get(`${Config.SAIL_ENDPOINT}/get-shipping-address?userid=${data.userid}`)
  .map((response:Response)=>response)
  .catch(this.handleError)
}

makePaymenrtRequest(data){
  return this.http.post(`${Config.SAIL_ENDPOINT}/payment-link`,data)
  .map((response:Response)=>response)
  .catch(this.handleError)
}
createOrder(data){
  return this.http.post(`${Config.SAIL_ENDPOINT}/create-order`,data)
  .map((response:Response)=>response)
  .catch(this.handleError)
}
getOrderDetails(id){
  return this.http.get(`${Config.SAIL_ENDPOINT}/get-order?id=${id}`)
  .map((response:Response)=>response)
  .catch(this.handleError)
} 

getOrderList(id){
  return this.http.get(`${Config.SAIL_ENDPOINT}/get-order-list?id=${id}`)
  .map((response:Response)=>response)
  .catch(this.handleError)
}


removeItem(data){
  return this.http.post(`${Config.SAIL_ENDPOINT}/remove-cart-item`,data)
  .map((response:Response)=>response)
  .catch(this.handleError)
}
 
getDriverOrderList(data){
  return this.http.get(`${Config.SAIL_ENDPOINT}/get-driver-order-list?id=${data.id}&status=${data.status}&driver_accept=${data.driver_accept}`)
  .map((response:Response)=>response)
  .catch(this.handleError)
}
getNewOrder(data){
  return this.http.get(`${Config.SAIL_ENDPOINT}/get-new-order?id=${data.id}&type=${data.type}&&status=${data.status}`)
  .map((response:Response)=>response)
  .catch(this.handleError)
}
getUserShop(data){
  return this.http.get(`${Config.SAIL_ENDPOINT}/get-user-shop?id=${data.id}`)
  .map((response:Response)=>response)
  .catch(this.handleError)
}


task(data){
  return this.http.post(`${Config.SAIL_ENDPOINT}/task`,data)
  .map((response:Response)=>response)
  .catch(this.handleError)
}

saveDevicesToken(data){
  return this.http.post(`${Config.SAIL_ENDPOINT}/add-devices`,data)
  .map((response:Response)=>response)
  .catch(this.handleError)
}
}
 