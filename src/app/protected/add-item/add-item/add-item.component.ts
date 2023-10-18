import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Articulo } from 'src/app/protected/interfaces/articulo.interface';
import { DetalleItem } from 'src/app/protected/interfaces/order.interface';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import * as articleAction from 'src/app/article.actions'
import { GenericSuccessComponent } from 'src/app/protected/messages/generic-success/generic-success/generic-success.component';
import { SelectArticleMessageComponent } from 'src/app/protected/messages/select-article-message/select-article-message/select-article-message.component';
import { Router } from '@angular/router';
import { getDataLS, getDataSS, saveDataLS } from 'src/app/protected/Storage';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ErrorService } from '../../services/error/error.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  
  @Input() item : any;
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  
  authSuscription! : Subscription;
  articleSuscription! : Subscription;
  arrArticles : Articulo []=[];
  arrItemSelected : DetalleItem []=[];
  
  labelNoArticles : boolean = false;
  isLoading : boolean = false;
  isArticleFounded : boolean = false;
  articleFounded : any = {};

  // search by description
  itemSearch : string = '';
  mostrarSugerencias: boolean = false;
  sugested : string= "";
  suggested : any[] = [];
  spinner : boolean = false;
  alert:boolean = false;
  search : boolean = true;
  product  : any[] = [];
  // search

  noMatch : boolean = false;
  defaultValue : string = 'Por descripción';
  idListaPrecios : any;
  onSubmitController : boolean= false;




  myForm! : FormGroup;
  searchOptions : string [] = ["Por descripción", "Por código"]

  constructor(
            private articleService :ArticlesService,
            private dialog : MatDialog,
            private store : Store <AppState>,
            private orderService : OrderService,
            private router : Router,
            private localStorageService: LocalStorageService,
            private fb : FormBuilder,
            private authService : AuthService,
            private errorService : ErrorService


  ) {

    this.myForm = this.fb.group({
      itemSearch:  [ '',  ],
    });   
   }


  ngOnInit(): void {



    console.log(this.item);

    this.errorService.labelInvalidCode$.subscribe((emmited)=>{if(emmited){this.noMatch = true}})

    this.errorService.closeIsLoading$.subscribe((emitted)=>{if(emitted){this.isLoading = false}})

    // obtengo el idListaPrecios del cliente del pedido
    const idListaPrecios = getDataSS('tempClient');
    if(idListaPrecios !== null || idListaPrecios !== undefined){
      this.idListaPrecios = idListaPrecios;
    }

    //para las busquedas
      this.myForm.get('itemSearch')?.valueChanges.subscribe(newValue => {
        this.itemSearch = newValue;
  
        if(this.itemSearch !== null){
  
          this.teclaPresionada();
        }
      });

    this.debouncer
    .pipe(debounceTime(400))
    .subscribe( valor => {
 
      this.sugerencias(valor);
    });

    this.articleSuscription = this.store.select('article')
    .pipe(

    ).subscribe(({arrSelectedArticles})=>{
      if(arrSelectedArticles.length !== 0){
        this.arrItemSelected = arrSelectedArticles;
      }
    })
  }

  onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Obtén el valor del campo de entrada y ejecuta la búsqueda
      const inputValue = this.myForm.get('itemSearch')?.value;
      this.onSubmitController = true;
      this.sugerencias(inputValue);
    }
  }

  
  ngOnDestroy() {
    // Aquí cancela tus suscripciones
    if (this.authSuscription) {
      this.authSuscription.unsubscribe();
    }
    if (this.articleSuscription) {
      this.articleSuscription.unsubscribe();
    }
  }

  close(){
        this.mostrarSugerencias = false;
        this.itemSearch = '';
        this.suggested = [];
        this.spinner= false;
  }
    
  teclaPresionada(){
      this.noMatch = false;
      this.debouncer.next( this.itemSearch );  
  };
    
  sugerencias(value : string){

    
    if(value.length < 3 && !this.onSubmitController){
      return
    }
    this.itemSearch = value;
    this.mostrarSugerencias = true; 
    this.spinner = true;
          this.articleService.getArtListPriceByDesc(this.item.idListaPrecios,  this.itemSearch)
          .subscribe ( ({precios} )=>{
            console.log(precios);
            if(precios.length !== 0){
              this.suggested = precios;
                this.spinner = false;
                this.onSubmitController = false;
                }else{
                this.spinner = false;
                this.mostrarSugerencias = false
                this.noMatch = true;
                this.onSubmitController = false;

              }
            }
          )
      
  }
         
  searchSuggested( item: any ) {
  this.orderService.emitedItem$.emit(item);
  this.articleFounded = item;
  this.spinner = false;
  this.isArticleFounded = true;
  this.mostrarSugerencias = false;
  this.itemSearch = '';
  this.suggested = [];
 
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

  openDialogArticle(article : any){
    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "400px";
      height ="450px";
    }

    this.dialog.open(SelectArticleMessageComponent, {
      data: article,
      width: `${width}`|| "",
      height:`${height}`|| "",
      // disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }
}
