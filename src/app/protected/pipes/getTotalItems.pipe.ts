

import { Pipe, PipeTransform } from '@angular/core';
import { Pedido } from '../interfaces/orders-posted';

@Pipe({
    name: "total"
})

export class GetTotalItems implements PipeTransform {

      transform( arrOrders: any) {
        let total : number = 0;

        // console.log(arrOrders);

        // arrOrders.map( (element) => {element.detalleItems.forEach( (item:any) =>{total += item.importeNetoTotal } ) });
        // return total
    }

    // transform( arrOrders:  Pedido[]) {
    //     let total : number = 0;

    //     arrOrders.map( (element) => {element.detalleItems.forEach( (item:any) =>{total += item.importeNetoTotal } ) });
    //     return total
    // }
}















