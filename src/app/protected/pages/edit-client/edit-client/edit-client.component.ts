import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/protected/models/user.models';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { OrderService } from 'src/app/protected/services/order/order.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  myForm! : FormGroup;
  save : boolean = false;
  // client! : User;
  client! : any;
  nameOptions : string [] =[];
  defaultValue : string = '';
  salePoint : any;
  ivaOption : any;
  dniOption : any;
  isLoading : boolean = false;

  
  constructor(
                @Inject(MAT_DIALOG_DATA) public data: any,
                private fb : FormBuilder,
                private orderService : OrderService,
                private store : Store <AppState>,
                private authService : AuthService,
                private dialog : MatDialog,
                private dialogRef: MatDialogRef<EditClientComponent>,

  ) { 

    this.isLoading = true;

  }

  contactos =  {
                archivarComo: "LOPEZ, ALEJANDRO",
                nombre: "ALEJANDRO",
                apellido: "LOPEZ",
                domicilio: "Francia 1234",
                localidad: "San Basilio",
                codigoPostal: "3456",
                provincia: "Cordoba",
                pais: "Argentina",
                telefonoCodigoPais: "54",
                telefonoCodigoArea: "294",
                esMovil: 1,
                numeroLocal: "9988787",
                extensionTelefono: "",
                descripcionTelefono: "Movil Particular",
                email1: "email_de_prueba@gmail.com",
                email2: "",
                email3: "",
                email4: "",
                emailAnotacion: "",
                emailEnvioComprobantes: 0,
                organizacion: "Arcor",
                razonSocial: "Arcor S.A",
                cuit: "333456775",
                nroDocumento: "19012023",
                idCondicionIva: 3,
                idListaPrecios: 1,
                idTipoDocumento: 86,
                esCliente: 1,
                esProveedor: 0,
                esContacto: 0,
                observaciones: "",
                id: 2764,

    }
  

  ngOnInit(): void {

    // this.client = this.data;
    this.client = this.contactos;
    console.log(this.client);
    this.getSalePoint();
    this.getCondicionesiva();
    this.getDniOption();
    
    setTimeout(()=>{
      this.isLoading = false;
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
      email1: [ this.client.email1 || 'sin definir'],
      idListaPrecios: [ this.client.idListaPrecios],
      idTipoDocumento: [ this.client.idTipoDocumento ],
      telefonoCodigoArea:[ this.client.telefonoCodigoArea ],
      numeroLocal:[ this.client.numeroLocal ],
      domicilio:[ this.client.domicilio || 'sin definir'],
      localidad:[ this.client.localidad || 'sin definir'],
      provincia:[ this.client.provincia || 'sin definir'],
      pais:[ this.client.pais || 'sin definir'],
      codigoPostal:[ this.client.codigoPostal || 'sin definir'],
      nroDocumento:[ this.client.nroDocumento || 'sin definir'],
  
    });          
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
  
  getSalePoint(){

    
    this.orderService.getSalePoint().subscribe(
      ({pos})=>{
          if(pos.length !== 0){
            this.salePoint = pos;
          }
      })

  }

  getCondicionesiva(){

    this.orderService.condicionesIva().subscribe(
      ({condiciones})=>{
          if(condiciones.length !== 0){
               this.ivaOption = condiciones;
          }
      })

  }

  getDniOption(){

    this.orderService.getDniOption().subscribe(
      ({tipos})=>{
          if(tipos.length !== 0){
               this.dniOption = tipos;
          }
      })

  }
  

  onSaveForm(){

    console.log(this.myForm.value);
    

    // this.authService.updateClientById(this.myForm.value, "2739").subscribe(
    //   (res)=>{
    //     console.log(res);
    //   })

  }

  closeComponent(){
    this.dialogRef.close();
  }

}
