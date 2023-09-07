import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { PriceList } from 'src/app/protected/interfaces/list.interface';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { ListByIdComponent } from '../../list-by-id/list-by-id/list-by-id.component';

@Component({
  selector: 'app-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss']
})
export class GeneralListComponent implements OnInit {

  isLoading : boolean = false;
  arrList : PriceList [] = [];
  constructor(
              private articleService : ArticlesService,
              private errorService : ErrorService,
              private dialog : MatDialog,
              // private _bottomSheet : MatBottomSheet
  ) { }

  ngOnInit(): void {

    // this.errorService.close$.subscribe(  (emitted)=>{if(emitted)this._bottomSheet.dismiss()})
    this.getAllTruePriceList();
  }

  getAllTruePriceList(){
    this.isLoading = true;
    this.articleService.getAllTruePriceList().subscribe(
      ({listas})=>{
        console.log(listas);
        this.arrList = listas;
        this.isLoading = false;
        this.errorService.isLoading$.next(true);
        
        
      })
  }

  // selectList( id: any) {

  //   this._bottomSheet.open(ListByIdComponent,{
  //     data: id,
  //     disableClose: true,
  //     })
  // }



}
