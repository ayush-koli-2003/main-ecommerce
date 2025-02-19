import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, throttleTime } from 'rxjs';
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
  constructor() { 
    this.productList=[{id:1,image:"https://th.bing.com/th/id/OIP.vutZp9AOZ3ena4Bn3d0_PQHaIg?rs=1&pid=ImgDetMain",name:"headphone",category:"electronics",price:1000,rating:4.3},{id:2,image:"https://th.bing.com/th/id/OIP.A5aNdTGib5znukF3O8Zz7gHaE8?rs=1&pid=ImgDetMain",name:"drone",category:"toys",price:3000,rating:4},{id:3,image:"https://th.bing.com/th/id/OIP.HR6f8Ijw6H533zm9T906aQHaFh?rs=1&pid=ImgDetMain",name:"dishes",category:"grocery",price:100,rating:3.5},{id:4,image:"https://th.bing.com/th/id/R.cfac6265b5c34fc0f798ac8d2a1d46d7?rik=vk3ZvT61qkqItg&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f220000%2fvelka%2fmilk.jpg&ehk=LABI3jFZrPzx2S34XmRz9A46Hl%2fcGyPKxzuPesdcTDg%3d&risl=&pid=ImgRaw&r=0",name:"Milk",category:"daily-essentials",price:10,rating:4.1},{id:5,image:"https://th.bing.com/th/id/R.c6411f00ddf93835781e5c86e4e3fe18?rik=G%2f3AMspP86iKug&riu=http%3a%2f%2ffreefoodphotos.com%2fimagelibrary%2fconfectionery%2fmilk_chocolate.jpg&ehk=nxVeRD2gavA2HK%2bgzFrwQApD5NEzXZRsBagBhIQSH%2fY%3d&risl=&pid=ImgRaw&r=0",name:"Choclate",category:"sweets",price:20,rating:4.9},{id:6,image:"https://www.shutterstock.com/image-photo/top-view-mechanical-keyboard-minimal-260nw-2194181879.jpg",name:"Mechanical keyboard",category:"electronic",price:150,rating:4.3},{id:7,image:"https://th.bing.com/th/id/OIP.g_hpjHu-jUnbjcCdFf6ZPwHaEK?rs=1&pid=ImgDetMain",name:"Acer curved monitor",category:"electronic",price:600,rating:3.6}];
    this.cartList = new Array();
    this.subjectCart.next(this.cartList)
    this.subject.next(this.productList)
  }

  search(searchInput:string){
    this.subSearchSort.next({searchIput:searchInput})
  }

  sort(criteria:string){
    this.subSearchSort.next({criteria:(criteria as keyof Product)})
  }

  getProductList(){
    return this.productList;
  }

  addToCart(id:number){
    // console.log(id);
    
    for(let i=0;i<this.productList.length;i++){
        // console.log(this.productList[i].id);
        if(this.productList[i].id===id){
            
          this.cartList.push(this.productList[i]);
          break;
        }
    }
    this.subjectCart.next(this.cartList);
    return this.cartList;
  }

  removeFromCart(id:number){
    for(let i=0;i<this.cartList.length;i++){
      if(this.cartList[i].id===id){
          
        this.cartList.splice(i,1);
        break;
      }
    }
    this.subjectCart.next(this.cartList);
    return this.cartList;
  }

  getCartList(){
    return this.cartList;
  }

  removeFromList(id:number){
    for(let i=0;i<this.productList.length;i++){
      if(this.productList[i].id===id){
          
        this.productList.splice(i,1);
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
  }

  addProduct(restProd:any){

    let p:Product = {id:ProductHandlerService.productId++,...restProd};
    // console.log(p);
    
    this.productList.push(p);
    console.log(this.productList);
    this.subject.next(this.productList);
  }
}
