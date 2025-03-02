import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { DataView } from 'primeng/dataview';


@NgModule({
  declarations: [
    CartListComponent
  ],
  imports: [
    CommonModule,
    Message,
    DataView,
    ButtonModule,
  ]
})
export class CartHandlerModule { }
