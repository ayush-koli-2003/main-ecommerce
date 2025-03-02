import { Component, Input, Output, ViewContainerRef } from '@angular/core';
import { Product } from '../../interfaces/product';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-info',
  standalone: false,
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent {
  items: MenuItem[] | null=[];
  @Input() product!:Product
  @Input() callbackFn:()=>void=()=>{};
  @Input() saveCallback:(id:number)=>void=()=>{}

  constructor(private messageService:MessageService){}

  ngOnInit(){
    this.items = [
      {
          icon: 'pi pi-pencil',
          command: () => {
              this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      }]
  }

  closeInfoCard(){
    console.log('Closed card');
    
    this.callbackFn();
  }

  addToCart(){
    this.saveCallback(this.product.id);
  }
}
