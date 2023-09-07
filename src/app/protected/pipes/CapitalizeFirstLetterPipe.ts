

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    let valueLower = value.toLowerCase();
    return valueLower.charAt(0).toUpperCase() + valueLower.slice(1);
  }
}