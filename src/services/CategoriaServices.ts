import { getCustomRepository } from "typeorm";
import { Categoria } from "../entities/Categoria";
import { CategoriaRepository } from "../repositories/CategoriaRepository";
import ICategoria from "../interfaces/iCategoria";

//Crear Clase para aprovechar los servicios deseados en forma de métodos de una clase.
class CategoriaServices{
    //Este método recibira el nombre de la categoría enviado por 
    async addCategoria({nombre}:ICategoria) {
        if (!nombre){//verifica si tiene nombre e informa un error en caso de no tenerlo.
            throw new Error('Por favor seleccione un nombre para la categoría');
        }
        //cargar el repo de categoría para realizar acciones sobre la tabla
        const categoriaRepository = getCustomRepository(CategoriaRepository);
        const categoriaExiste=await categoriaRepository.findOne({nombre});
        if (categoriaExiste){//verifica si existe el valor seleccionado.
            throw new Error(`La categoría "${nombre}" ya se encuentra registrada.`);//si existe lo informa
        };

        const categoria=new Categoria(); //Instancia la entidad
        categoria.nombre=nombre //Asigna los valores correspondientes a 

        await categoriaRepository.save(categoria);
        return categoria;
    
    };

    async delCategoria(id:string){
        const categoriaRepository = getCustomRepository(CategoriaRepository);
        
        const categoria= await categoriaRepository
        .createQueryBuilder()
        .delete()
            .from(Categoria)
            .where("id=:id",{id})
            .execute()
            return categoria;
        };
        
    async infoCategoria(id:string) {
            const categoriaRepository = getCustomRepository(CategoriaRepository);
            const categoria = await categoriaRepository.findOne(id);
            return categoria;
        };
        
    async listCategorias(){
            const categoriaRepository = getCustomRepository(CategoriaRepository);
            const categorias =await categoriaRepository.find();
            return categorias;
        };
        
    async searchCategorias(search:string) {
        if (!search){
        throw new Error ("Error: Campo de busqueda vacío. Por favor completelo.")
        };
        const categoriaRepository = getCustomRepository(CategoriaRepository);
        const categoria = await categoriaRepository
        .createQueryBuilder()
        .where("nombre like :search",{search: `%${search}%`})
        .getMany()

        return categoria;
   };

  async editCategoria({id,nombre}){
    const categoriaRepository=getCustomRepository(CategoriaRepository);
    
    const categoria = await categoriaRepository
        .createQueryBuilder()
        .update(Categoria)
        .set(nombre)
        .where("id=:id",{id})
        .execute()

    return categoria;

  }
}
export default CategoriaServices;