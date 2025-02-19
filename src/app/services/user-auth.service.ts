import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserAuthService {
  role:string="user";
  roleSubject:BehaviorSubject<string>= new BehaviorSubject(this.role);
  currUser:{username:string,email:string,age:number|null,role:string,isLogged:boolean}={username:'',email:'',role:'user',age:0,isLogged:false};

  subjectUser = new BehaviorSubject(this.currUser)
  subjectUserObservable$ = this.subjectUser.asObservable();
  checkRole = this.roleSubject.asObservable();
  userList:Array<User>=[]
  constructor(private router:Router) { 

  }

  registerUser(u:User){
    console.log(u);
    
    this.userList.push(u);

    sessionStorage.setItem('users',JSON.stringify(this.userList))
  }

  logOut(){
    this.currUser ={username:'',email:'',role:'user',age:0,isLogged:false};
    this.subjectUser.next(this.currUser)
    this.router.navigate(['/home'])
    // sessionStorage.removeItem('currUser')
  }
  
  authenticateUser(u:{email:string,password:string}){
    
    if(sessionStorage.getItem('admin')!==null){
      let data = (sessionStorage.getItem('admin') as string);
      let adminData = JSON.parse(data);
      if((adminData  as unknown as {email:string,password:string}).email === u.email){

        if((adminData  as unknown as {email:string,password:string}).password===u.password){
          sessionStorage.setItem('currRole','admin');
          this.role = sessionStorage.getItem('currRole') as string;
          this.roleSubject.next(this.role)
          console.log(sessionStorage.getItem('currRole'));

          this.currUser = {username:'admin',email:u.email,age:null,role:'admin',isLogged:true};
          // Emit observable
          this.subjectUser.next(this.currUser)

          console.log(this.currUser);
          return true;
        }
        else{
          alert("Wrong credentials");
          return false;
        }
      }
      
    }

    // for(let i=0;i<this.userList.length;i++){
    //   if(this.userList[i].email===u.email){
    //     if(this.userList[i].password===u.password){
    //       return true;
    //     }
    //     else{
    //       alert("Wrong credentials")
    //       return false;
    //     }
    //   }
    // }
    if(sessionStorage.getItem('users')!==null){
      let list = JSON.parse(sessionStorage.getItem('users') as string);
      console.log(list as Array<User>);
      for(let i=0;i<list.length;i++){
        if(list[i].email===u.email){
          if(list[i].password===u.password){
            sessionStorage.setItem('currRole','user');
            this.role = sessionStorage.getItem('currRole') as string;
            this.roleSubject.next(this.role)
            console.log(sessionStorage.getItem('currRole'));
            this.currUser = {username:list[i].name,email:u.email,age:list[i].age,role:'user',isLogged:true};
            console.log(this.currUser);
            this.subjectUser.next(this.currUser)
            return true;
          }
          else{
            alert("Wrong credentials")
            return false;
          }
        }
      }
    }
    

    alert("No user with email")
    return false;
  }
}
