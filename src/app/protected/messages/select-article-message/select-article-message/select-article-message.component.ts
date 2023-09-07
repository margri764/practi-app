import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Articulo } from 'src/app/protected/interfaces/articulo.interface';
import { DetalleItem } from 'src/app/protected/interfaces/order.interface';
import * as articleAction from 'src/app/article.actions'
import { Subscription, take } from 'rxjs';
import { GenericSuccessComponent } from '../../generic-success/generic-success/generic-success.component';
import { getDataLS, getDataSS, saveDataLS } from 'src/app/protected/Storage';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';
import { updateLocale } from 'moment';
import { OrderService } from 'src/app/protected/services/order/order.service';

@Component({
  selector: 'app-select-article-message',
  templateUrl: './select-article-message.component.html',
  styleUrls: ['./select-article-message.component.scss']
})
export class SelectArticleMessageComponent implements OnInit, OnDestroy {

  article! :  Articulo;
  productQuantity : number = 1;
  total : number = 0;
  inputValue: number = 0;
  articleSuscription! : Subscription;

  constructor(
               @Inject(MAT_DIALOG_DATA) public data: any,
               private store : Store <AppState>,
               private dialogRef : MatDialogRef<SelectArticleMessageComponent>,
               private dialog : MatDialog,
               private localStorageService: LocalStorageService,
               private orderService : OrderService
  ) { }

  ngOnDestroy(): void {
    if (this.articleSuscription) {
      this.articleSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.article = this.data;
    console.log(this.article);
    this.totalPurchase();

  }


increment( ){
  this.productQuantity = this.productQuantity + 1;
  this.totalPurchase();
}

decrement( ){
  (this.productQuantity>=2) ? this.productQuantity = this.productQuantity - 1 : "";
  this.totalPurchase();

}

totalPurchase(){

  if(this.inputValue > 0){
    const priceBonus = this.article.precioBrutoFinal * this.inputValue;
    const result = this.article.precioBrutoFinal - priceBonus / 100;
    this.total = (this.productQuantity * result) ;
    return this.total;
  }

  this.total = (this.productQuantity * this.article.precioBrutoFinal) ;
  return this.total;

}

selectItem(){

  let updatedArr=[];
// saco los datos siempre del redux, el localstorage es para poder recuperare el redux en los reloads
  const articleToSave = {
                          descripcionLarga : this.article.descripcionLarga,
                          precioBrutoFinal: this.article.precioBrutoFinal,
                          cantidad: this.productQuantity,
                          codigoInterno : this.article.codigoInterno,
                          id : this.article.idArticulo,
                          bonificacionPorciento: this.inputValue || 0,
                          ventaTotal: this.total  
                       }


  // obtengo el arrSelectedArticles y hago el update con el nuevo producto
  this.articleSuscription = this.store.select('article')
  .pipe( take(1))
  .subscribe(({arrSelectedArticles}) => {
    updatedArr = [...arrSelectedArticles, articleToSave]; //update
    this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: updatedArr }));
     
    // guardo en sessin storage la data temporal, solo guardo en el LS los pedidos
    // hago el concat para q no se sobreescriban los daots  
    let tempData = getDataSS("arrArticles");
    updatedArr.concat(tempData);
    this.localStorageService.saveStateToSessionStorage(updatedArr, "arrArticles");
    this.orderService.selectProductOption$.emit(true)

  });


  setTimeout(()=>{
    this.dialogRef.close();
  },400)

  setTimeout(()=>{
    this.openGenericSuccess('Producto añadido con éxito');
  },800)

}

styleObject(status : boolean) : object {
 
  if(!status){
    return {'color':'red'};
  }else{
    return {'color':'blue'};
  }
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

}
