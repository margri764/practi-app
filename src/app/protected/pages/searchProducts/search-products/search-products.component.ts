import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
  articleFounded : any []= [];
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


  // new search
productQuantity : number = 0;
showIncrementer : boolean = false;
inputValue: number = 0;
arrSelectedItem : any[]=[];
quantity : any;

producto : string = "Producto añadido"

  constructor(
            private articleService :ArticlesService,
            private dialog : MatDialog,
            private store : Store <AppState>,
            private orderService : OrderService,
            private router : Router,
            private localStorageService: LocalStorageService,
            private fb : FormBuilder,
            private errorService : ErrorService,
  ) { 

    this.myForm = this.fb.group({
      itemSearch:  [ '',  ],
    });   
  }


  ngOnInit(): void {

    this.errorService.labelInvalidCode$.subscribe((emmited)=>{if(emmited){this.noMatch = true; this.spinner = false}})

    // despues de seleccionar el articulo con mas opciones como bonificacion, cierro el card de /buscar-pedidos
    this.orderService.selectProductOption$.subscribe((emmited)=>{ if(emmited){this.close()}
    })

    //para las busquedas
    this.myForm.get('itemSearch')?.valueChanges.subscribe(newValue => {
      this.itemSearch = newValue;
      this.noMatches = false;

      const option = this.myForm.get('searchOption')?.value;
      if(this.itemSearch !== null && this.itemSearch !== ''){

        this.teclaPresionada();
            // if( option === "Por descripción"){
            // }else{
            //   return
            // }
      }
    });

    this.debouncer
    .pipe(debounceTime(400))
    .subscribe( valor => {

      this.sugerencias(valor);
    });

  

    this.articleSuscription = this.store.select('article').subscribe(
      ({arrSelectedArticles})=>{
        this.arrItemSelected = arrSelectedArticles;
        this.quantity = this.arrItemSelected.length;
        if(arrSelectedArticles.length > 1){
          this.producto = "Productos añadidos"
        }
    })
  }


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
      this.articleService.getArtListPriceByDesc(tempClient.idListaPrecios, value)
      .subscribe ( ({precios} )=>{
        console.log(precios);
        if(precios.length !== 0){
          this.suggested = precios;
          //quitar esta logica de aca
          const suggestedWithShowIncrementer = precios.map((item: any) => ({ ...item, showIncrementer: false, cantidad:0 }));
          this.suggested = suggestedWithShowIncrementer;
            // this.itemSearch = '';
            this.myForm.get('itemSearch')?.setValue('');
            this.spinner = false;
            }else{
            this.spinner = false;
            this.mostrarSugerencias = false
            this.noMatches = true;
          }
        }
      )
  
  }
  


counter( article : any, value :  string ){
 
  let articlesInSStorage = getDataSS("arrArticles");
  article.showIncrementer = true; // es para mostrar el incrementer


  if(value === 'inc'){
    article.cantidad = article.cantidad + 1;
  }else{
    // this.productQuantity = this.productQuantity - 1;
    ( article.cantidad >= 1) ?  article.cantidad  =  article.cantidad  - 1 : "";
  }

  // si es 0 quita el counter y tiene que eliminar el item del SS y redux
  if( article.cantidad == 0){
    article.showIncrementer = false;
    let noCeroQuantity = articlesInSStorage.filter((item: any) => item.codigoInterno !== article.codigoInterno);
    this.localStorageService.saveStateToSessionStorage(noCeroQuantity, "arrArticles");
    this.store.dispatch(articleAction.deleteArticle({ articleId: article.codigoInterno }));
    return
  }

  const itemSelect = {
                    descripcionLarga : article.descripcionLarga,
                    precioBrutoFinal: article.precioBrutoFinal,
                    cantidad: article.cantidad,
                    codigoInterno : article.codigoInterno,
                    id : article.idArticulo,
                    bonificacionPorciento: 0,
                    ventaTotal: (1 * article.precioBrutoFinal) 
}

  // obtengo del LS el array de articulos seleccionados
  if(articlesInSStorage == undefined){
    articlesInSStorage = [];
  }

  // si el item ya esta en LS y en redux quiere decir q es un update de la cantidad (lo elimina)
  let noRepetidedArticles = articlesInSStorage.filter((item: any) => item.codigoInterno !== article.codigoInterno);
  this.store.dispatch(articleAction.deleteArticle({ articleId: article.codigoInterno }));

  // agrego el item seleccionado al SS
  noRepetidedArticles.push(itemSelect);

  //hago el update en redux y LS 
  let updatedArr = [...this.arrItemSelected, itemSelect];
  this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: updatedArr }));
  this.localStorageService.saveStateToSessionStorage(noRepetidedArticles, "arrArticles");

  this.quantity = this.arrItemSelected.length;
  if(this.arrItemSelected.length > 1){
    this.producto = "Productos añadidos"
  }

  //guardo en el ss los articulos temporalmente, el concat lo uso para q no se sobreescriban los datos
  // let tempData = getDataSS("arrArticles");
  // updatedArr.concat(tempData);
  // this.localStorageService.saveStateToSessionStorage(updatedArr, "arrArticles");
  // this.openGenericSuccess('1 Producto añadido con éxito');
  // this.close();

}

