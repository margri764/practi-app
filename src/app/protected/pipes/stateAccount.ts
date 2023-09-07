import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'state'
})
export class StateAccount implements PipeTransform {
 
  constructor(

  ) {
  }
 
  transform( state: boolean) : string {
    
    if(state){
        return "ACTIVO"
    }else{
        return "ELIMINADO"

    }
}
}