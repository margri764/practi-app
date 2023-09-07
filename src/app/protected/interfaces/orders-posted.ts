interface DetalleItem {
    descripcion: string;
    codigoInterno: string;
    cantidad: number;
    alicIvaPorciento: number;
    impNetoUnidad: number;
    impSubtotal: number;
    bonificacionPorciento: number;
    bonificacionImpNetoUni: number;
    bonificacionImpNetoTot: number;
    importeNetoTotal: number;
    importeIva: number;
    impTotal: number;
}

export interface Pedido {
    idPedido: number;
    estado: string;
    idAgenda: number;
    razonSocial: string;
    domicilio: string;
    localidad: string;
    provincia: string;
    cp: string;
    pais: string;
    cuit: number;
    docNro: string;
    ptoVenta: number;
    cbteNro: number;
    fecha: string;
    impSubtotal: number;
    descuentoPorcentaje: number;
    impDescuento: number;
    impTotIva: number;
    impTotal: number;
    detalleItems: DetalleItem[];
}