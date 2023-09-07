import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-ask-edit',
  templateUrl: './ask-edit.component.html',
  styleUrls: ['./ask-edit.component.scss']
})
export class AskEditComponent implements OnInit {


confirm : boolean = false;
actionName : string = '';
item : string = '';
msg : string = 'Esta acción se puede revertir';

  constructor(
               @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef: MatDialogRef<AskEditComponent>,
              //  private productService : ProductsService 
  ) { }

closeComponent(){
  setTimeout(()=>{ 
    this.dialogRef.close();
  },500)
}

continue(){
  this.confirm = true; // es para clase en el button
  setTimeout(()=>{ 
          this.dialogRef.close();
          
          // if(this.actionName === "eliminar"){
          //   this.productService.cancelOrNextDialog.emit("eliminar");
          // }else{
          //   this.productService.cancelOrNextDialog.emit("pausar");
          // }
          
  },500)
}

ngOnInit(): void {
  this.actionName = this.data.ask;
  this.item = this.data.item;
  console.log(this.actionName);

  (this.actionName === "habilitar" || this.actionName === "pausar") ? this.msg ="Esta acción se puede revertir" : this.msg = "CUIDADO!! esta acción es irreversible."
}

}
