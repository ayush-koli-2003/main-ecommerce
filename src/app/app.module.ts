import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDisplayModule } from './product-display/product-display.module';
import { CartHandlerModule } from './cart-handler/cart-handler.module';
import { UserRoutingModule } from './user/user-routing.module';
import { NotFoundComponent } from './error/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductDisplayModule,
    CartHandlerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
