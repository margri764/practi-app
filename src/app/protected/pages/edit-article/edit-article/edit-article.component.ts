import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/protected/services/auth/auth.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  myForm! : FormGroup;
  save : boolean = false;
 
  
  constructor(
                private fb : FormBuilder,
                private store : Store <AppState>,
                private authService : AuthService,
                private dialog : MatDialog,
                private dialogRef: MatDialogRef<EditArticleComponent>,
                // @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.myForm = this.fb.group({
      fullName:  [ '' ],
      email:     [ '' ],
      phone:     [    ],
      address:   [ '' ],
      role:      [ '' ],
    });   

  }

  ngOnInit(): void {

          
  }
  

  onSaveForm(){
    

    // this.authService.updateClientById(this.myForm.value, "2739").subscribe(
    //   (res)=>{
    //     console.log(res);
    //   })

  }

  closeComponent(){
    this.dialogRef.close();

  }



}
