import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //to hold error message
  loginError:string='';

  loginSucess:boolean=false;
  
  constructor(private fb:FormBuilder,private api:ApiService, private loginRouter:Router){}
  

   

  
  // form validation
  loginForm=this.fb.group({//formGroup
    accno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  //form control passed to html form

  login(){
    if(this.loginForm.valid){
      let accno=this.loginForm.value.accno
      let password=this.loginForm.value.password
      //api to call register
      this.api.login(accno,password).subscribe((response:any)=>{
        console.log(response);
        
        //sucess message
        this.loginSucess=true
        // to set current balance into local storage
        localStorage.setItem('balance',response.balance)
        // to set current username into local storage
        localStorage.setItem('currentUser',response.currentUser)

         // to set current accno into local storage
         localStorage.setItem('currentAccno',response.currentAccno)
       
           // to set token into local storage
           localStorage.setItem('token',response.token)
       
         // alert('Login successfull')
        setTimeout(()=>{
          this.loginRouter.navigateByUrl('/dashboard')
        },2000)
        
      },
      //error message
      (response:any)=>{
        this.loginError=response.error.message
        setTimeout(()=>{
          this.loginForm.reset()
          this.loginError=''
        },3000)      
      } 
      )
      
    }
    else{
      alert('Invalid Login Id')
    }
  }
}
