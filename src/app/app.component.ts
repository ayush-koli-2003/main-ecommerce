import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';
import { ProductHandlerService } from './services/product-handler.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'main-ecommerce';
  role:string=''
  currUser:any
  constructor(private authService:UserAuthService,private router:Router,private prodHandler:ProductHandlerService){
    let cred = {email:"admin@gmail.com", password:"admin1"}
    sessionStorage.setItem("admin",JSON.stringify(cred));
    console.log(localStorage.getItem('admin'));
  }

  ngOnInit(): void {
    this.authService.checkRole.subscribe(
      (data)=> this.role=data
    )

    this.authService.subjectUserObservable$.subscribe(
      {
        next:(user)=> this.currUser = user 
      }
    )
  }

  logout(){
    this.authService.logOut()
  }

  takeSort(value:string){
    // console.log(value);
    // this.router.navigate(['/home'],{queryParams:{criteria:value}})
    this.prodHandler.sort(value)
  }

  takeInput(search:string){
    // this.router.navigate(['/home'],{queryParams:{searchInput:search}})
    this.prodHandler.search(search)
  }
}
