import { Categoria } from "../entities/Categoria";

interface IProducto {
    id?:string;
    nombreProducto: string;
    descripcion: string;
    precio: number;
    categoria?:Categoria;
    }

export default IProducto;