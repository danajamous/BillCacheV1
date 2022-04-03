import { Component } from '@angular/core';


@Component({
  selector: 'app-saved-bills',
  templateUrl: './saved-bills.component.html',
  styleUrls: ['./saved-bills.component.css']
})


export class SavedBillsComponent {
  amountTopayId: string = "";
  checkBoxInputId: string = "";
  totalAmountToPay: number = 0;
  totalAmountToPayDisplay: string = "$0.00";
  data: Array<any>;
  buttonDisabled: boolean = true;
  numberOfCheckedBills: number = 0;
  displayedColumns: string[] = ['id', 'billerName', 'serviceName', 'billingNumber', 'amountToPay', 'inquire'];


  
  constructor() {
    this.data = [
      { id: 1, billerName: 'T-Mobile', serviceName: "Prepaid", billingNumber: "202345555", amountToPay: 5.50 },
      { id: 2, billerName: 'George Mason University ', serviceName: "Student Balance", billingNumber: "G-3788", amountToPay: 5000 },
      { id: 3, billerName: 'Dominion Energy', serviceName: "Energy Bill", billingNumber: "7107 Alexandria", amountToPay: 220 },
    ]
  }

  formatDollarValue(n: number): string {
    return `$${(Math.round(n * 100) / 100).toFixed(2)}`;
  }


  deleteRow(element: any) {
    for (let i = 0; i < this.data.length; ++i) {
      if (this.data[i].id === element.id) {
        this.data.splice(i, 1);
      }
    }
    this.checkBoxInputId = "checkBox" + element.id;
    if((<HTMLInputElement>document.getElementById(this.checkBoxInputId)).checked)
    {
      this.totalAmountToPay -= element.amountToPay;
      this.numberOfCheckedBills--;
      if (this.numberOfCheckedBills == 0)
        this.buttonDisabled = true;
    }
    this.totalAmountToPayDisplay = this.formatDollarValue(this.totalAmountToPay);
  }

  inquire(element: any) {
    this.amountTopayId = "amountToPay" + element.id;
    this.checkBoxInputId = "checkBox" + element.id;
    (<HTMLLabelElement>document.getElementById(this.amountTopayId)).textContent = this.formatDollarValue(element.amountToPay);
    (<HTMLInputElement>document.getElementById(this.checkBoxInputId)).removeAttribute('disabled');
  }

  toggleCheckbox(element: any, event: any) { 
    if (event.target.checked) {
     this.totalAmountToPay += element.amountToPay; 
     this.numberOfCheckedBills++;
     this.buttonDisabled = false;
    }
    else {
     this.totalAmountToPay -= element.amountToPay;
     this.numberOfCheckedBills--;
     if (this.numberOfCheckedBills == 0)
       this.buttonDisabled = true;
    }
    this.totalAmountToPayDisplay = this.formatDollarValue(this.totalAmountToPay);
   }
  
  payButtonClick(){
    if(confirm("redirect to payment method page ")) {
    }
  }
}

