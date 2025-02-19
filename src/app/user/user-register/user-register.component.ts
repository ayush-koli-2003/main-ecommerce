import { Component } from '@angular/core';
import { FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute, Navigation, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: false,
  
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  registerForm:FormGroup;

  constructor(private userAuth:UserAuthService,private router:Router,private route:ActivatedRoute){
    this.registerForm = new FormGroup({
      name: new FormControl(null,[Validators.required,Validators.pattern(/^\S*$/)]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      age: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
      psw:new FormControl(null,[Validators.required,Validators.pattern(/^\S*$/),Validators.minLength(6)])
    })
  }

  checkFormData(){
    // console.log((this.registerForm.controls['email'].errors as ValidationErrors));
    
    if(this.registerForm.valid){
      let u:User = {name:this.registerForm.value.name,age:parseInt(this.registerForm.value.age),email:this.registerForm.value.email,password:this.registerForm.value.psw}
      this.userAuth.registerUser(u);
      
      this.router.navigate(['../login'],{relativeTo:this.route})
    }

    // Redirect After auth using router state
    // let stateUrl = (((this.router.getCurrentNavigation() as Navigation)?.extras).state as {[k: string]: any;})['redirectAfterAuth']
    // console.log(stateUrl);
  }
}
