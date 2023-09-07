import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/protected/services/error/error.service';


@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  debouncerCode: Subject<string> = new Subject();
  
  authSuscription! : Subscription;
  articleSuscription! : Subscription;
  arrArticles : Articulo []=[];
  arrItemSelected : DetalleItem []=[];
  
  labelNoArticles : boolean = false;
  isLoading : boolean = false;
  isArticleFounded : boolean = false;
  articleFounded : any = {};
  noMatches : boolean = false;
  myForm! : FormGroup;
  noMatch : boolean = false;
  defaultValue : string = "Por descripción";

  searchOptions : string [] = ["Por descripción", "Por código"]


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

  // search by code
  itemSearchCode : string = '';
  mostrarSugerenciasCode: boolean = false;
  sugestedCode : string= "";
  suggestedCode : any[] = [];
  spinnerCode : boolean = false;
  alertCode:boolean = false;
  searchCode : boolean = true;
  productCode  : any[] = [];
  // search by code

  constructor(
            private articleService :ArticlesService,
            private dialog : MatDialog,
            private store : Store <AppState>,
            private orderService : OrderService,
            private router : Router,
            private localStorageService: LocalStorageService,
            private fb : FormBuilder,
            private errorService : ErrorService


  ) { 

    this.myForm = this.fb.group({
      itemSearch:  [ '',  ],
      searchOption:  [ this.defaultValue ],
    });   
  }

  ngOnDestroy() {
    if (this.authSuscription) {
      this.authSuscription.unsubscribe();
    }
    if (this.articleSuscription) {
      this.articleSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.errorService.labelInvalidCode$.subscribe((emmited)=>{if(emmited){this.noMatch = true;}})

    // despues de seleccionar el articulo con mas opciones como bonificacion, cierro el card de /buscar-pedidos
    this.orderService.selectProductOption$.subscribe((emmited)=>{ if(emmited){this.close()}
    })

    //para las busquedas
    this.myForm.get('itemSearch')?.valueChanges.subscribe(newValue => {
      this.itemSearch = newValue;

      const option = this.myForm.get('searchOption')?.value;
      if(this.itemSearch !== null){

            if( option === "Por descripción"){
                 this.teclaPresionada();
            }else{
              return
            }
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


  fastSelect( article :  any){

    let articlesInLStorage = getDataLS("arrArticles");

    // creo el objeto para guarda en ls y redux, tiene propiedades para mostrar en el front y otras para el BD
    const fastSelect = {
                        descripcionLarga : article.descripcionLarga,
                        precioBrutoFinal: article.precioBrutoFinal,
                        cantidad: 1,
                        codigoInterno : article.codigoInterno,
                        id : article.idArticulo,
                        bonificacionPorciento: 0,
                        ventaTotal: (1 * article.precioBrutoFinal) 
    }

    if(articlesInLStorage == undefined){
      articlesInLStorage = [];
    }

    articlesInLStorage.push(fastSelect);

    //hago el update en redux y LS 
    let updatedArr = [...this.arrItemSelected, fastSelect];
    this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: updatedArr }));
    this.localStorageService.saveStateToSessionStorage(articlesInLStorage, "arrArticles");
    //guardo en el ss los articulos temporalmente, el concat lo uso para q no se sobreescriban los datos
    let tempData = getDataSS("arrArticles");
    updatedArr.concat(tempData);
    this.localStorageService.saveStateToSessionStorage(updatedArr, "arrArticles");
    this.openGenericSuccess('1 Producto añadido con éxito');
    this.close();



  }


  // getProducts(){
  //   this.labelNoArticles= false;
  //   this.isLoading = true;
  //   this.articleService.getAllArticles().subscribe(
  //     ({articulos})=>{
  //       console.log(articulos);
  //       this.isLoading = false;
  //       if(articulos.length !== 0){
  //           this.arrArticles = articulos;
  //       }else{
  //         this.labelNoArticles = true;
  
  //       }
  
  //     }
  //   )
  // }

  close(){
    this.mostrarSugerencias = false;
    this.itemSearch = '';
    this.suggested = [];
    this.spinner= false;
    this.myForm.reset();
    this.isArticleFounded = false;
  }
    
  teclaPresionada(){
    this.noMatches = false;
      this.debouncer.next( this.itemSearch );  
    };
    
  sugerencias(value : string){

    let tempClient : any;

    if(getDataSS("tempClient" ) !== undefined){
     tempClient = getDataSS("tempClient")
    }

    this.spinner = true;
    this.itemSearch = value;
    this.mostrarSugerencias = true;  
    const option = this.myForm.get('searchOption')?.value;
    if( option === "Por descripción"){
      this.articleService.getArtListPriceByDesc(tempClient.idListaPrecios, value)
      .subscribe ( ({precios} )=>{
        console.log(precios);
        if(precios.length !== 0){
          this.suggested = precios;
            this.spinner = false;
            }else{
            this.spinner = false;
            this.mostrarSugerencias = false
            this.noMatches = true;
          }
        }
      )
    }
  
    }

  
    // este codigo no trabaja con el debounce (puse un condicional en el debouncer) es el enter de la lupa
  searchByCode(){
    this.noMatch = false;
    const option = this.myForm.get('searchOption')?.value;
    const itemSearch = this.myForm.get('itemSearch')?.value;
    if( option === "Por descripción" || itemSearch === ''){
        return
    }else{    
      let tempClient : any;

      if(getDataSS("tempClient" ) !== undefined){
      tempClient = getDataSS("tempClient")
      }

      console.log(tempClient.idListaPrecios, itemSearch);
      this.articleService.getArtListPriceByCode(tempClient.idListaPrecios, itemSearch)
      .subscribe ( ({precio} )=>{
        if(precio){
          this.articleFounded = precio;
          this.spinner = false;
          this.isArticleFounded = true;
          this.mostrarSugerencias = false;
          this.itemSearch = '';
          this.suggested = [];
        }else{
          this.noMatch = true;
        }
      }
    )
  }
  }
     
  Search( item : any ){
    let tempClient : any;

    if(getDataSS("tempClient" ) !== undefined){
     tempClient = getDataSS("tempClient")
    }
    // this.articleService.searchProductById(item.idArticulo)
    this.articleService.getArtListPriceByCode(tempClient.idListaPrecios, item.codigoInterno)
        .subscribe ( ({precio} )=>{
          if(precio){
            this.articleFounded = precio;
            this.spinner = false;
            this.isArticleFounded = true;
            this.mostrarSugerencias = false;
            this.itemSearch = '';
            this.suggested = [];
          }else{
            this.noMatch = true;
          }
        }
        )
}

searchSuggested( item: any ) {
  this.Search( item );
}

  goBack(){
    this.router.navigateByUrl('/armar-pedido')
    setTimeout(()=>{
      this.orderService.changeClientValue.emit(true);
    },0)
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
      width = "430px";
      height ="470px";
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
