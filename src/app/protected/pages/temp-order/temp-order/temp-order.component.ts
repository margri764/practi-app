import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import * as articleAction from 'src/app/article.actions'
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { MatDialog } from '@angular/material/dialog';
import { AskTempOrderComponent } from 'src/app/protected/messages/ask-temp-order/ask-temp-order/ask-temp-order.component';
import { EditOrderComponent } from 'src/app/protected/messages/edit-order/edit-order/edit-order.component';
import { Order } from 'src/app/protected/interfaces/order.interface';
import { GenericMessageComponent } from 'src/app/protected/messages/generic-message/generic-message/generic-message.component';
import { WrongActionMessageComponent } from 'src/app/protected/messages/wrong-action-message/wrong-action-message/wrong-action-message.component';
import { GenericSuccessComponent } from 'src/app/protected/messages/generic-success/generic-success/generic-success.component';
import { AskSendOrderComponent } from 'src/app/protected/messages/ask-send-order/ask-send-order/ask-send-order.component';

@Component({
  selector: 'app-temp-order',
  templateUrl: './temp-order.component.html',
  styleUrls: ['./temp-order.component.scss']
})
export class TempOrderComponent implements OnInit {

  authSuscription! : Subscription;
  articleSuscription! : Subscription;
  tempOrder : any []=[];
  confirmed : boolean = false;
  isLoading : boolean = false;

  constructor(
                private dialog : MatDialog,
                private store : Store <AppState>,
                private localStorageService: LocalStorageService,
                private errorService: ErrorService,
                private orderService : OrderService
  ) { }

  ngOnInit(): void {

    this.errorService.close$.subscribe( ()=>{});
    this.errorService.closeIsLoading$.subscribe((emitted)=>{if(emitted){this.isLoading = false;}})

    this.articleSuscription = this.store.select('article')
    .pipe(

    ).subscribe(({tempOrder})=>{
      this.tempOrder = tempOrder;
    })
  }

  deleteOrder(order:any){

    let width : string = '';
    let height : string = '';
  
    if(screen.width >= 800) {
      width = "400px"
      height ="550px";
    }

    const ptoVenta = order.ptoVenta;
    const cbteNro = order.cbteNro;
    const state = "C"

    this.dialog.open(AskTempOrderComponent, {
      panelClass:"custom-modalbox-NoMoreComponent",
      width: `${width}`|| "",
      height:`${height}`|| "",
    });

    this.errorService.authDelTempOrder$.pipe(
      take(1)
    ).subscribe( (auth)=> { // el ask-edit dispara ui boolean si se elige CONTINUAR con la acción
      
      if(auth){

        this.orderService.updateOrderState(ptoVenta, cbteNro, state).subscribe(
          (res)=>{
            if(res.message){
              this.orderService.getOpenOrders().subscribe();
              this.openGenericSuccess('Pedido eliminado con éxito!!');
              
              this.errorService.closeIsLoading$.emit(true)
            }
          }
        )
       
      }
    })
  }

  editOrder( order : any){

    const ptoVenta = order.ptoVenta;
    const cbteNro = order.cbteNro;
    this.isLoading = true
    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "900px"
      height ="700px";
    }

    // obtengo primero la orden completa antes de editarla

    this.orderService.getSalePointByNumOrder(ptoVenta, cbteNro ).subscribe(
      ({Pedido})=>{
                if(Pedido){
                  this.dialog.open(EditOrderComponent, {
                  data: Pedido,
                  width: `${width}`|| "",
                  height:`${height}`|| "",
                  disableClose : true,
                  panelClass:"custom-modalbox-edit", 
                });
              }
              this.isLoading = true
    });


  }


  sendOrder(order :any){

    this.openDialogSendOrder();

    this.orderService.cancelOrNextSendOrder$.subscribe(
      (emitted)=>{

        if(emitted){
          
            const ptoVenta = order.ptoVenta;
            const cbteNro = order.cbteNro;
            const state = "E"
            this.isLoading = true;
            console.log('');

            this.orderService.updateOrderState(ptoVenta, cbteNro, state).subscribe(
              (res)=>{
                if(res.message){
                  this.orderService.getOpenOrders().subscribe();
                  this.openGenericSuccess('Pedido enviado con éxito!!');
                  this.isLoading = false;

                  this.errorService.closeIsLoading$.emit(true)
                              }
                    }
            )}
      })
   
  }

  openDialogSendOrder(){

    let width : string = '';
    let height : string = '';
  
    if(screen.width >= 800) {
      width = "400px"
      height ="450px";
    }
  
    this.dialog.open(AskSendOrderComponent, {
      width: `${width}`|| "",
      height:`${height}`|| "",
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }


  openGenericSuccess(msg : string){

    let width : string = '';
    let height : string = '';
  
    if(screen.width >= 800) {
      width = "400px"
      height ="450px";
    }
  
    this.dialog.open(GenericSuccessComponent, {
      data: msg,
      width: `${width}`|| "",
      height:`${height}`|| "",
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }
  
openGenericMsgAlert(msg : string){
  this.dialog.open(WrongActionMessageComponent, {
    data: msg,
    // disableClose: true,
    panelClass:"custom-modalbox-NoMoreComponent", 
  });

}

}
