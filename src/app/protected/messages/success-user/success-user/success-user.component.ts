import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-user',
  templateUrl: './success-user.component.html',
  styleUrls: ['./success-user.component.scss']
})
export class SuccessUserComponent implements OnInit {

  confirm : boolean = false;
  actionName : string = 'editado'
  
     constructor(
                  @Inject(MAT_DIALOG_DATA) public data: any,
                  private dialogRef: MatDialogRef<SuccessUserComponent>,
                )
        {}
  
    continue(){
      this.confirm = true;
      setTimeout(()=>{ this.dialogRef.close() }, 500)
    }
  
    ngOnInit(): void {
        this.actionName = this.data.action;
    }
  
  }