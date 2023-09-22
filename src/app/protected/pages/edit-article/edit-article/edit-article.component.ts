import { Component, InjectionToken, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  myForm! : FormGroup;
  save : boolean = false;
  isLoading : boolean = false;
  article : any;
 
  
  constructor(
                private fb : FormBuilder,
                private store : Store <AppState>,
                private authService : AuthService,
                private dialog : MatDialog,
                private errorService : ErrorService,
                private dialogRef: MatDialogRef<EditArticleComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,

  ) { 


  }

  ngOnInit(): void {

    this.errorService.closeIsLoading$.subscribe((emmited)=>{if(emmited){this.isLoading = false}})
    this.article = this.data;
    console.log(this.data);

    this.myForm = this.fb.group({
      descripcionLarga: [this.article.descripcionLarga  ],
      codigoInterno: [this.article.codigoInterno  ],
      iva: [ this.article.iva  ],
      precioBrutoFinal: [ this.article.precioBrutoFinal ],
      cantidadStock: [ this.article.cantidadStock ],
    });   


          
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

