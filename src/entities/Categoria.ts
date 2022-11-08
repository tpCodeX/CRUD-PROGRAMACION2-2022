import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Producto } from "./Producto";

@Entity("categorias")
class Categoria {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @OneToMany( () => Producto, producto => producto.categoria)
  
  productos: Producto [];

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

export { Categoria };