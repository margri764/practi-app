import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { log } from 'console';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-ask-user',
  templateUrl: './ask-user.component.html',
  styleUrls: ['./ask-user.component.scss']
})
export class AskUserComponent implements OnInit {
  confirm : boolean = false;
  actionName : string = '';
  name : string = '';
  msg : string = 'Esta acción se puede revertir';
  
    constructor(
                 @Inject(MAT_DIALOG_DATA) public data: any,
                 private dialogRef: MatDialogRef<AskUserComponent>,
                 private authService : AuthService 
    ) { }
  
  closeComponent(){
    setTimeout(()=>{ 
      this.dialogRef.close();
    },500)
  }
  
  continue(){
    this.confirm = true; // es para clase en el button

    setTimeout(()=>{ 
      if(this.actionName === "eliminar"){
        this.authService.cancelOrNextUser.emit("eliminar");
      }else{
        this.authService.cancelOrNextUser.emit("habilitar");
      }
      this.dialogRef.close();
          
    },500)
  }
  
  ngOnInit(): void {
    this.actionName = this.data.ask;
    this.name = this.data.user;
  }
  
  }
  