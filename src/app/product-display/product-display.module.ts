import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataView } from 'primeng/dataview';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { Message } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductInfoDirective } from '../directives/product-info.directive';



@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ProductInfoComponent,
    ProductInfoDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataView,
    ButtonModule,
    Toast,
    Message,
    CardModule
  ],
  providers:[provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura,
            options: {
              darkModeSelector: false||'none'
            }
        }
    })]
})
export class ProductDisplayModule { }
