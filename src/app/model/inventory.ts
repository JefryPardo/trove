import { Item } from "./item";

export interface Inventory {
    id?: number;
    item: Item;
    unidades: string;
    stock_maximo: string;
}