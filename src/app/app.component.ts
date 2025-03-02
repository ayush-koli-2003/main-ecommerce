import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';
import { ProductHandlerService } from './services/product-handler.service';
import { MenuItem } from 'primeng/api';
import { last } from 'rxjs';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'main-ecommerce';
  role:string=''
  currUser:any={}
  
  searchInput: string='';
  productNames:any[]=[];
  productSuggestions:any[]=['milk']
  menuitems:MenuItem[]=[]
  options:MenuItem[]=[]
  loggedOutOptions:MenuItem[]=[];

  sortoptions:any[]=[{name:'Price'},{name:'Rating'}];
  selectedsort!:string;

  constructor(private authService:UserAuthService,private router:Router,private prodHandler:ProductHandlerService){
    let cred = {email:"admin@gmail.com", password:"admin1"}
    sessionStorage.setItem("admin",JSON.stringify(cred));
    console.log(localStorage.getItem('admin'));
  }

  ngOnInit(): void {
    this.prodHandler.obsProducNameList$.subscribe(
      (data)=> {
        this.productNames=data;
      }
    )

    this.authService.checkRole.subscribe(
      (data)=> this.role=data
    )

    this.authService.subjectUserObservable$.subscribe(
      {
        next:(user)=> {this.currUser = user; console.log(this.currUser.isLogged);
        }
      }
    )

    this.menuitems=[
      {label:'Home',icon: 'pi pi-home',routerLink:'/home'},
    ]
    this.options = [
        {label:'Logout',command:this.logout.bind(this)},
    ]

    this.loggedOutOptions=[
      {label:'Login',routerLink:'/user'},
      {label:'Profile',routerLink:'/user',visible:false}
    ]
  }
  
  search(event: AutoCompleteCompleteEvent) {
    this.prodHandler.search(this.searchInput)
    
    this.productSuggestions = this.productNames.filter(x=> x.includes(event.query));
  }

  logout(){
    this.authService.logOut()
  }

  takeSort(value:any){
    // console.log(value);
    // this.router.navigate(['/home'],{queryParams:{criteria:value}})
    console.log(value.name.toLowerCase());
    
    this.prodHandler.sort(value.name.toLowerCase());
  }

  takeInput(){
    // this.router.navigate(['/home'],{queryParams:{searchInput:search}})
    this.prodHandler.search(this.searchInput)
  }
}
