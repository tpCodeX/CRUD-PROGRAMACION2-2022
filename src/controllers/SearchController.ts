import { Request, Response } from "express";
import ProductServices from "../services/ProductServices";
import UserService from "../services/UserServices";

const productServices=new ProductServices();
const userServices=new UserService();

class SearchController{
  async handleSearch(request: Request, response: Response) {
    let { search } = request.query; //Recupera la busqueda de la URL
    search = search.toString(); //Formatea la busqueda a String.
    try { //implementa los servicios.
      const products = await productServices.search(search); //Espera array de products:Productos[] (array de objetos) 
      const users = await userServices.search(search) //Espera array de users:Usuarios[] (array de usuarios)
      response.render("./search",{
        search: search,
        users: users,
        products:products
      })
    } catch (err) {
      response.render("./productos/message", {
        message: `Error al buscar el registro solicitado: ${err.message}`
      });
    }
  }
}

export default SearchController;