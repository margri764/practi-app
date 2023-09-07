import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-ask-order',
  templateUrl: './ask-order.component.html',
  styleUrls: ['./ask-order.component.scss']
})
export class AskOrderComponent implements OnInit {
  confirm : boolean = false;

  
    constructor(
                 private dialogRef: MatDialogRef<AskOrderComponent>,
                 private orderService : OrdersService
    ) { }

    ngOnInit(): void {
    }
    
  
  closeComponent(){
    setTimeout(()=>{ 
      this.dialogRef.close();
    },100)
  }
  
  continue(){
    this.confirm = true; // es para clase en el button
    setTimeout(()=>{ 
            this.dialogRef.close();
            this.orderService.cancelOrNextDialog.emit(true);
    },100)
  }
  

  }
  