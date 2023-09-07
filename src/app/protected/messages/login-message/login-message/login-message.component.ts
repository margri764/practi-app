import { Component, OnInit,  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/protected/services/error/error.service';

@Component({
  selector: 'app-login-message',
  templateUrl: './login-message.component.html',
  styleUrls: ['./login-message.component.scss']
})
export class LoginMessageComponent implements OnInit {

  selection : boolean = false;
  constructor(
               private dialogRef: MatDialogRef<LoginMessageComponent>,
               private router : Router,
               private errorService : ErrorService
              ) { }

ngOnInit(): void {


}


action(){
  this.selection = true;
  this.dialogRef.close();
  this.router.navigateByUrl('/login');

}
}