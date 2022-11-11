import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import Categoria from "./Categoria";


@Entity("productos")
class Producto {

  @PrimaryColumn()
  id: string;

  @Column()
  nombreProducto: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @ManyToMany(()=>Categoria, categoria =>categoria.productos)
  categorias:Categoria

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaModificacion: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Producto };