import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import  jspdf  from 'jspdf';
import  'jspdf-autotable';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{

  transactions:any=[];

  // dependency injection
  constructor(private api:ApiService){}

  ngOnInit(): void {
    //api calling
    this.api.transactionHistory().subscribe((result:any)=>{
      console.log(result);
      this.transactions=result.transactions
      console.log(this.transactions);
      
    },
    (result:any)=>{
      console.log(result.error.message);
      
    })
  }

//genrate pdf 
generatePdf(){

  //1 create an object for jspdf
  var pdf = new jspdf();

  //2  setup row for the table
  let thead = ['Type','From Account','To Account','Amount']
  let tbody = []

  //3 setup properties for the table
  pdf.setFontSize(16)
  pdf.text('mini statement',15,10)

  //4 to display as table we need to convert array to objects into nested array

  for(let item of this.transactions){
    let temp=[item.type,item.fromAccno,item.toAccno,item.amount]//nested array
    tbody.push(temp)
  }

  //5 convert nested array into table structure using jspdf-autotable
  (pdf as any).autoTable(thead,tbody)

  //6 to open pdf in another tab
  pdf.output('dataurlnewwindow')

  //7 to download/save pdf
  pdf.save('Transactionhistory.pdf')


}

}
