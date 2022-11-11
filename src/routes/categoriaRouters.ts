import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";
const categoriaController=new CategoriaController();
const routerCat=Router();

routerCat.get("/",categoriaController.listhandle.bind(categoriaController));
routerCat.get("/add",(request,response)=>{
  response.render("./categorias/add")
});
routerCat.get("/search",categoriaController.searchhandle.bind(categoriaController));
routerCat.get("/edit",categoriaController.getdatahandle.bind(categoriaController));



routerCat.post("/add-categoria",categoriaController.createhandle.bind(categoriaController));
routerCat.post("/edit-categoria",categoriaController.updatehandle.bind(categoriaController));
routerCat.post("/delete",categoriaController.deletehandle.bind(categoriaController));

export default routerCat;