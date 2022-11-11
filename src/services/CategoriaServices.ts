import { getCustomRepository } from "typeorm";
import Categoria from "../entities/Categoria";
import ICategoria from "../interfaces/ICategoria";
import { CategoriasRepository } from "../repositories/CategoriasRepository";




class CategoriaService{
    static create: any;
    async create({nombre }: ICategoria) {
      if (!nombre ) {
        throw new Error("Por favor rellene todos los campos");
      }
      const categoriasRepository = getCustomRepository(CategoriasRepository);
      const idCategoriaAlreadyExists = await categoriasRepository.findOne({ nombre });
      if (idCategoriaAlreadyExists) {
        throw new Error("id producto ya esta registrado");
      }
      const idcategoriaAlreadyExists = await categoriasRepository.findOne(nombre);
        const categoria = new Categoria();
        categoria.nombre = nombre
        await categoriasRepository.save(categoria)
        return categoria;
    }
  
    async delete(id: string) {
      const categoriasRepository = getCustomRepository(CategoriasRepository);
  
      const categoria = await categoriasRepository
        .createQueryBuilder()
        .delete()
        .from(Categoria)
        .where("id = :id", { id })
        .execute();
      
      return categoria;
  
  
    }
  
    async getData(id: string) {
      const categoriasRepository = getCustomRepository(CategoriasRepository);
  
      const producto = await categoriasRepository.findOne(id);
  
      return producto;
    }
  
    async list() {
      const categoriasRepository = getCustomRepository(CategoriasRepository);
  
      const categoria = await categoriasRepository.find()
  
      return categoria;
    }
  
  
    async search(search: string) {
      if (!search) {
        throw new Error("Por favor complete el campo de búsqueda");
      }
  
      const categoriasRepository = getCustomRepository(CategoriasRepository);
  
      const categoria = await categoriasRepository
        .createQueryBuilder()
        .where("nombre like :search", { search: `%${search}%` })
        .getMany();
  
      return categoria;
  
    }
  
    async update({ id, nombre }: ICategoria) {
      const categoriasRepository = getCustomRepository(CategoriasRepository)
      
      const categoria = await categoriasRepository
        .createQueryBuilder()
        .update(Categoria)
        .set({ nombre })
        .where("id = :id", { id })
        .execute();
  
  
      return categoria;
  
    }
  }
  
  
  
  
  export {CategoriaService};