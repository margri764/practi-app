import { ProductDB } from "../models/product-db.models";


/* a partir de los arreglos de productos q vienen del back, creo nuevos arreglos, unos con stock en true para poder editarlos
 en el dashboard y otros en flase para llenar la tabla de los productos pausados */

export class StaffArrayProduct {

burger  : ProductDB[] =[];
drink   : ProductDB[] =[];
fries   : ProductDB[] =[];
pizza   : ProductDB[] =[];
vegan   : ProductDB[]=[];
healthy : ProductDB[] = [];
offer   : ProductDB[] = [];


constructor( 
                burger  : ProductDB[] = [],
                drink   : ProductDB[] = [],
                fries   : ProductDB[] = [],
                vegan   : ProductDB[] = [],
                healthy : ProductDB[] = [],
                pizza   : ProductDB[] = [],
                offer   : ProductDB[] = []
            
            )
{
            this.burger  = burger;
            this.drink   = drink;
            this.fries   = fries;
            this.vegan   = vegan;
            this.healthy = healthy;
            this.pizza   = pizza;
            this.offer   = offer;
}

getStockProduct(){
    return { burger: this.burger, drink: this.drink, fries: this.fries, vegan: this.vegan, healthy: this.healthy, pizza: this.pizza, offer: this.offer }

    // filtro los productos para q solo muestre los q tienen stock
    // const  burger  = this.burger.filter(product => product.stock);
    // const  drink  = this.drink.filter( product => product.stock);
    // const  fries  = this.fries.filter( product => product.stock);
    // const  vegan  = this.pizza.filter( product => product.stock);
    // const  healthy  = this.vegan.filter( product => product.stock);
    // const  pizza  = this.healthy.filter( product => product.stock);
    // const  offer  = this.offer.filter( product => product.stock);
    // return { burger, drink, fries, vegan, healthy, pizza, offer  }
}

}