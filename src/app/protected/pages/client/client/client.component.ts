import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { EditClientComponent } from '../../edit-client/edit-client/edit-client.component';
import { NewClientComponent } from '../../new-client/new-client/new-client.component';
import { Subject, Subscription, debounceTime, take } from 'rxjs';
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { AskDelClientComponent } from 'src/app/protected/messages/ask-del-client/ask-del-client/ask-del-client.component';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { MatAccordion } from '@angular/material/expansion';
import { getDataLS, getDataSS } from 'src/app/protected/Storage';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  @HostListener('window:scroll') onScroll(e: Event): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const contentHeight = document.body.offsetHeight;
    if(this.phone){
       if (scrollPosition >= contentHeight - 100 && !this.isLoading) {
         this.loadInfiniteScroll();
       }
    }
 }

// start search
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

  displayedColumns: string[] = ['action','name','address','phone', 'email'];
  dataTableActive : any = new MatTableDataSource<any>();
  myForm! : FormGroup;
  noMatches : boolean = false;

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
  @ViewChild(MatAccordion)  accordion!: MatAccordion;
  panelOpenState = false;
  showLabelTempOrder : boolean = false;
  articleSuscription!: Subscription;
  alert : string = '';
  toogle : boolean = false;
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
              private cookieService : CookieService,
              private fb : FormBuilder,


  ) { 
        
  // if(getDataSS("logged") === true || getDataLS("logged") == true){
  //   this.cookieService.get('token');
  //   this.login = true;
  // }
    (screen.width <= 800) ? this.phone = true : this.phone = false;

    this.myForm = this.fb.group({
      itemSearch:  [ '',  ],
    });   
  }


  ngOnInit(): void {
    this.errorService.closeIsLoading$.subscribe( (emmited)=>{ this.isLoading = false});
    this.authService.updateEditingUser$.subscribe( (emmited)=>{ if(emmited){this.isLoading = true; this.getInitialClients()} })
    this.getInitialClients();

        //para las busquedas
        this.myForm.get('itemSearch')?.valueChanges.subscribe(newValue => {
          this.itemSearch = newValue;
    
           console.log(this.myForm.get('itemSearch')?.value);
          if(this.itemSearch !== ''){
             this.teclaPresionada();
          }
        });
    
        this.debouncer
        .pipe(debounceTime(400))
        .subscribe( valor => {
    
          this.sugerencias(valor);
        });
  }

 getInitialClients(){
  this.isLoading = true;

  this.authService.getClientsPaginator(this.pageIndex, this.pageSize).subscribe(
    ({contactos, pagination})=>{
      this.contactos = contactos;
      this.dataTableActive = contactos;
      this.isLoading = false;
      this.length = pagination.total_reg;
    })
}


loadInfiniteScroll(){
  this.pageIndex++;
  this.authService.getClientsPaginator(this.pageIndex, this.pageSize).subscribe(
    ({contactos, pagination})=>{
      this.contactos = [...this.contactos, ...contactos];
      this.dataTableActive = contactos;
      this.isLoading = false;
      this.length = pagination.total_reg;
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
  this.myForm.get('itemSearch')?.setValue('');
  this.noMatches = false;
}


teclaPresionada(){
  this.noMatches = false;
  this.debouncer.next( this.itemSearch );  
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
          this.spinner = false;
          this.noMatches = true;
          this.myForm.get('itemSearch')?.setValue('');
        }
      }
    )
}
  
Search( item: any ){
    this.mostrarSugerencias = true;
    this.spinner = false;
    this.fade = false;
    console.log(item);
    this.clientFounded = item;
    this.close();
    this.isClientFounded = true;
}
  // search



ngOnDestroy(): void {
  if (this.articleSuscription) {
    this.articleSuscription.unsubscribe();
  }
}


}
