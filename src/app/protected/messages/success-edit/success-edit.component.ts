import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-success-edit',
  templateUrl: './success-edit.component.html',
  styleUrls: ['./success-edit.component.scss']
})
export class SuccessEditComponent implements OnInit {

confirm : boolean = false;
actionName : string = 'editado'

      constructor(
                  @Inject(MAT_DIALOG_DATA) public data: any,
                   private dialogRef: MatDialogRef<SuccessEditComponent>,
                  private productService : ProductsService,
      )
      {}

  
  continue(){
    this.confirm = true;
    this.productService.closeEditMenu.emit(),
    setTimeout(()=>{ this.dialogRef.close(); }, 500)
  }


  ngOnInit(): void {
      this.actionName = this.data.action;
  }

}
