import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

import { articlePrice } from 'src/app/protected/interfaces/list.interface';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';


@Component({
  selector: 'app-list-by-id',
  templateUrl: './list-by-id.component.html',
  styleUrls: ['./list-by-id.component.scss']
})
export class ListByIdComponent implements OnInit {

  arrArticles : articlePrice []=[];
  isLoading : boolean = false;

      // paginator
      length = 150;
      pageSize = 10;
      pageIndex = 1;
      pageSizeOptions = [5, 10, 25];
      hidePageSize = false;
      showPageSizeOptions = true;
      showFirstLastButtons = true;
      disabled = false;
      pageEvent!: PageEvent;
      // paginator

      id : any ;

  constructor(
            //  @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
             private artcicleService : ArticlesService,
             private errorService : ErrorService,
             private activatedRoute : ActivatedRoute
             
  ) { 
          this.activatedRoute.params.subscribe(
            ({id})=>{ this.id = id;
                      // this.getListById(id);
            })
  }

  ngOnInit(): void {
    this.getInitialData( );
  }

  
  getInitialData( ){


    this.isLoading = true;
    this.artcicleService.getPriceListById(this.id, this.pageIndex, this.pageSize).subscribe(
      ({precios})=>{
        if(precios.length !== 0){
              console.log(precios);
              this.arrArticles = precios;
              this.isLoading = false;
              // this.length = precios.total_reg;

        }
              
      }
    )
  };


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  
      this.length,
      this.pageSize, 
      this.pageIndex;
      this.isLoading= true;
      // this.dataTableActive = this.articleService.getOrdersPaginator(this.pageIndex, this.pageSize,)
      // this.orderService.getOrdersPaginator(this.pageIndex, this.pageSize,).subscribe(
        this.artcicleService.getPriceListById(this.id, this.pageIndex, this.pageSize).subscribe(
        ({precios})=>{
          console.log(precios);
          this.arrArticles = precios;
          this.isLoading = false;
          // this.length = precios.total_reg;

        })
  }

  styleObject(stock : number) : object {
 
    if(stock == 0 || stock < 0){
      return {'color':'red'};
    }else{
      return {'color':'blue'};

    }
    
}
close(){
  this.errorService.close$.next(true);
  this.errorService.close$.next(false);
}
}
