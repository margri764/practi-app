import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Articulo } from '../../../interfaces/articulo.interface'
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditArticleComponent } from '../../edit-article/edit-article/edit-article.component';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getDataSS } from 'src/app/protected/Storage';
import { OrderService } from 'src/app/protected/services/order/order.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import { NewArticleComponent } from '../../new-article/new-article/new-article.component';
import { ErrorService } from 'src/app/protected/services/error/error.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

  
@ViewChild(MatAccordion) accordion!: MatAccordion;
@ViewChild ('top', {static: false} ) top! : ElementRef;
@ViewChild ('menu', {static: false} ) menu! : ElementRef;

displayedColumns: string[] = ['action', 'name','price','stock','iva'];
dataTableActive : any = new MatTableDataSource<any>();
  
  arrArticles : any []=[]

  // search
  itemSearch : string = '';
  mostrarSugerencias: boolean = false;
  sugested : string= "";
  suggested : any[] = [];
  spinner : boolean = false;
  alert:boolean = false;
  fade : boolean = false;
  search : boolean = true;
  product  : any[] = [];
  arrArticlesSugested : any[]=[];
  // search

    // paginator
    length = 50;
    pageSize = 10;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 25];
    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;
    pageEvent!: PageEvent;
    // paginator

  isLoading : boolean = false;
  articleFounded : any = {};
  isArticleFounded : boolean = false;
  phone : boolean = false;
  myForm!: FormGroup;
  noMatches : boolean = false;
  salePoint : any;
  authSuscription! : Subscription;

  // no anda la paginacion
  constructor(
              private articleService : ArticlesService,
              private dialog : MatDialog,
              private fb : FormBuilder,
              private orderService : OrderService,
              private store : Store <AppState>,
              private errorService : ErrorService
  ) { 
    (screen.width <= 600) ? this.phone = true : this.phone = false;

      this.myForm = this.fb.group({
        itemSearch:  [ '',  ],
      });  
  }


  ngOnInit(): void {

    this.errorService.closeIsLoading$.subscribe( (emmited)=>{ if(emmited){this.isLoading = false} });
    this.articleService.updateAllArticle$.subscribe( (emmited )=>{ if(emmited){ this.getAllArticles()} } );
  
    this.getAllArticles();


        this.articleService.updateEditingArticle$.subscribe( 
          (articulo )=>{
            
            if(articulo.reload === "reloadArticles"){
              this.getAllArticles();
            }
             if(articulo){
                this.isLoading = true;
                this.getItem(articulo)
              }
             })
    
        this.authSuscription = this.store.select('auth').subscribe(
          ({salePoint})=>{
            if(salePoint === null){
              this.getSalePoint();
            }else{
              this.salePoint = salePoint;
            }
          })

        //para las busquedas
        this.myForm.get('itemSearch')?.valueChanges.subscribe(newValue => {
          this.itemSearch = newValue;
          this.articleFounded = {};
          this.isArticleFounded = false;
    
          if(this.itemSearch !== null && this.itemSearch !== ''){
    
            this.teclaPresionada();
            
          }
        });

        this.debouncer
        .pipe(debounceTime(400))
        .subscribe( valor => {
    
          this.sugerencias(valor);
        });
    
  }

  
  getSalePoint(){

    this.orderService.getSalePoint().subscribe(
      ({pos})=>{
          if(pos){
              this.salePoint = pos.numero;
          }
      })
  }

  getAllArticles(){
    this.isLoading = true;
    this.articleService.getAllArticles(this.pageIndex, this.pageSize).subscribe(
      ({articulos, pagination})=>{

            if(articulos.length !== 0){
              this.arrArticles = articulos;
              this.dataTableActive = articulos;
              this.isLoading = false;
              this.length = pagination.total_reg;
            }
      }
    );
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
    console.log(this.pageIndex, this.pageSize);

    this.articleService.getAllArticles(this.pageIndex, this.pageSize).subscribe(
      ({articulos})=>{
            if(articulos.length !== 0){
              this.arrArticles = articulos;
              this.dataTableActive = articulos;
              this.isLoading = false;
            }
      }
    );

      
    }

  styleObject(status : boolean) : object {
 
    if(!status){
      return {'color':'red'};
    }else{
      return {'color':'blue'};
    }
  }


  addArticle(){

    let width;
    let height;
    if(screen.width >= 800) {
      width = "650px";
      height ="550px";
    }
  
    this.dialog.open(NewArticleComponent, {
      width: `${width}`|| "",
      height:`${height}`|| "",
      panelClass: "custom-modalbox-EditArticleComponent", 
    });
  }

  deleteArticle( article:any ){

  }

  editArticle( article:any){ 
    console.log(article);

    let width;
    let height;
    if(screen.width >= 800) {
      width = "650px";
      height ="550px";
    }
  
    this.dialog.open(EditArticleComponent, {
      data: article,
      width: `${width}`|| "",
      height:`${height}`|| "",
      panelClass: "custom-modalbox-EditArticleComponent", 
    });
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

  }
    
  sugerencias(value : string){

      
    this.spinner = true;
    this.itemSearch = value;
    this.mostrarSugerencias = true;  
      this.articleService.getArtListPriceByDesc(this.salePoint, value)
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

  getItem(item :any){
    this.isArticleFounded = true;
    this.articleFounded = item;
    this.mostrarSugerencias = false;
  }
      // search

  ngOnDestroy(): void {
    if (this.authSuscription) {
      this.authSuscription.unsubscribe();
    }
  
  }

}
