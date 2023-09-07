import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'round'
})
export class PriceRound implements PipeTransform {
 
  constructor(

  ) {
  }
 
  transform( value: number) : any {
    
 
    let valueRound;
    valueRound = Math.round(value);
    return valueRound;
}
}