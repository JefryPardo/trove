import { Item } from "./item";

export interface BuyItem {
    
    id?:            number;
    item:           Item;
    fechaRegistro:  string;
    precio:         number;
    cantidad:       number;
    precioUnidad:   number;
}