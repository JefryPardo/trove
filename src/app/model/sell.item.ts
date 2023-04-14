import { Item } from "./item";

export interface SellItem {
    
    id?:            string;
    item:           Item;
    fechaRegistro:  string;
    precio:         number;
    cantidad:       number;
    precioUnidad:   number;
}