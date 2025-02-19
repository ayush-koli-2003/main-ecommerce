import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: false,
  
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm:FormGroup;

  constructor(private userAuth:UserAuthService,private router:Router){
    this.loginForm=new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      psw: new FormControl('',[Validators.required,Validators.pattern(/^\S*$/),Validators.minLength(6)])
    })
    
  }

  onSubmit(){
    // const controls = this.loginForm.controls

    // for(let c in controls){
    //   if(controls[c].valid===false){
    //     alert("Invalid data in: "+c);
    //     console.log(controls[c].value);
        
    //   }
    // }
    
    // if(this.loginForm.valid){
    //   // this.userAuth.authenticateUser({email:this.loginForm.value.email,password:this.loginForm.value.psw})
    //   console.log("Form submitted");
      
    // }
    // else{
    //   alert("Not submitted")
    // }

    if(this.loginForm.valid){
      if(this.userAuth.authenticateUser({email:this.loginForm.value.email,password:this.loginForm.value.psw})){
        this.router.navigate(['/home'])
        // console.log("Worked");
        
      }
    }
    
  }
}
