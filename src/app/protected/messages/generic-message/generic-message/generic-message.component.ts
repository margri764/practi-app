import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-message',
  templateUrl: './generic-message.component.html',
  styleUrls: ['./generic-message.component.scss']
})
export class GenericMessageComponent implements OnInit {

  msg :string = '';
  confirm : boolean = false; 
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef : MatDialogRef<GenericMessageComponent>

  ) { }

  ngOnInit(): void {

    this.msg = this.data;
  }

  continue(){
    this.confirm = true;
    setTimeout(()=>{this.dialogRef.close()},200)
    
  }
}
