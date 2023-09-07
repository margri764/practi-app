import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mantain-message',
  templateUrl: './mantain-message.component.html',
  styleUrls: ['./mantain-message.component.scss']
})
export class MantainMessageComponent implements OnInit {


    msg :string = '';
    confirm : boolean = false; 
    constructor(
                // @Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef : MatDialogRef<MantainMessageComponent>
  
    ) { }
  
    ngOnInit(): void {
  
      // this.msg = this.data;
    }
  
    continue(){
      this.confirm = true;
      setTimeout(()=>{this.dialogRef.close()},200)
      
    }
  }
  