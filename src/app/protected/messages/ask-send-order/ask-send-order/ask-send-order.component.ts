import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/protected/services/order/order.service';

@Component({
  selector: 'app-ask-send-order',
  templateUrl: './ask-send-order.component.html',
  styleUrls: ['./ask-send-order.component.scss']
})
export class AskSendOrderComponent implements OnInit {

  confirm : boolean = false;

  constructor(
              private dialogRef: MatDialogRef<AskSendOrderComponent>,
              private orderService : OrderService
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
this.orderService.cancelOrNextSendOrder$.emit(true);
this.dialogRef.close();

},100)
}


}
