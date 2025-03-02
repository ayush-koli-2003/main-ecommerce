import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDisplayModule } from './product-display/product-display.module';
import { CartHandlerModule } from './cart-handler/cart-handler.module';
import { UserRoutingModule } from './user/user-routing.module';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { MenubarModule } from 'primeng/menubar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { provideHttpClient } from '@angular/common/http';
import { Select } from 'primeng/select';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductDisplayModule,
    CartHandlerModule,
    MenubarModule,
    AutoCompleteModule,
    FormsModule,
    MenuModule,
    ButtonModule,
    Select,
  ],
  providers: [provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
  provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
