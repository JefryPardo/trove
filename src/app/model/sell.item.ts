import { Item } from "./item";

export interface SellItem {
    
    id?:            number;
    item:           Item;
    fechaRegistro:  string;
    precio:         number;
    cantidad:       number;
    precioUnidad:   number;
}