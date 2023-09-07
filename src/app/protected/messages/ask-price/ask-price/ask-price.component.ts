import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-ask-price',
  templateUrl: './ask-price.component.html',
  styleUrls: ['./ask-price.component.scss']
})
export class AskPriceComponent implements OnInit {

  actionName : string = '';
  msg : string = 'Esta acción se puede revertir';
  confirm : boolean = false;

  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef : MatDialogRef<AskPriceComponent>,
              private productService : ProductsService
  ) { }

  ngOnInit(): void {

    this.actionName = this.data;
 
  }

  closeComponent(){
    setTimeout(()=>{ 
      this.dialogRef.close();
    },500)
  }
  
  continue(){
    this.confirm = true; // es para clase en el button
    setTimeout(()=>{ 
            this.dialogRef.close();
            this.productService.cancelOrNextDialog.emit()
            
    },500)
  }

}
