
import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'splitEmail'
})
export class SplitEmail implements PipeTransform {
 
  constructor(

  ) {
  }
 
  transform( email: string) {

    if(email != '' && email != undefined && email != null){
        let splitEmail = email.split('@');
        email = splitEmail[0]
    }
    return  email;
    
}
}