import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorService } from 'src/app/protected/services/error/error.service';

@Component({
  selector: 'app-ask-del-client',
  templateUrl: './ask-del-client.component.html',
  styleUrls: ['./ask-del-client.component.scss']
})
export class AskDelClientComponent implements OnInit {

  confirm : boolean = false;
  name : string = 'sin nombre'
  constructor(
             private errorService: ErrorService,
             private dialogRef : MatDialogRef<AskDelClientComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.name = this.data;
  }

  closeComponent(){
    this.dialogRef.close();
  }

  continue(){
    this.confirm = true;
    this.errorService.authDelClient$.emit(true),
    setTimeout( ()=>{
      this.dialogRef.close();
    },500)


  }
}
