import { Item } from "./item";

export interface Flipping {
    id?: string;
    item: Item;
    precioUnidad: number;
    precioTotal: number;
    cantidad: number;
    fecha: string;
}