// counterItemCode( article : any, value :  string ){
 
//   let articlesInSStorage = getDataSS("arrArticles");
//   article.showIncrementer = true; // es para mostrar el incrementer


//   if(value === 'inc'){
//     article.cantidad = article.cantidad + 1;
//   }else{
//     // this.productQuantity = this.productQuantity - 1;
//     ( article.cantidad >= 1) ?  article.cantidad  =  article.cantidad  - 1 : "";
//   }

//   // si es 0 quita el counter y tiene que eliminar el item del SS y redux
//   if( article.cantidad == 0){
//     article.showIncrementer = false;
//     let noCeroQuantity = articlesInSStorage.filter((item: any) => item.codigoInterno !== article.codigoInterno);
//     this.localStorageService.saveStateToSessionStorage(noCeroQuantity, "arrArticles");
//     this.store.dispatch(articleAction.deleteArticle({ articleId: article.codigoInterno }));
//     return
//   }

//   const itemSelect = {
//                     descripcionLarga : article.descripcionLarga,
//                     precioBrutoFinal: article.precioBrutoFinal,
//                     cantidad: article.cantidad,
//                     codigoInterno : article.codigoInterno,
//                     id : article.idArticulo,
//                     bonificacionPorciento: 0,
//                     ventaTotal: (1 * article.precioBrutoFinal) 
// }

//   // obtengo del LS el array de articulos seleccionados
//   if(articlesInSStorage == undefined){
//     articlesInSStorage = [];
//   }

//   // si el item ya esta en LS y en redux quiere decir q es un update de la cantidad (lo elimina)
//   let noRepetidedArticles = articlesInSStorage.filter((item: any) => item.codigoInterno !== article.codigoInterno);
//   this.store.dispatch(articleAction.deleteArticle({ articleId: article.codigoInterno }));

//   // agrego el item seleccionado al SS
//   noRepetidedArticles.push(itemSelect);

//   //hago el update en redux y LS 
//   let updatedArr = [...this.arrItemSelected, itemSelect];
//   this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: updatedArr }));
//   this.localStorageService.saveStateToSessionStorage(noRepetidedArticles, "arrArticles");

//   this.quantity = this.arrItemSelected.length;
//   if(this.arrItemSelected.length > 0){
//     this.producto = "Productos añadidos"
//   }

//   //guardo en el ss los articulos temporalmente, el concat lo uso para q no se sobreescriban los datos
//   // let tempData = getDataSS("arrArticles");
//   // updatedArr.concat(tempData);
//   // this.localStorageService.saveStateToSessionStorage(updatedArr, "arrArticles");
//   // this.openGenericSuccess('1 Producto añadido con éxito');
//   // this.close();

// }

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

ngOnDestroy() {
  if (this.authSuscription) {
    this.authSuscription.unsubscribe();
  }
  if (this.articleSuscription) {
    this.articleSuscription.unsubscribe();
  }
}


}