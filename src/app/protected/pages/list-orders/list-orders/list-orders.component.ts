import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { getDataLS } from 'src/app/protected/Storage';
import { Pedido } from 'src/app/protected/interfaces/orders-posted';
import { EditOrderComponent } from 'src/app/protected/messages/edit-order/edit-order/edit-order.component';
import { GenericSuccessComponent } from 'src/app/protected/messages/generic-success/generic-success/generic-success.component';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import { WorkerService } from 'src/app/protected/services/worker/worker.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit, OnDestroy {



  @HostListener('window:scroll') onScroll(e: Event): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const contentHeight = document.body.offsetHeight;
    if (scrollPosition >= contentHeight - 100 && !this.isLoading) {
      // this.loadOrders();
    }
 }

    panelOpenState = false;

    arrOrders : Pedido [] = [];
    isLoading : boolean = false;
    currentPage: number = 1;
    itemsPerPage: number = 10; // Cambia según tus necesidades
    phone : boolean = false;

    authSuscription! : Subscription;

    // table
    displayedColumns: string[] = ['date','client','total'];
    dataTableActive : any = new MatTableDataSource<any>();

    defaultValue : string = 'actual'; 
    nameOptions : any = ['actual', 'antiguo']
    confirm :  boolean = false;
    total : any;

    // paginator
    length = 150;
    pageSize = 10;
    pageIndex = 1;
    pageSizeOptions = [5, 10, 25];
    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;
    pageEvent!: PageEvent;
    // paginator
    
    myForm! : FormGroup;
    myForm2! : FormGroup;
    myFormDate! : FormGroup;
    date : string = '';
    singleDate : boolean = false;
    send :  boolean = false;
    order : any;
    salePoint : any = null;
    showOrderFounded : boolean = false;
    noMatches : boolean = false;
    noMatchDaily : boolean = false;
    msgError : string = 'Sin ordenes';
    showErrorNoSelection : boolean = false;


  constructor(
              private fb : FormBuilder,
              private articleService : ArticlesService,
              private dialog : MatDialog,
              private orderService : OrderService,
              private errorService : ErrorService,
              private store : Store <AppState>,

              
  ) { 
    (screen.width <= 800) ? this.phone = true : this.phone = false;

  }

  ngOnInit(): void {

    this.errorService.closeIsLoading$.subscribe((emitted)=>{if(emitted){this.isLoading = false}});
    this.errorService.loadAllOrders$.subscribe((emitted)=>{if(emitted){this.isLoading = false}});
   
    this.myForm = this.fb.group({
      ptoVenta:  [ '' ],
      nroOrder:  [  , Validators.pattern('^[0-9]*$')],
    });   

    this.myFormDate = this.fb.group({
      date:  [''], 
    });
  
    // obtengo el idLista de precios 
    const salePoint = getDataLS('salePoint');
    if(salePoint !== null || salePoint !== undefined){
      this.salePoint = salePoint;
    }
  this.getDailyOrders();

  }

  
  getDailyOrders( ){

    const formDate = new Date;
    const date = new Date(formDate);
    const year = date.getFullYear(); 
    const month = date.getMonth() + 1; 
    const day = date.getDate(); 

    const formateadDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    this.isLoading = true;
    this.orderService.getDailyOrders(formateadDate).subscribe(
     ({pedidos})=>{
          this.arrOrders = pedidos;
          this.dataTableActive = pedidos;
          this.isLoading = false;
          if(pedidos.length === 0){
            this.noMatchDaily = true;
            this.msgError = 'Sin ordenes diarias..';
            setTimeout(()=>{ this.noMatchDaily = false },2000)
          }else{
            this.getTotalDaily(pedidos);
          }
   })
}
   

   getTotalDaily(order : any){
    if (!order || order.length === 0) {
      return ;
    }
    console.log(order.reduce((total: any, article: any) => total + article.impTotal, 0));
    this.total= order.reduce((total: any, article: any) => total + article.impTotal, 0);

   }

   submitDate(){

    this.noMatches = false;
    this.confirm = true;
    const formDate = (<FormControl>this.myFormDate.controls['date']).value;
    const date = new Date(formDate);
    const year = date.getFullYear(); 
    const month = date.getMonth() + 1; 
    const day = date.getDate(); 

    const formateadDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    if(formDate == '' ){
      return
    }

    this.isLoading = true;
    this.orderService.getDailyOrders(formateadDate).subscribe(
       ({pedidos})=>{
        this.arrOrders = pedidos;
        this.dataTableActive = pedidos;
        this.isLoading = false;
        if(pedidos.length === 0){
          this.noMatches = true;
          this.msgError = 'Sin ordenes para la fecha elegida';
          setTimeout(()=>{ this.noMatches = false },2000)
        }else{
          this.getTotalDaily(pedidos);
        }
        })

  }


   searchOrder(){

    this.showErrorNoSelection = false;
    
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    
    const nroOrder = this.myForm.get('nroOrder')?.value;

    this.showOrderFounded = false;
    this.isLoading = true;
    this.arrOrders = [];
    this.orderService.getSalePointByNumOrder(this.salePoint, nroOrder).subscribe(
      ({Pedido})=>{
        if(Pedido){
          this.isLoading = false;
          this.order = Pedido;
          this.showOrderFounded = true;
        }
      })

   }
 
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.isLoading= true;

    if(this.pageIndex === 0){
      this.isLoading = false;
      return
    }

      
      this.orderService.getOrdersByPtoVenta(this.salePoint, this.pageIndex, this.pageSize,).subscribe(
        ({pedidos, pagination})=>{
          this.arrOrders = pedidos;
          this.isLoading = false
          this.length = pagination.total_reg;

        })
  }
  

  editOrder(order: any){

    console.log(order);
    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "900px"
      height ="500px";
    }

    this.dialog.open(EditOrderComponent, {
      data: order,
      width: `${width}`|| "",
      height:`${height}`|| "",
      panelClass:"custom-modalbox-edit", 
    });

  }


  sendOrder(order :any){

      const ptoVenta = order.ptoVenta;
      const cbteNro = order.cbteNro;
      const state = "E"
      this.isLoading = true;
      this.orderService.updateOrderState(ptoVenta, cbteNro, state).subscribe(
        (res)=>{
          if(res.monthsage){
            this.orderService.getOpenOrders().subscribe();
            this.openGenericSuccess('Pedido enviado con éxito!!');
            this.errorService.closeIsLoading$.emit(true)
          }
        }
      )

  }
  
    
  openGenericSuccess(msg : string){

    let height : string = '';
    let width : string = '';
  
    if(screen.width >= 800) {
      width = "400px";
      height = "450px";
    }

    this.dialog.open(GenericSuccessComponent, {
      data: msg,
      width: `${width}`|| "",
      height:`${height}`|| "",
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }

  calculateTotal(detalleItems: any[]): number {

    return detalleItems.reduce((total, item) => total + item.impTotal, 0);
  }


  styleObject(status : string) : object  {
 
    if(status === "E"){
      return {'color':'green'};
    }
    if(status === "A"){
      return {'color':'red'};
    }
      return {'color':'black'};
  }
  
  close(){
      this.showOrderFounded = false; 
      this.arrOrders = [];
      this.myForm.get('ptoVenta')?.setValue('');
      this.myForm.get('nroOrder')?.setValue('');
  }

  ngOnDestroy(): void {
    if(this.authSuscription){
      this.authSuscription.unsubscribe();
    }
  }

}
