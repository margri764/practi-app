import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import * as authActions from 'src/app/auth.actions'
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { MatTableDataSource } from '@angular/material/table';
import { saveDataSS } from 'src/app/protected/Storage';


@Component({
  selector: 'app-pick-client-message',
  templateUrl: './pick-client-message.component.html',
  styleUrls: ['./pick-client-message.component.scss']
})
export class PickClientMessageComponent implements OnInit {
  
  // start search
@Output() onDebounce: EventEmitter<string> = new EventEmitter();
@Output() onEnter   : EventEmitter<string> = new EventEmitter();
debouncer: Subject<string> = new Subject();

itemSearch : string = '';
mostrarSugerencias: boolean = false;
sugested : string= "";
suggested : any[] = [];
spinner : boolean = false;
fade : boolean = false;
search : boolean = true;
product  : any[] = [];
// end search

displayedColumns: string[] = ['action','name','location','province','phone', 'email'];
dataTableActive : any = new MatTableDataSource<any>();

contactos : any []=[];
isLoading : boolean = false;
arrClient : any []=[];
clientFounded : any = {};
isClientFounded : boolean = false;
labelNoFinded : boolean = false;
phone : boolean = false;
noMatches : boolean = false;


  constructor(
              private authService : AuthService,
              private store : Store <AppState>,
              private dialogRef: MatDialogRef<PickClientMessageComponent>,
              private router : Router,
              private errorService : ErrorService


  ) { 

  }

  onInput(event: any): void {
    this.debouncer.next(event.target.value);
  }




  ngOnInit(): void {

    this.debouncer
    .pipe(debounceTime(700))
    .subscribe( valor => {
      this.onDebounce.emit( valor );
      this.sugerencias(valor);
      this.noMatches = false;
    });

    this.errorService.close$.subscribe((emited)=>{if(emited)this.dialogRef.close()})

    this.spinner = true;


  }

  selectClient(client :any){
    this.store.dispatch(authActions.setTempClient({client}));
    setTimeout(()=>{
      this.dialogRef.close();
      saveDataSS('tempClient', client);
      this.router.navigateByUrl('/armar-pedido')
    },100)
  }

   // search
   close(){
    this.mostrarSugerencias = false;
    this.itemSearch = '';
    this.suggested = [];
    this.spinner= false;
    this.isClientFounded = false;
  }


   sugerencias(value : string){

      this.spinner = true;
      this.itemSearch = value;
      this.mostrarSugerencias = true;  
      const valueSearch = value.toUpperCase();
      this.authService.searchClientByName(valueSearch)
      .subscribe ( ({contactos} )=>{
        if(contactos.length !== 0){
          this.suggested = contactos.splice(0,10);
          console.log(this.suggested);
            this.spinner = false;
          }else{
            this.spinner = false;
            this.mostrarSugerencias = false
            this.noMatches = true;
          }
        }
      )
    
    }
 
  
Search( id : any ){

  if(id === ''){
    return
  }else{
    this.mostrarSugerencias = true;
    this.spinner = true;
    this.fade = false;
    this.authService.getClientById(id)
    .subscribe ( ({contacto} )=>{
      console.log(contacto);
      if(contacto){
        this.store.dispatch(authActions.setTempClient({client: contacto}))
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
}

  searchSuggested( id: any ) {
    this.Search( id );
  }
  // search

 
}
