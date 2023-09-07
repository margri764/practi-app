
export interface PriceList {
    activa: number;
    descuentoDefault: number;
    id: number;
    nombreLista: string;
    papelera: number;
    predeterminada: number;
    utilidadDefault: number;
  }
  

  export interface articlePrice {
    cantidadStock: number;
    codigoInterno: string;
    descLarga: string;
    fechaAlta: string;
    fechaModificacion: string;
    fechaVerificacion: string | null;
    idListaPrecio: number;
    iva: number;
    precioBrutoFinal: number;
    precioNetoFinal: number;
  }
  