import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-success-category',
  templateUrl: './success-category.component.html',
  styleUrls: ['./success-category.component.scss']
})
export class SuccessCategoryComponent implements OnInit {


  confirm : boolean = false;
  actionName : string = ''
  
        constructor(
                    @Inject(MAT_DIALOG_DATA) private data: any,
                     private dialogRef: MatDialogRef<SuccessCategoryComponent>,
                    private productService : ProductsService,
        )
        {}
  
    
continue(){
  this.confirm = true;
  setTimeout(()=>{ this.dialogRef.close() }, 500)
}


ngOnInit(): void {
    this.actionName = this.data.actionName;
}
  
  }
  