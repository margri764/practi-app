import { Component, InjectionToken, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { getDataLS } from 'src/app/protected/Storage';
import { GenericSuccessComponent } from 'src/app/protected/messages/generic-success/generic-success/generic-success.component';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';


@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit, OnDestroy {

  myForm! : FormGroup;
  save : boolean = false;
  isLoading : boolean = false;
  article : any;
  authSuscription! : Subscription;
  salePoint : any;
 
  
  constructor(
                private fb : FormBuilder,
                private store : Store <AppState>,
                private authService : AuthService,
                private dialog : MatDialog,
                private articleService : ArticlesService,
                private errorService : ErrorService,
                private dialogRef: MatDialogRef<NewArticleComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,

  ) { 


  }


  ngOnInit(): void {
    
        // obtengo el idLista de precios 
        const salePoint = getDataLS('salePoint');
        if(salePoint !== null || salePoint !== undefined){
          this.salePoint = salePoint;
        }
 

    this.errorService.closeIsLoading$.subscribe((emmited)=>{if(emmited){this.isLoading = false}})


    this.myForm = this.fb.group({
      descripcionLarga: ['' ],
      codigoInterno: [ '' ],
      iva: [ '' ],
      precioBrutoFinal: [ 0 ],
      cantidadStock: [ 0 ],
      idListaPrecio: [ this.salePoint],

    });   

 
  }

  
  

  onSaveForm(){

    if ( this.myForm.invalid  ) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    
    this.articleService.createNewArticle(this.myForm.value).subscribe( 
      (res)=>{
        if(res){
          this.isLoading = false;  
          this.articleService.updateAllArticle$.emit(true)
          this.closeComponent();
          this.openGenericSuccess('Articulo creado correctamente');

        }})
    // this.authService.updateClientById(this.myForm.value, "2739").subscribe(
    //   (res)=>{
    //     console.log(res);
    //   })

  }

  closeComponent(){
    this.dialogRef.close();

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

  ngOnDestroy(): void {
    if(this.authSuscription){
      this.authSuscription.unsubscribe();
    }
  }


}

