import CategoriaController from "../controllers/CategoriaController";
import { Router } from "express";

export const routerCategoria = Router();

const categoriaController = new CategoriaController();


routerCategoria.get("/",categoriaController.handleListCategoria);

routerCategoria.get("/add", (request, response) => {
  response.render("addcategoria");
});

routerCategoria.post("/categorias/add", categoriaController.handleAddCategoria.bind(categoriaController));

routerCategoria.get("/categorias/search", categoriaController.handleSearchCategoria.bind(categoriaController));

routerCategoria.get("/categorias/edit", categoriaController.handleInfoCategoria.bind(categoriaController));

routerCategoria.post("/categorias/edit", categoriaController.handleEditCategoria.bind(categoriaController));

routerCategoria.post("/categorias/delete", categoriaController.handleDelCategoria.bind(categoriaController));