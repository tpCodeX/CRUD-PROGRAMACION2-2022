import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("appUsers")
class AppUser {

  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  fechaCreacion: Date;
  
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export {AppUser};