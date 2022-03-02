import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-saved-bills',
  templateUrl: './saved-bills.component.html',
  styleUrls: ['./saved-bills.component.css']
})


export class SavedBillsComponent {
  amountTopayId: string = "";
  amountTopayValue: string = "";
  checkBoxInputId: string = "";
  totalAmountToPay:number=0;
  data: Array<any>;
  buttonDisabled:boolean=true;
  numberOfCheckedBills:number=0;
  displayedColumns: string[] = ['id', 'billerName', 'serviceName', 'billingNumber', 'amountToPay', 'inquire'];


  
  constructor() {
    this.data = [{ id: 1, billerName: 'T-Mobile', serviceName: "Prepaid", billingNumber: "202345555", amountToPay: 5.50 },
    { id: 2, billerName: 'George Mason University ', serviceName: "Student Balance", billingNumber: "G-3788", amountToPay: 5000 },
    { id: 3, billerName: 'Dominion Energy', serviceName: "Energy Bill", billingNumber: "7107 Alexandria", amountToPay: 220 },]
  }


  deleteRow(id: any) {
    for (let i = 0; i < this.data.length; ++i) {
      if (this.data[i].id === id) {
        this.data.splice(i, 1);
      }
    }
    this.amountTopayId = "amountToPay" +id;
    this.checkBoxInputId = "checkBox"+ id;
    this.amountTopayValue=  (<HTMLInputElement>document.getElementById(this.amountTopayId)).value; 
    if((<HTMLInputElement>document.getElementById(this.checkBoxInputId)).checked)
    {
      this.totalAmountToPay -=  Number(this.amountTopayValue);
      this.numberOfCheckedBills--;
      if(this.numberOfCheckedBills ==0 )
      this.buttonDisabled=true;
   
    }
  }

  inquire(element: any) {
    this.amountTopayId = "amountToPay" + element.id;
    this.checkBoxInputId = "checkBox"+ element.id;
    (<HTMLInputElement>document.getElementById(this.amountTopayId)).value = element.amountToPay;
    (<HTMLInputElement>document.getElementById(this.checkBoxInputId)).removeAttribute('disabled');
  }

  changeStatus(element:any,event: any){ 
   this.checkBoxInputId = "checkBox"+element.id;
   this.amountTopayId = "amountToPay" + element.id;
   (<HTMLInputElement>document.getElementById(this.amountTopayId)).value = element.amountToPay;
   if (event.target.checked){
    this.totalAmountToPay+=element.amountToPay; 
    this.numberOfCheckedBills++;
    this.buttonDisabled=false;
   }
   else{
    this.totalAmountToPay-=element.amountToPay;
    this.numberOfCheckedBills--;
    if(this.numberOfCheckedBills ==0 )
      this.buttonDisabled=true;
   }
  }
  
  payButtonClick(){
    if(confirm("redirect to payment method page ")) {
    }
  }
}

