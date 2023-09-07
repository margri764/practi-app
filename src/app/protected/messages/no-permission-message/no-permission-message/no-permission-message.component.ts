import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-permission-message',
  templateUrl: './no-permission-message.component.html',
  styleUrls: ['./no-permission-message.component.scss']
})
export class NoPermissionMessageComponent implements OnInit {

  selection : boolean = false;
  constructor(
               private dialogRef: MatDialogRef<NoPermissionMessageComponent>,
              ) { }

ngOnInit(): void {

}


continue(){
  this.selection = true;
  this.dialogRef.close();
}

}