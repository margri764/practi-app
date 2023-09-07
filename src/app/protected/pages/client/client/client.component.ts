import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { EditClientComponent } from '../../edit-client/edit-client/edit-client.component';
import { NewClientComponent } from '../../new-client/new-client/new-client.component';
import { Subject, Subscription, take } from 'rxjs';
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { AskDelClientComponent } from 'src/app/protected/messages/ask-del-client/ask-del-client/ask-del-client.component';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { MatAccordion } from '@angular/material/expansion';
import { getDataLS, getDataSS } from 'src/app/protected/Storage';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  
// start search
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

  displayedColumns: string[] = ['action','name','location','province','phone', 'email'];
  dataTableActive : any = new MatTableDataSource<any>();
  

  itemSearch : string = '';
  mostrarSugerencias: boolean = false;
  sugested : string= "";
  suggested : any[] = [];
  spinner : boolean = false;
  fade : boolean = false;
  search : boolean = true;
  product  : any[] = [];
// end search

  contactos : any []=[];
  isLoading : boolean = false;
  arrClient : any []=[];
  clientFounded : any = {};
  isClientFounded : boolean = false;
  labelNoFinded : boolean = false;
  phone : boolean = false;

  // paginator
  length = 50;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;
  // paginator

  // accordion
  panelOpenState = false;
  showLabelTempOrder : boolean = false;
  articleSuscription!: Subscription;
  alert : string = '';
  toogle : boolean = false;
  @ViewChild(MatAccordion)  accordion!: MatAccordion;
  hidden : boolean = false;
  login : boolean = false;
  // accordion

  height : string = '';
  width : string = '';

  constructor(
              private authService : AuthService,
              private dialog : MatDialog,
              private errorService : ErrorService,
              private store : Store <AppState>,
              private cookieService : CookieService

  ) { 
        
  // if(getDataSS("logged") === true || getDataLS("logged") == true){
  //   this.cookieService.get('token');
  //   this.login = true;
  // }
    (screen.width <= 800) ? this.phone = true : this.phone = false;
  }


  ngOnInit(): void {
    this.getInitialClients();
  }

 getInitialClients(){
  this.isLoading = true;
  this.authService.getClientsPaginator(this.pageIndex, this.pageSize).subscribe(
    ({contactos})=>{
      this.contactos = contactos;
      this.dataTableActive = contactos;
      this.isLoading = false
    })
}

handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.length = e.length;
  this.pageSize = e.pageSize;
  this.pageIndex = e.pageIndex;

  console.log(this.pageEvent,
    this.length,
    this.pageSize, 
    this.pageIndex);
    this.isLoading= true;
    this.authService.getClientsPaginator(this.pageIndex, this.pageSize,).subscribe(
      ({contactos})=>{
        this.contactos = contactos;
        this.dataTableActive = contactos;
        this.isLoading = false
      })
}



  deleteClient(client : any){

    if(screen.width >= 800) {
      this.width = "600px";
      this.height = "510px";
    }

      this.dialog.open(AskDelClientComponent, {
        data:  client.archivarComo,
        width: `${this.width}`|| "",
        height:`${this.height}`|| "",
        panelClass:"custom-modalbox-edit",
      });
  
      this.errorService.authDelClient$.pipe(
        take(1)
      ).subscribe( (auth)=> { // el ask-edit dispara ui boolean si se elige CONTINUAR con la acción
        
        if(auth){
          this.authService.deleteClientById(client.id).subscribe( 
            ()=>{})
        }
      })
   
  }

  editClient(client: any){

    if(screen.width >= 800) {
      this.width = "600px";
      this.height ="720px";
    }

    this.dialog.open(EditClientComponent, {
      data: client,
      width: `${this.width}`|| "",
      height:`${this.height}`|| "",
      panelClass:"custom-modalbox-NoMoreComponent", 
    });

  }

  addClient(){

    if(screen.width >= 800) {
      this.width = "600px";
      this.height ="770px";
    }

    this.dialog.open(NewClientComponent, {
      width: `${this.width}`|| "",
      height:`${this.height}`|| "",
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  }

   // search
   close(){
    this.mostrarSugerencias = false;
    this.itemSearch = '';
    this.suggested = [];
    this.spinner= false;
    this.isClientFounded = false;
    // this.clientFounded = {};
  }

  teclaPresionada(){

    console.log(this.mostrarSugerencias);
     
     this.debouncer.next( this.itemSearch );  
     this.sugerencias(this.itemSearch)
     if(this.itemSearch == ''){
       this.suggested=[];
       this.mostrarSugerencias = false  
     }
     if(this.suggested.length === 0) {
       this.spinner= true;
     }
 
   };

   sugerencias(value : string){
      this.spinner = true;
      this.itemSearch = value;
      this.mostrarSugerencias = true;  
      const valueSearch = value.toUpperCase();
      this.authService.searchClientByName(valueSearch)
      .subscribe ( ({contactos} )=>{
        if(contactos.length !== 0){
          // this.arrArticlesSugested = articulos;
          this.suggested = contactos.splice(0,10);
          console.log(this.suggested);
            this.spinner = false;
          }else{
            // this.labelNoArticles = true;
          }
        }
      )
    }
 
  buscar(){
   this.onEnter.emit( this.itemSearch );
 
  }

  
Search( id : any ){
    this.mostrarSugerencias = true;
    this.spinner = true;
    this.fade = false;
    this.authService.getClientById(id)
    .subscribe ( ({contacto} )=>{
      console.log(contacto);
      if(contacto){
        this.clientFounded = contacto;
        this.spinner = false;
        this.close();
        this.isClientFounded = true;
      }else{
        // this.labelNoArticles = true;
      }
    }
    )

}

  searchSuggested( id: any ) {
    this.Search( id );
  }
  // search



ngOnDestroy(): void {
  if (this.articleSuscription) {
    this.articleSuscription.unsubscribe();
  }
}


}
