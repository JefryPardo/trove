import { Item } from "./item";

export interface Flipping {
    id?: string;
    item: Item;
    precio: number;
    cantidad: number;
    fecha: string;
}