import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { OrderService } from 'src/app/protected/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked{

@Input() url : string =''
@Input() logeado : boolean = false;

  // accordion
  panelOpenState = false;
  showLabelTempOrder : boolean = false;
  articleSuscription!: Subscription;
  userSubscription!: Subscription;
  alert! : any;
  toogle : boolean = false;
  @ViewChild(MatAccordion)  accordion!: MatAccordion;
  hidden : boolean = false;
  login : boolean = false;
  // accordion
    
 labelHeader : string = '';
 path : string = '/home';
 user: any | undefined;

  constructor(
               private store : Store <AppState>,
               private errorService : ErrorService,
               private cdRef: ChangeDetectorRef,
               private router : Router,
               private orderService : OrderService
              //  private authService : AuthService,
              // private dialog : MatDialog,
              // private cookieService : CookieService
  ) { 
        
          
  }

  ngAfterViewChecked() {
    this.updateLabelHeader(this.url);
    this.login = this.logeado;
    // console.log(this.logeado);
    this.cdRef.detectChanges();
  }


  ngOnInit(): void {


   this.store.select('article')
  .pipe(
    // filter( ({tempOrder})=>  tempOrder.length !== 0 ),

  ).subscribe(({tempOrder})=>{
      if(tempOrder.length !== 0){
        this.showLabelTempOrder = true;
        this.alert = tempOrder.length;
      }else{
        this.alert = ''
      }
   
  })

 this.store.select('auth')
  .pipe(
    filter( ({user})=>  user != null && user != undefined),
  ).subscribe(
    ({user})=>{
      this.user = user;
      this.login = true;
    })


    
 }

 updateLabelHeader( url : string){

  switch (url) {
    case '/listado-pedidos':
          this.labelHeader = "Pedidos";
      break;
    case '/listado-articulos':
            this.labelHeader = "Artículos";
    break;  

    case '/pedidos-temporales':
         this.labelHeader = "Pedidos abiertos";
    break;  

    case '/listado-clientes':
         this.labelHeader = "Clientes";
    break;  

    case '/listado-precios':
         this.labelHeader = "Listas Precios";
    break;  

    case '/listado-precios/listado':
            this.labelHeader = "Precios";
            this.path = '/listado-precios'
    break;  
 
    case '/buscar-articulos':
          this.labelHeader = "Buscar";
          this.path = '/buscar-articulos';
     
    break;  

    case '/armar-pedido':
          this.labelHeader = "Pedido";
    break; 

    case '/armar-pedido/':
      this.labelHeader = "Lista Precios";
     break; 

     case '/configuraciones':
      this.labelHeader = "Configuraciones";
     break; 
  
    default:  this.labelHeader = "";
    break;
  }

  this.path = url;

 }

 navigate(){

        switch (this.path) {
          case '/listado-precios/listado':  
                 this.router.navigateByUrl('/listado-precios');
            break;
          case '/buscar-articulos':
              this.router.navigateByUrl('/armar-pedido');
              // quiero la opcion de productos cuando salgo de este path y regreso al crear-pedidos
              this.orderService.selectProductOption$.emit(true);
          break;
                 
          default: this.router.navigateByUrl('/home');
            break;
        }

  //  if(this.path === '/listado-precios/listado'){
  //    this.router.navigateByUrl('/listado-precios')
  //   }else{
  //     this.router.navigateByUrl('/home')
  //   }

 }

 visibility(){
  this.toogle = !this.toogle;
}

logout(){
  this.errorService.logout().subscribe()
}

}
