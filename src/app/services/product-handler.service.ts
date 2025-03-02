import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable, throttleTime } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ProductHandlerService {
  static productId:number = 4;
  productList:Array<Product>=[];
  subject:BehaviorSubject<Array<Product>>= new BehaviorSubject(this.productList);
  checkProductList = this.subject.asObservable();
  cartList:Array<Product>=[];
  subjectCart:BehaviorSubject<Array<Product>>= new BehaviorSubject(this.productList);
  checkCartList = this.subjectCart.asObservable();

  sortAndSearch:{searchIput?:string,criteria?:keyof Product}={searchIput:'',criteria:'price'}
  subSearchSort = new BehaviorSubject(this.sortAndSearch);
  searchSortObs$ = this.subSearchSort.asObservable();

  productNameList:string[]=[]
  subProductNameList = new BehaviorSubject(this.productNameList)
  obsProducNameList$ = this.subProductNameList.asObservable();
  constructor(private http:HttpClient) { 
    this.productList=[{id:1,image:"https://th.bing.com/th/id/OIP.vutZp9AOZ3ena4Bn3d0_PQHaIg?rs=1&pid=ImgDetMain",name:"headphone",category:"electronics",price:1000,rating:4.3},{id:2,image:"https://th.bing.com/th/id/OIP.A5aNdTGib5znukF3O8Zz7gHaE8?rs=1&pid=ImgDetMain",name:"drone",category:"toys",price:3000,rating:4},{id:3,image:"https://th.bing.com/th/id/OIP.s1Cqcdi4054s4Db0AeFsSwHaLG?rs=1&pid=ImgDetMain",name:"Dishes",category:"grocery",price:100,rating:3.5},{id:4,image:"https://th.bing.com/th/id/OIP.IntLCKTZTt0uhLCb4AmsFwHaHQ?rs=1&pid=ImgDetMain",name:"Milk",category:"daily-essentials",price:10,rating:4.1},{id:5,image:"https://th.bing.com/th/id/OIP.d7K2KFlJXJP_5KtfVGthJQHaE8?rs=1&pid=ImgDetMain",name:"Choclate",category:"sweets",price:20,rating:4.9},{id:6,image:"https://www.shutterstock.com/image-photo/top-view-mechanical-keyboard-minimal-260nw-2194181879.jpg",name:"Mechanical keyboard",category:"electronic",price:150,rating:4.3},{id:7,image:"https://th.bing.com/th/id/OIP.g_hpjHu-jUnbjcCdFf6ZPwHaEK?rs=1&pid=ImgDetMain",name:"Acer curved monitor",category:"electronic",price:600,rating:3.6}];
    this.cartList = new Array();
    this.subjectCart.next(this.cartList)
    this.subject.next(this.productList)

    this.updateNames();
  }

  updateNames(){
    this.productNameList = this.productList.map((x)=> {
      return x.name.toLowerCase()
    });
    this.subProductNameList.next(this.productNameList);
  }

  search(searchInput:string){
    this.subSearchSort.next({searchIput:searchInput})
  }

  sort(criteria:string){
    this.subSearchSort.next({criteria:(criteria as keyof Product)})
  }

  // getProductList(){
  //   return this.productList;
  // }

  addToCart(id:number){
    const product = this.productList.find(p => p.id === id);

    if (product) {
      const existingProduct = this.cartList.find(p => p.id === id);

      if (existingProduct) {
        ((existingProduct as Product).quantity as number) += 1;
      } else {
        product.quantity = 1;
        this.cartList.push({ ...product });
      }
      this.subjectCart.next(this.cartList);
    }
  }

  removeFromCart(id:number){
    const productIndex = this.cartList.findIndex(p => p.id === id);

    if (productIndex !== -1) {
      const product = this.cartList[productIndex];

      if (((product as Product).quantity as number) > 1) {
        ((product as Product).quantity as number) -= 1;
      } else {
        this.cartList.splice(productIndex, 1);
      }
      
      this.subjectCart.next(this.cartList);
    }
  }

  // getCartList(){
  //   return this.cartList;
  // }

  removeFromList(id:number){
    for(let i=0;i<this.productList.length;i++){
      if(this.productList[i].id===id){
          
        this.productList.splice(i,1);
        this.subject.next(this.productList);
        break;
      }
    }
    for(let i=0;i<this.cartList.length;i++){
      if(this.cartList[i].id===id){
          
        this.cartList.splice(i,1);
        break;
      }
    }
    this.subjectCart.next(this.cartList)
    this.updateNames();
  }

  addProduct(restProd:any){

    let p:Product = {id:ProductHandlerService.productId++,...restProd};
    // console.log(p);
    
    this.productList.push(p);
    console.log(this.productList);
    this.subject.next(this.productList);
    this.updateNames();
  }
}
