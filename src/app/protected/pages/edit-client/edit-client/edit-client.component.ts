import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { GenericSuccessComponent } from 'src/app/protected/messages/generic-success/generic-success/generic-success.component';
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { CuitValidatorService } from 'src/app/protected/services/cuit-validator/cuit-validator.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit, OnDestroy {

  myForm! : FormGroup;
  save : boolean = false;
  // client! : User;
  client! : any;
  nameOptions : string [] = [];
  priceListOpt : any [] = [];
  defaultValue : string = '';
  salePoint : any;
  ivaOption : any;
  dniOption : any [] = [];
  isLoading : boolean = false;
  authSuscription! : Subscription;

  
  constructor(
                @Inject(MAT_DIALOG_DATA) public data: any,
                private fb : FormBuilder,
                private orderService : OrderService,
                private store : Store <AppState>,
                private dialogRef: MatDialogRef<EditClientComponent>,
                private articleService : ArticlesService,
                private authService : AuthService,
                private dialog : MatDialog,
                private errorService : ErrorService,
                private  cuitValidatorService : CuitValidatorService

  ) 
  { 
    this.isLoading = true;
    setTimeout(()=>{
      this.isLoading = false;
    },3500)
  }

  

  ngOnInit(): void {

    this.client = this.data;
    console.log(this.client);
    this.errorService.closeIsLoading$.subscribe((emmited)=>{if(emmited){this.isLoading = false; this.dialogRef.close();}})

    this.getCondicionesiva();
    this.getDniOption();
    this.getAllPriceLists()
    
    setTimeout(()=>{
      // this.isLoading = false;
      this.autoGenerateName();
    },1500)
    



    this.myForm = this.fb.group({
      id: [ this.client.id ], 
      nombre: [ this.client.nombre ],
      apellido: [ this.client.apellido ],
      organizacion:[this.client.organizacion],
      razonSocial:[this.client.razonSocial],
      archivarComo:[this.client.archivarComo],
      idCondicionIva:[this.client.idCondicionIva],
      email1: [ this.client.email1 ],
      idListaPrecios: [ this.client.idListaPrecios],
      idTipoDocumento: [ this.client.idDocTipo ],
      telefonoCodigoArea:[ this.client.telefonoCodigoArea ],
      numeroLocal:[ this.client.numeroLocal ],
      domicilio:[ this.client.domicilio ],
      localidad:[ this.client.localidad ],
      provincia:[ this.client.provincia ],
      pais:[ this.client.pais ],
      codigoPostal:[ this.client.codigoPostal ],
      nroDocumento:[ this.client.nroDocumento ],
      cuit: [ this.client.cuit ,[Validators.required, (control: any) => this.validateCuit(control)],, 
      ],
      
  
    });          

    console.log(this.myForm.get('idCondicionIva')?.value);
    console.log(this.myForm.get('idTipoDocumento')?.value);

    this.authSuscription = this.store.select('auth').subscribe(
      ({salePoint})=>{
        if(salePoint !== null){
          this.salePoint = salePoint;
        }
      })
  }

  validateCuit(control: AbstractControl) {
    const isValid = this.cuitValidatorService.verifyCuit(control.value);
    return isValid ? null : { invalidCuit: true };
  }

  
  autoGenerateName() {
    const nombre = this.myForm.get('nombre')?.value;
    const apellido = this.myForm.get('apellido')?.value;
    const organizacion = this.myForm.get('organizacion')?.value;
    const reason = this.myForm.get('razonSocial')?.value;
  
    const formatOptions: string[] = [];
  
    if (nombre && apellido) {
      formatOptions.push(`${nombre} ${apellido} (${reason})`);
      formatOptions.push(`${reason} (${nombre} ${apellido})`);
      formatOptions.push(`${nombre}, ${apellido}`);
      formatOptions.push(`${apellido}, ${nombre}`);
    }
  
    if (organizacion) {
      if (nombre && apellido) {
        formatOptions.push(`${nombre} ${apellido} (${organizacion})`);
      }
      formatOptions.push(organizacion);
    }
  
    if (reason) {
      formatOptions.push(reason);
    }
  
    // Ahora, 'formatOptions' contendrá todas las opciones posibles
    console.log(formatOptions);
    this.nameOptions = formatOptions;
    this.defaultValue = formatOptions[0]
  }
  

  getCondicionesiva(){

    this.orderService.condicionesIva().subscribe(
      ({condiciones})=>{
          if(condiciones.length !== 0){
               this.ivaOption = condiciones;
          }
      })

  }

  getAllPriceLists(){
    this.articleService.getAllTruePriceList().subscribe(
      ({listas})=>{
        console.log(listas);
        this.priceListOpt= listas;
      })
  }

  getDniOption(){

    this.orderService.getDniOption().subscribe(
      ({tipos})=>{
          if(tipos.length !== 0){
               const newTipos = tipos.filter((item: { descripcion: string; })=> item.descripcion !== "CUIT")
               this.dniOption = newTipos;
               console.log(newTipos);
          }
      })

  }

  onSaveForm(){

    if ( this.myForm.invalid  ) {
      this.myForm.markAllAsTouched();
 
      return;
    }

    console.log(this.myForm.value);
    this.isLoading = true;
    this.authService.updateClientById(this.myForm.value, this.client.id).subscribe(
      (res)=>{
        if(res){
            this.openGenericSuccess('Cliente editado con éxito');
            this.isLoading = false;
            this.dialogRef.close();
            this.authService.updateEditingUser$.emit(true)
        }
      })

  }

  closeComponent(){
    this.dialogRef.close();
  }

  openGenericSuccess(msg : string){

    let width : string = '';
    let height : string = '';
  
    if(screen.width >= 800) {
      width = "400px"
      height ="450px";
    }
  
    this.dialog.open(GenericSuccessComponent, {
      data: msg,
      width: `${width}`|| "",
      height:`${height}`|| "",
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }
  ngOnDestroy(): void {
    if(this.authSuscription){
      this.authSuscription.unsubscribe();

    }
  }

}
