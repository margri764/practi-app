

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalRound'
})
export class TwoDecimalPipe implements PipeTransform {

  transform(value: number): number {
    console.log(value);
    const decimalPart = value - Math.floor(value); // Obtener la parte decimal

    if (decimalPart === 0) {
      console.log(decimalPart);
      return parseFloat(value.toFixed(2)) + 0.00; // Agregar dos ceros si no hay decimales
    } else if (decimalPart === 0.1) {
      return parseFloat(value.toFixed(2)) + 0.0; // Agregar un cero si hay un solo decimal
    } else {
      return parseFloat(value.toFixed(2)); // Mantener dos decimales si ya los tiene
    }
  }
}
