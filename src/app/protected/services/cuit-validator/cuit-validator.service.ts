import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CuitValidatorService {

  constructor() { }

    verifyCuit (cuit : any) {

    if(cuit === '' || cuit === null){
      return true
    }  

    if (cuit.length !== 11) {
      return false;
    }

  
    let acumulado = 0;
    let digitos = cuit.split('');
    let digito = parseInt(digitos.pop());
  
    for (let i = 0; i < digitos.length; i++) {
      acumulado += digitos[9 - i] * (2 + (i % 6));
    }
  
    let verif = 11 - (acumulado % 11);
    if (verif === 11) {
      verif = 0;
    } else if (verif === 10) {
      verif = 9;
    }
    console.log(digito === verif);
  
    return digito === verif;
  };
  
}