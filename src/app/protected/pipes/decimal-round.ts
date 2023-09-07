
import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'rounds'
})
export class DecimalRound implements PipeTransform {
 
  constructor(

  ) {
  }
 
  transform( value: number) : any {
    console.log(value); 
    let valueRound;
    valueRound = Math.round(value);
    return valueRound;
}
}