import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http:HttpClient) { }

  //register api function
  register(username:any,accno:any,password:any){
    const body={
      username,
      accno,
      password
    }
    return this.http.post('http://localhost:5000/register',body)
  }

  //login api function
  login(accno:any,password:any){
    const body={
      accno,
      password
    }
    return this.http.post('http://localhost:5000/login',body)
  }

  //append token to the header
  appendToken(){
    // get token from localstorage
    let token = localStorage.getItem('token')
    // create httpheader
    let headers = new HttpHeaders()


    if(token){
      headers=headers.append('verify-token',token)
      options.headers=headers
    }
    return options
  }

  //balance api function
  getbalance(accno:any){
    return this.http.get('http://localhost:5000/getbalance/'+accno,this.appendToken())
  }

  //fund transfer api fuction
  fundTransfer(toAccno:any,password:any,amount:any){
    const body={
    toAccno,
    password,
    amount
    }
    return this.http.post('http://localhost:5000/fundtransfer',body,this.appendToken())
  }

  //transaction history api function
  transactionHistory(){
    return this.http.get('http://localhost:5000/transactions',this.appendToken())
  }

  // delete account api function
  deleteAccount(){
    return this.http.delete('http://localhost:5000/deleteAccount',this.appendToken())
  }

}
