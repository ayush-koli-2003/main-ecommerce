import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductHandlerService } from '../../services/product-handler.service';
import { Product } from '../../interfaces/product';
import { UserAuthService } from '../../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, distinctUntilChanged, of, switchMap, throttleTime } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProductInfoDirective } from '../../directives/product-info.directive';
import { ProductInfoComponent } from '../product-info/product-info.component';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers:[MessageService]
})
export class ProductListComponent implements OnInit {

  productList:Array<Product>=[]
  cartList:Array<Product>;
  role:string="";
  criteria:keyof Product='price'
  searchQuery:string=''
  currUser:any

  layout: string = 'grid';

  @ViewChild(ProductInfoDirective,{static:true}) dynamicProductInfo!:ProductInfoDirective
  // @ViewChild('productInfo',{read:ViewContainerRef}) vcr!:ViewContainerRef
  // @ViewChild('productInfo',{read:TemplateRef}) tempRef!:TemplateRef<any>
  vcr!:ViewContainerRef

  constructor(private messageService: MessageService,private router:Router, private route: ActivatedRoute,private productHandler:ProductHandlerService,private authService:UserAuthService){
    this.cartList=new Array();
  }

  ngOnInit(): void {
    this.vcr = this.dynamicProductInfo.viewContainerRef;
    this.productHandler.checkProductList.subscribe(
      (data)=> {this.productList= data;
        console.log(data);
        
      }
    )

    this.authService.checkRole.subscribe(
      (data)=> this.role=data
    )

    this.authService.subjectUserObservable$.subscribe(
      (user)=> this.currUser = user
    )

    this.productHandler.searchSortObs$
    .pipe(
      // distinctUntilChanged()
    )
    .subscribe(
      (params) => {
        if(params.criteria!==undefined ){
          this.criteria = params.criteria;
          if(this.criteria==='rating'){
            this.productList.sort((a,b)=> (b[this.criteria] as number)-(a[this.criteria] as number))
            console.log("Sort by rating");
            
            // console.log(this.productList);
          }
          else if(this.criteria!=='category'){
            this.productList.sort((a,b)=> (a[this.criteria] as number)-(b[this.criteria] as number))
            // console.log(this.productList);
          }
        }

        if(params.searchIput!==undefined){
          this.searchQuery = params.searchIput;
          // let searchKeys = this.searchQuery.split(' ');

          // for(let key of searchKeys){
          //   this.productList
          // }
          this.productHandler.subject.subscribe(
            (productlist)=> {this.productList=productlist;}
          )
          if(this.searchQuery.length>0){
            this.productList= this.productList.filter(x=> x.name.toLowerCase().includes(this.searchQuery) || x.category.toLocaleLowerCase().includes(this.searchQuery))
          }
        }
      }
    )

    if(this.criteria!=='category'){
      
      this.productList.sort((a,b)=> (a[this.criteria] as number)-(b[this.criteria] as number))
      // console.log(this.productList);
      
    }

  }


  addCart(id:number){
    if(this.currUser.isLogged===false){
      this.router.navigate(['/user/login'])
    }
    
    this.productHandler.addToCart(id);
    console.log(this.cartList);
    this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Added to cart!', life: 1500 });
  }

  removeFromList(id:number){
    this.productHandler.removeFromList(id);
    // console.log(this.cartList);
  }

  openInfoCard(product:Product){
    console.log("Open info card");
    
    this.vcr.clear();
    let compRef = this.vcr.createComponent(ProductInfoComponent)
    compRef.setInput('product',product);
    compRef.setInput('callbackFn',this.closeInfoCard.bind(this));
    compRef.setInput('saveCallback',this.addCart.bind(this));

  }

  closeInfoCard(){
    this.vcr.clear()
  }

}

