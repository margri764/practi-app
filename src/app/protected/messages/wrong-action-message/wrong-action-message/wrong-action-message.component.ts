import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrong-action-message',
  templateUrl: './wrong-action-message.component.html',
  styleUrls: ['./wrong-action-message.component.scss']
})
export class WrongActionMessageComponent implements OnInit {

  confirm : boolean = false;
  msg : string = 'Error en la acción'

  constructor( 
              private dialogRef : MatDialogRef<WrongActionMessageComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private router : Router
              )
   { }

  ngOnInit(): void {
    this.msg = this.data;
  }

  continue(){
    this.confirm = true;
    setTimeout(()=>{ this.dialogRef.close() },300);
    this.router.navigateByUrl('/home')
    
  }

}
