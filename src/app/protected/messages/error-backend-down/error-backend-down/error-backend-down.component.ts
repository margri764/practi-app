import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-backend-down',
  templateUrl: './error-backend-down.component.html',
  styleUrls: ['./error-backend-down.component.scss']
})
export class ErrorBackendDownComponent implements OnInit {

  selection : boolean = false;
  constructor(
               private dialogRef: MatDialogRef<ErrorBackendDownComponent>,
               private router : Router,
              ) { }

ngOnInit(): void {

}


action(value : string){

  switch (value) {
    case 'close':
                  this.dialogRef.close();
                  this.router.navigateByUrl('/home');
                  // this.goBack();
      break;

      case 'login':
                  this.selection = true;
                  this.router.navigateByUrl('login');
                  this.dialogRef.close();
                  // setTimeout(()=>{ this.dialogRef.close(); },500)
      break;
    
      default:
      break;
  }
}
}