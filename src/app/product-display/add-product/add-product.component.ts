import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductHandlerService } from '../../services/product-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: false,
  
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  newProductForm:FormGroup;

  constructor(private productHandler:ProductHandlerService,private router:Router){
    this.newProductForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      rating: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl('')
    })
  }

  onSubmit(){
    const price = parseInt(this.newProductForm.value.price);
    const rating = parseInt(this.newProductForm.value.rating)

    this.productHandler.addProduct({
        image: this.newProductForm.value.image,
        name: this.newProductForm.value.name,
        category: this.newProductForm.value.category,
        price: price,
        rating: rating
    });

    this.router.navigate(['/home'])
  }
}
