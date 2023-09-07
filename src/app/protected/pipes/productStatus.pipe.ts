
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productStatus'
})
export class ProductStatusPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value === true) {
        return 'Activo';
      } else {
        return 'Inactivo';
      }
 
  }
}