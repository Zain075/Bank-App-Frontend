import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
//to hold error message
RegisterError:string='';
RegisterSucess:string='';


    constructor(private fb:FormBuilder,private api:ApiService,private loginRouter:Router){}
    // form validation
    registerForm=this.fb.group({//formGroup
      username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],//formArray
      accno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    })
    //form control passed to html form

    register(){
      if(this.registerForm.valid){
      console.log(this.registerForm.value);
      let username=this.registerForm.value.username
      let accno=this.registerForm.value.accno
      let password=this.registerForm.value.password
      console.log(username,accno,password);
      //api call to register
      this.api.register(username,accno,password).subscribe((response:any)=>{
        console.log(response);//message
        alert(response.message);//sucess message
       this.RegisterSucess=response.message;
        setTimeout(()=>{
           //redirect to login page
        this.loginRouter.navigateByUrl('')
        },3000)
      },
      (response:any)=>{
        this.RegisterError=response.error.message;//error message

        setTimeout(()=>{
          this.registerForm.reset();
          this.RegisterError='';
        },3000)
      }
      )
      // alert('Register Done');
    }
    else{
      alert('Invalid Input');
    }
}
}

