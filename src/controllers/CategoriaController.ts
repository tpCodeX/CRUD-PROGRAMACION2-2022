import { request, Request,Response } from "express";
import CategoriaServices from "../services/CategoriaServices";

class CategoriaController{
    private service:CategoriaServices;
    constructor(){
        this.service=new CategoriaServices();
    }


    async handleAddCategoria(request:Request,response:Response) {
        const {nombre} = request.body

        try{
            await this.service.addCategoria({nombre}).then(()=>{
                response.render("./categorias/message",{message: "Categoría creada exitosamente."});
            });
        }
        catch(err){
            response.render("./categorias/message",{message:`ERROR: ${err.message}`});
        };
        
    };

    async handleDelCategoria(request:Request,response:Response){
        const {id}=request.body;
        try{
            await this.service.delCategoria(id).then(()=>{
                response.render("./categorias/message",{message:"Categoría eliminada exitosamente."});

            });

        }
        catch(err){
            response.render("./categorias/message", {
                message: `ERROR: ${err.message}`,
              });
        };
    }

    async handleInfoCategoria(request:Request,response:Response){
        let {id}=request.query;
            id=id.toString();
            const categoria = await this.service.infoCategoria(id);
            return response.render("./categorias/edit",{categoria});
    }

    async handleListCategoria(request:Request,response:Response){
         const categorias = await this.service.listCategorias();
         return response.render("./categorias",{categorias});
    };

    async handleSearchCategoria(request:Request,response:Response){
        let {search}=request.query;
        search=search.toString();

        try{
            const categorias= await this.service.searchCategorias(search);
            response.render("./categorias/search",{categorias,search});
        }catch(err){
            response.render("./categorias/message",{message:`ERROR: ${err.message}`});
        };
    };

    async handleEditCategoria(request:Request,response:Response){
       const {id,nombre}=request.body
       try{ 
       await this.service.editCategoria({id,nombre}).then(()=>{
        response.render("./categorias/message",{message:"Categoría editada exitosamente."});
       });
       }catch(err){
        response.render("./categorias/message",{message:`ERROR: ${err.message}`});
        };
    }

}

export default CategoriaController;