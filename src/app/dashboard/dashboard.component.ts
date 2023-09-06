import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  user:string='';// to hold current username
  balance:string='';// to hold the balance
  currentAccno:string='';// to hold the account number

  transferSuccess:string='';
  transferError:string='';

  accno:any;//for parent(dashboard) to child(remove account) communication
 deleteConfirmStatus: boolean = false; //delete confirmatioon page 
 deleteSuccessMsg: string='';

  constructor(private fb:FormBuilder, private api:ApiService, private logoutRouter:Router){

  }
  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.user=localStorage.getItem('currentUser')||'';// currentUser
    }
    if(localStorage.getItem('balance')){
      this.balance=localStorage.getItem('balance')||''; // balance
    }
    if(localStorage.getItem('currentAccno')){
      this.currentAccno=localStorage.getItem('currentAccno')||'';//currentAccno
    }
    

  }
  //create a formGroup and array
  FundTransferFrom=this.fb.group({
    creditAcno:['',[Validators.required,Validators.pattern('[0-9A-Za-z]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[0-9A-Za-z]*')]]
  })
  //control passes through html page

  
  isCollapse: boolean = false
  collapse(){
    this.isCollapse=!this.isCollapse
  }

  dashboardForm(){
    if(this.FundTransferFrom.valid){
      let creditAccno= this.FundTransferFrom.value.creditAcno;
      let password = this.FundTransferFrom.value.password;
      let amount = this.FundTransferFrom.value.amount;
       this.api.fundTransfer(creditAccno,password,amount).subscribe((result:any)=>{
        console.log(result);
        this.transferSuccess=result.message
       
        setTimeout(()=>{
          this.transferSuccess=''
          this.FundTransferFrom.reset()
        },3000)
        
       },
       (result:any)=>{
        console.log(result.error.message);
        this.transferError=result.error.message

        setTimeout(()=>{
          this.transferError=''
          this.FundTransferFrom.reset()
        },3000)
        
       }
       )
      // alert('form clicked')
    }
    else{
      alert('please enter valid paramters')
    }
  }

  getBalance(){

    this.api.getbalance(this.currentAccno).subscribe((result:any)=>{
      this.balance=result.balance
    },
    (result:any)=>{
      alert(result.error.message)
    })

  }
//fund transfer
  fundTransfer(){

  }

  reset(){
    this.FundTransferFrom.reset()
    
  }

  close(){

  }

  logout(){
    alert('Confirm Logout')
    this.logoutRouter.navigateByUrl('')
    localStorage.clear()
  }

  deleteAccount(){
    //data to be shared with the child
    this.accno=localStorage.getItem('currentAccno')
    this.deleteConfirmStatus=true
  }

  cancelDeleteConfirm(){
    this.accno=''
    this.deleteConfirmStatus=false
  }

  deleteFromParent(){
    this.api.deleteAccount().subscribe((result: any)=>{
   localStorage.clear()//to remove all the account details
   this. deleteSuccessMsg=result.message //Account deleted successfully  
   setTimeout(()=>{
      this.logoutRouter.navigateByUrl('')// redirect back to login page
    },3000)
     
    
  })
  }
}
