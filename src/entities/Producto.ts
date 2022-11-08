import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Categoria } from "./Categoria";

@Entity("productos")
class Producto {

  @PrimaryColumn()
  id: string;

  @Column()
  nombreProducto: string;

  @Column()
  precio: number;
  
  @Column()
  descripcion: string;

  @ManyToOne(() => Categoria, categoria => categoria.productos)
  @JoinColumn({name:'categoriaId'})
  categoria: Categoria;

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