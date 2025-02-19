import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { UserAuthService } from "../services/user-auth.service";

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{

  user:any
  router:Router

  constructor(private authService:UserAuthService,router:Router){
    this.router=router
    this.authService.subjectUserObservable$.subscribe(
      (currUser)=> this.user=currUser
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.user.isLogged === false){
      this.router.navigate(['/user/register'])
    }

    if(state.url === '/newProduct'){
      if(this.user.role==='admin'){
        return true;
      }
      else{
        this.router.navigate(['/user/register'],{state:{redirectAfterAuth:'/newProduct'}})
      }
    }
    

    return true;
  }
}