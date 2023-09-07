import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Articulo } from '../../../interfaces/articulo.interface'
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditArticleComponent } from '../../edit-article/edit-article/edit-article.component';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

  
@ViewChild(MatAccordion) accordion!: MatAccordion;
@ViewChild ('top', {static: false} ) top! : ElementRef;
@ViewChild ('menu', {static: false} ) menu! : ElementRef;

displayedColumns: string[] = ['img','name','price','stock','comment','ingredients'];
dataTableActive : any = new MatTableDataSource<any>();
  
  arrArticles : Articulo[]=[]

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

  isLoading : boolean = false;
  articleFounded : any = {};
  isArticleFounded : boolean = false;
  phone : boolean = false;

  constructor(
              private articleService : ArticlesService,
              private dialog : MatDialog
  ) { 
    (screen.width <= 600) ? this.phone = true : this.phone = false;

  }

  ngOnInit(): void {

  }

  getAllArticles(){
    this.isLoading = true;
    this.articleService.getAllArticles().subscribe(
      ({articulos})=>{

            console.log(articulos);
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


  addArticles(){
    this.dialog.open(EditArticleComponent, {
      // data: msg,
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  }

  deleteArticle( id:any ){}

  editArticle( id:any ){

 // para edita abro un dialog 
 // este es el endpoint editProductById()
    
  }


       // search
       close(){
        this.mostrarSugerencias = false;
        this.itemSearch = '';
        this.suggested = [];
        this.spinner= false;
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
          const field = "desc_larga";
          this.articleService.searchArticle(field, valueSearch)
          .subscribe ( ({articulos} )=>{
            if(articulos.length !== 0){
              // this.arrArticlesSugested = articulos;
              this.suggested = articulos.splice(0,10);
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
         this.alert = false;
         this.spinner = true;
         this.fade = false;
         this.articleService.searchProductById(id)
         .subscribe ( ({articulos} )=>{
            console.log(articulos);
            if(articulos){
              this.articleFounded = articulos;
              this.spinner = false;
              this.close();
              this.isArticleFounded = true;
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
    
}
