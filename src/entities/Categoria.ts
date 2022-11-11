import { Column,Entity, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Producto } from "./Producto";

@Entity("categorias")
class Categoria{

    @PrimaryColumn()
    id?:string

    @Column()
  nombre: string;

  @OneToMany( () => Producto, producto => producto.categorias)
  productos: Producto[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export default Categoria;