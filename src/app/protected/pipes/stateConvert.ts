


import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'state'
})
export class State implements PipeTransform {
 
  constructor(

  ) {
  }
 
  transform( state : boolean) : any {
    let stateConvert;
      (state) ? stateConvert = "Activo" : stateConvert = "Pausado"
    return stateConvert;
}
}