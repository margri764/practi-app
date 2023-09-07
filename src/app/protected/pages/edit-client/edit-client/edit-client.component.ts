import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/protected/models/user.models';
import { AuthService } from 'src/app/protected/services/auth/auth.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  myForm! : FormGroup;
  save : boolean = false;
  client! : User;

  
  constructor(
                private fb : FormBuilder,
                private store : Store <AppState>,
                private authService : AuthService,
                private dialog : MatDialog,
                private dialogRef: MatDialogRef<EditClientComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.myForm = this.fb.group({
      id: [''], 
      firstName: [''],
      lastName: [ ''],
      email: [''],
      area:[''],
      phone:[''],
      address:[''],
    });


  }

  ngOnInit(): void {

    this.client = this.data;
    console.log(this.client);



    this.myForm = this.fb.group({
      id: [ this.client.id ], 
      firstName: [ this.client.nombre ],
      lastName: [ this.client.apellido ],
      email: [ this.client.email1 || 'sin definir'],
      area:[ this.client.telefonoCodigoArea ],
      phone:[ this.client.numeroLocal ],
      address:[ this.client.domicilio || 'sin definir'],
  
    });          
  }
  

  onSaveForm(){
    

    this.authService.updateClientById(this.myForm.value, "2739").subscribe(
      (res)=>{
        console.log(res);
      })

  }

  closeComponent(){
    this.dialogRef.close();
  }

}
