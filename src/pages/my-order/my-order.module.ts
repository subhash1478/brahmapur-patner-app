import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrderPage } from './my-order';

@NgModule({
  declarations: [
    MyOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrderPage),
  ],
})
export class MyOrderPageModule {}
