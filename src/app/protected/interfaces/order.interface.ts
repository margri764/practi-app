export interface Order {
    idAgenda: number;
    estado: string;
    ptoVenta: number;
    descuentoPorcentaje: number;
    detalleItems: DetalleItem[];
  }
  
export interface DetalleItem {
    codigoInterno: string;
    cantidad: number;
    bonificacionPorciento: number;
  }
  