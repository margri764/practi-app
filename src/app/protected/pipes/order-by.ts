
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { OrdersService } from '../../services/orders/orders.service';

@Pipe({
    name: "priority"
})

export class OrderBy implements PipeTransform {


    constructor( 
                private orderService : OrdersService
                )
    {

    }

    transform( orders : any [], orderBy : string ='')  {

          orders = [...orders];
          let lastOrder =  orders;

        switch( orderBy) {

            case 'POR FECHA': 
                                var mapped = orders.map( (element, i) => {element.statusOrder.map( (item:any, ind:any) =>{ element = (item.createdAt);})
                                return { index: i, value: element };
                                })
                            
                                mapped.sort( (a, b) =>{
                                    if (a.value > b.value) {
                                    return -1;
                                    }
                                    if (a.value < b.value) {
                                    return 1;
                                    }
                                    return 0;
                                    
                                });
                                var result = mapped.map((element) => {
                                    return orders[element.index];
                                });
                                // this.store.dispatch(orderActions.setStaffOrderBy( {orderBy: result}))

                                return result


            case 'SIN PROCESAR':
                             
                               var mapped = orders.map( (element, i) => {element.statusOrder.map( (item:any, ind:any) =>{ element = (item.status == "SIN PROCESAR");})
                               return { index: i, value: element };
                               })
                           
                               mapped.sort( (a, b) =>{
                                   if (a.value > b.value) {
                                   return -1;
                                   }
                                   if (a.value < b.value) {
                                   return 1;
                                   }
                                   return 0;
                                   
                                 });
                               var result = mapped.map((element) => {
                                   return orders[element.index];
                               });

                               return result


            case 'EN PROCESO':
                
                                //el segundo map es para ir mas adentro en el array, donde se encuentra el array de objetos
                                //el primer element es q hace q entre mas profundo....como en el *ngFor con los nested json
                                var mapped = orders.map( (element, i) => { element.statusOrder.map( (item:any, ind:any) =>{ element = (item.status=="EN PROCESO")})
                                return { index: i, value: element };
                            })
                            
                            // filtro por las ordenes q tengan el estado q necesito, sino hay nada devuelvo la ultima busqueda 
                            var tempArray;
                            tempArray = mapped.filter( item => item.value === true )
                            if(tempArray.length == 0){
                                this.orderService.setShowNoOrdersMessage(true);
                                return lastOrder
                            };
                            // ordenando el array mapeado que contiene los valores reducidos
                            mapped.sort( (a, b) =>{

                         
                                if (a.value > b.value) {
                                return -1;
                                }
                                if (a.value < b.value) {
                                return 1;
                                }
                                return 0;
                            });
                            // contenedor para el orden resultante
                            var result = mapped.map((element) => {
                                return orders[element.index];
                            });
                         
                                return result
                        
            case 'ORDEN LISTA':
                                var mapped = orders.map( (element, i) => {element.statusOrder.map( (item:any, ind:any) =>{ element = (item.status == "ORDEN LISTA");})
                                return { index: i, value: element };
                                })
                              
                            
                                var tempArray;
                                tempArray = mapped.filter( item => item.value === true )
                                if(tempArray.length == 0){
                                    this.orderService.setShowNoOrdersMessage(true);
                                    return lastOrder
                                };

                                mapped.sort( (a, b) =>{
                                    if (a.value > b.value) {
                                    return -1;
                                    }
                                    if (a.value < b.value) {
                                    return 1;
                                    }
                                    return 0;
                                    
                                });
                                var result = mapped.map((element) => {
                                    return orders[element.index];
                                });
                            
                                return result

                
            case 'ENTREGA DELIVERY':
         
                                var mapped = orders.map( (element, i) => {element.statusOrder.map( (item:any, ind:any) =>{ element = (item.status == "ENTREGA DELIVERY");})
                                return { index: i, value: element };
                                })

                                var tempArray;
                                tempArray = mapped.filter( item => item.value === true )
                                if(tempArray.length == 0){
                                    this.orderService.setShowNoOrdersMessage(true);
                                    return lastOrder
                                };

                                mapped.sort( (a, b) =>{
                                    if (a.value > b.value) {
                                    return -1;
                                    }
                                    if (a.value < b.value) {
                                    return 1;
                                    }
                                    return 0;
                                });
                                
                                var result = mapped.map((element) => {
                                    return orders[element.index];
                                });
                                return result
            
            case 'ENTREGA EN LOCAL':
                                     var mapped = orders.map( (element, i) => {element.statusOrder.map( (item:any, ind:any) =>{ element = (item.status == "ENTREGA EN LOCAL");})
                                     return { index: i, value: element };
                                     })
                                     var tempArray;
                                     tempArray = mapped.filter( item => item.value === true )
                                     if(tempArray.length == 0){
                                        this.orderService.setShowNoOrdersMessage(true);
                                         return lastOrder
                                     };
                                 
                                     mapped.sort( (a, b) =>{
                                         if (a.value > b.value) {
                                         return -1;
                                         }
                                         if (a.value < b.value) {
                                         return 1;
                                         }
                                         return 0;

                                       });
                                     var result = mapped.map((element) => {
                                         return orders[element.index];
                                     });
                                 
                            //    this.store.dispatch(orderActions.setStaffOrderBy( {orderBy: result}))

                                     return result

            
            case 'COMPLETADO':
                              var mapped = orders.map( (element, i) => {element.statusOrder.map( (item:any, ind:any) =>{ element = (item.status == "COMPLETADO");})
                              return { index: i, value: element };
                              })

                              var tempArray;
                              tempArray = mapped.filter( item => item.value === true )
                              if(tempArray.length == 0){
                                  this.orderService.setShowNoOrdersMessage(true);
                                  return lastOrder
                              };
                          
                              mapped.sort( (a, b) =>{
                                  if (a.value > b.value) {
                                  return -1;
                                  }
                                  if (a.value < b.value) {
                                  return 1;
                                  }
                                  return 0;
                                  
                                });
                              var result = mapped.map((element) => {
                                  return orders[element.index];
                              });
                          
                            //   this.store.dispatch(orderActions.setStaffOrderBy( {orderBy: result}))

                              return result

                
            case 'ELIMINADO':
                            var mapped = orders.map( (element, i) => {element.statusOrder.map( (item:any, ind:any) =>{ element = (item.status == "ELIMINADO");})
                            return { index: i, value: element };
                            })

                            var tempArray;
                            tempArray = mapped.filter( item => item.value === true )
                            if(tempArray.length == 0){
                                this.orderService.setShowNoOrdersMessage(true);
                                return lastOrder
                            };
                        
                            mapped.sort( (a, b) =>{
                                if (a.value > b.value) {
                                return -1;
                                }
                                if (a.value < b.value) {
                                return 1;
                                }
                                return 0;
                                
                            });
                            var result = mapped.map((element) => {
                                return orders[element.index];
                            });
                        
                            // this.store.dispatch(orderActions.setStaffOrderBy( {orderBy: result}))

                            return result

            
            default:
                    
                    var mapped = orders.map( (element, i) => {element.statusOrder.map( (item:any, ind:any) =>{ element = (item.status == "SIN PROCESAR");})
                    return { index: i, value: element };
                    })
                
                    mapped.sort( (a, b) =>{
                        if (a.value > b.value) {
                        return -1;
                        }
                        if (a.value < b.value) {
                        return 1;
                        }
                        return 0;
                        
                      });
                    var result = mapped.map((element) => {
                        return orders[element.index];
                    });

                    return result
            }
    }
   

}