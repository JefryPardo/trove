import { Item } from "./item";

export interface Inventory {
    id?: string;
    item: Item;
    unidades: number;
    stock_maximo: number;
}