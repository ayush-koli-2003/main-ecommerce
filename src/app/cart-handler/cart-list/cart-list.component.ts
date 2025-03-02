import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductHandlerService } from '../../services/product-handler.service';

@Component({
  selector: 'app-cart-list',
  standalone: false,
  
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit {
  cartList:Array<Product>=[];
  total:number=0;

  calculateTotal(){
    this.total = this.cartList.reduce((val,acc)=>val+(acc.price*(acc.quantity as number)),0);
    console.log(this.total);
    
  }
  
  constructor(private productHandler:ProductHandlerService){
    this.calculateTotal();
  }

  ngOnInit(): void {
    this.productHandler.checkCartList.subscribe(
      (data)=> this.cartList=data
    )
    this.calculateTotal()
  }

  removeFromCart(id:number){
    this.productHandler.removeFromCart(id);
    
    console.log(this.cartList);
    this.calculateTotal();
  }

}
