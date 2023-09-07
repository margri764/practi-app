import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorService } from 'src/app/protected/services/error/error.service';

@Component({
  selector: 'app-ask-temp-order',
  templateUrl: './ask-temp-order.component.html',
  styleUrls: ['./ask-temp-order.component.scss']
})
export class AskTempOrderComponent implements OnInit {

  confirm : boolean = false;
  constructor(
             private errorService: ErrorService,
             private dialogRef : MatDialogRef<AskTempOrderComponent>
  ) { }

  ngOnInit(): void {
  }

  closeComponent(){
    this.dialogRef.close();

  }

  continue(){
    this.errorService.authDelTempOrder$.emit(true),
    setTimeout( ()=>{
      this.dialogRef.close();
    },500)


  }
}
