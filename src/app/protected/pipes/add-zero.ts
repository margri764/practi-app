

import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'addZero'
})
export class AddZero implements PipeTransform {
 
  constructor(

  ) {
  }
 
  transform( hour: number) : any  {

    if(hour < 10){
        let tempHour = hour;
        tempHour.toString();
        return `0${tempHour}`
    }
    return hour;
}
}