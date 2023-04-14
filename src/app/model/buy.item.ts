import { Item } from "./item";

export interface BuyItem {
    
    id?:            string;
    item:           Item;
    fechaRegistro:  string;
    precio:         number;
    cantidad:       number;
    precioUnidad:   number;
}