import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/protected/services/auth/auth.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  contactos : any []=[];
  save : boolean = false;
  myForm! : FormGroup;

  constructor(
              private dialogRef : MatDialogRef<NewClientComponent>,
              private fb : FormBuilder,
              private authService : AuthService,
              private dialog : MatDialog
  ) { 
    this.myForm = this.fb.group({
      id: [''], 
      firstName: [''],
      lastName: [ ''],
      email: [''],
      area:[''],
      phone:[''],
      address:[''],
    })
  }

  ngOnInit(): void {


   
  }


  onSaveForm(){
    this.authService.addNewClient(this.myForm.value).subscribe(
      (res)=>{
            console.log(res);
    })
  }

  closeComponent(){
    this.dialogRef.close();
  }

}
