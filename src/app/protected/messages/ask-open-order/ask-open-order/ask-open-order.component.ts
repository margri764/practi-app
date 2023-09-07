import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/protected/services/order/order.service';

@Component({
  selector: 'app-ask-open-order',
  templateUrl: './ask-open-order.component.html',
  styleUrls: ['./ask-open-order.component.scss']
})
export class AskOpenOrderComponent implements OnInit {

  confirm : boolean = false;

  
  constructor(
               private dialogRef: MatDialogRef<AskOpenOrderComponent>,
               private orderService : OrderService
  ) { }

  ngOnInit(): void {
  }
  

closeComponent(){
  setTimeout(()=>{ 
    this.dialogRef.close();
    this.orderService.cancelOrNextOpenOrder$.emit(true);
  },100)
}

continue(){
  this.confirm = true; // es para clase en el button
  setTimeout(()=>{ 
          this.dialogRef.close();
         
  },100)
}


}
