
export class User {

    constructor(
            public archivarComo: string ,
            public nombre: string ,
            public apellido: string ,
            public domicilio: string ,
            public localidad: string ,
            public codigoPostal: string ,
            public provincia: string ,
            public pais: string ,
            public telefonoCodigoPais: string ,
            public telefonoCodigoArea: string ,
            public esMovil: number,
            public numeroLocal: string ,
            public extensionTelefono: string ,
            public descripcionTelefono: string ,
            public email1: string ,
            public email2: string ,
            public email3: string ,
            public email4: string ,
            public emailAnotacion: string ,
            public emailEnvioComprobantes: number,
            public organizacion: string ,
            public razonSocial: string ,
            public cuit: string ,
            public nroDocumento: string ,
            public idCondicionIva: number,
            public esCliente: number,
            public esProveedor: number,
            public esContacto: number,
            public observaciones: string ,
            public id: number,
            public permisos : number [],
        )
        {}
  
  }