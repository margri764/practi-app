import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
export class ListOrdersComponent implements OnInit {



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

    // table
    displayedColumns: string[] = ['id','socialName','items'];
    dataTableActive : any = new MatTableDataSource<any>();

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
    send :  boolean = false;
    order : any;
    salePoint : any [] =[]

    showOrderFounded : boolean = false;


  constructor(
              private fb : FormBuilder,
              private articleService : ArticlesService,
              private dialog : MatDialog,
              private orderService : OrderService,
              private errorService : ErrorService              
              
  ) { 
    (screen.width <= 800) ? this.phone = true : this.phone = false;

  }

  ngOnInit(): void {

    this.getSalePoint();
    

    this.errorService.closeIsLoading$.subscribe((emitted)=>{if(emitted){this.isLoading = false}})
   
    // despues de editar el pedido blaqueo todo ()
      // this.articleService.initialStateAfterEditOrder$.subscribe((emitted)=>{
      //     if(emitted){
      //           this.arrOrders = [];
      //           this.myForm.reset();
      //           this.myForm2.reset();
      //           this.showOrderFounded = false;
      //           this.order = {};
      //           this.isLoading = false;
      //   }});

      // this.myForm = this.fb.group({
      //   ptoVenta1:  [ ''],
      // });   

      this.myForm = this.fb.group({
        ptoVenta:  [ '' ],
        nroOrder:  [ '' ],
      });   
  }

  // getInitialOrders(){
  //   this.isLoading = true;
  //   this.showOrderFounded = false;
  //   this.arrOrders = [];
  //   // this.dataTableActive = this.articleService.getOrdersPaginator(this.pageIndex, this.pageSize,)

  //   this.orderService.getOrdersPaginator(this.pageIndex, this.pageSize).subscribe(
  //     ({Pedidos})=>{
  //       this.arrOrders = Pedidos;
  //       this.isLoading = false;
  //       this.myForm.reset();
  //       this.myForm2.reset();
  //     })
  // }

  getSalePoint(){

    this.orderService.getSalePoint().subscribe(
      ({pos})=>{
          if(pos.length !== 0){
              this.salePoint = pos
          }
      })

  }

  // selectSalePoint(){

  //   if ( this.myForm.invalid ) {
  //     this.myForm.markAllAsTouched();
  //     return;
  //   }
  //     this.isLoading = true;
  //     this.arrOrders = [];
  //     this.showOrderFounded = false;

  //     let ptoVenta = this.myForm.get('ptoVenta')?.value;
  //     let ptoVentaNumber = parseFloat(ptoVenta);



  //     this.orderService.getOrdersByPtoVenta(ptoVentaNumber, this.pageIndex, this.pageSize).subscribe(
  //       ({pedidos, pagination})=>{
  //         if(pedidos.length !== 0){
  //           this.arrOrders = pedidos;
  //           this.isLoading = false;
  //           this.length = pagination.total_reg;
  //           // this.myForm.reset();
  //         }
  //       })
  //  }

  //  getSalePointByNumOrder(){

  //   if ( this.myForm2.invalid ) {
  //     this.myForm2.markAllAsTouched();
  //     return;
  //   }
  //   this.showOrderFounded = false;
  //   this.isLoading = true;
  //   this.arrOrders = [];
  //   const ptoVenta2 = this.myForm2.get('ptoVenta2')?.value;
  //   const nroOrder = this.myForm2.get('nroOrder')?.value;

  //   this.orderService.getSalePointByNumOrder(ptoVenta2, nroOrder).subscribe(
  //     ({Pedido})=>{
  //       if(Pedido){
  //         this.isLoading = false;
  //         this.order = Pedido;
  //         this.myForm2.reset();
  //         this.showOrderFounded = true;
  //       }
  //     })

  //  }
error : string = '';
   searchOrder(){
    
    this.error = '';
    const ptoVenta = this.myForm.get('ptoVenta')?.value;
    const nroOrder = this.myForm.get('nroOrder')?.value;

    if(ptoVenta == '' && nroOrder == ''){
      this.error = "Sebes seleccionar pto de venta y/o n° de pedido"
      // alert('debes seleccionar pto de venta y/o n° de pedido')
      return
    }

    if(ptoVenta == '' && nroOrder !== ''){
      this.error = "Primero debes seleccionar pto de venta"
      return
    }

    // solo eligio las ordenes por punto de venta
    if(ptoVenta !== '' && nroOrder == ''){

      this.isLoading = true;
      this.arrOrders = [];
      this.showOrderFounded = false;

   
      this.orderService.getOrdersByPtoVenta(ptoVenta, this.pageIndex, this.pageSize).subscribe(
        ({pedidos, pagination})=>{
          if(pedidos.length !== 0){
            this.arrOrders = pedidos;
            this.isLoading = false;
            this.length = pagination.total_reg;
            // this.myForm.reset();
          }
        })
   }else if( ptoVenta !== '' && nroOrder !== '' ){

    this.showOrderFounded = false;
    this.isLoading = true;
    this.arrOrders = [];
    this.orderService.getSalePointByNumOrder(ptoVenta, nroOrder).subscribe(
      ({Pedido})=>{
        if(Pedido){
          this.isLoading = false;
          this.order = Pedido;
          this.showOrderFounded = true;
        }
      })

   }
  }
 

  // loadOrders() {
  //   this.isLoading= true;
  //   this.orderService.getOrdersPaginator(this.pageIndex, this.pageSize,).subscribe(
  //     ({pedidos, pagination})=>{
  //           this.arrOrders = pedidos;
  //           this.isLoading = false;
  //           this.length = pagination.total_reg;
  //   })
  // }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  
      this.isLoading= true;

      const ptoVenta = this.myForm.get('ptoVenta')?.value;
      let ptoVentaNumber = parseFloat(ptoVenta);

      
      this.orderService.getOrdersByPtoVenta(ptoVentaNumber, this.pageIndex, this.pageSize,).subscribe(
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

  deleteOrder(order:any){

  }

  sendOrder(order :any){

      const ptoVenta = order.ptoVenta;
      const cbteNro = order.cbteNro;
      const state = "E"
      this.isLoading = true;
      this.orderService.updateOrderState(ptoVenta, cbteNro, state).subscribe(
        (res)=>{
          if(res.message){
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
      width = "600px";
      height = "510px";
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
    return detalleItems.reduce((total, item) => total + item.importeNetoTotal, 0);
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
    console.log('ff');
      this.showOrderFounded = false; 
      this.arrOrders = [];
      this.myForm.get('ptoVenta')?.setValue('');
      this.myForm.get('nroOrder')?.setValue('');
      this.error = '';
  }
}
