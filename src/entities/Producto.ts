import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
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

  @ManyToOne(()=>Categoria, categoria =>categoria.productos)
  @JoinColumn({name:'categoria'})
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