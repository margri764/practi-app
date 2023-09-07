
import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'textcolor'
})
export class TextColor implements PipeTransform {
 
  constructor(

  ) {
  }
 
  transform(text: string) : any {
    
    switch (text) {
      case "INGRESADO":
                      return {'color':'orange'};
                  // return text.toLowerCase();
      
        default:
          break;
      }

  }
 
}