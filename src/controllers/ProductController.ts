import { Request, Response } from "express";
import { CategoriaService } from "../services/CategoriaServices";
import ProductServices from "../services/ProductServices";

class ProductController {
  private service:ProductServices;
  public categoriaService:CategoriaService;
  constructor(){
    this.service=new ProductServices();
    this.categoriaService= new CategoriaService();
  }
  async handleCreateProduct(request: Request, response: Response) {
    const { nombreProducto,descripcion,precio,categoria} = request.body;

    try {
      await this.service.create({
        nombreProducto,
        descripcion,
        precio,
        categoria
        }).then(() => {
        response.render("./productos/message", {
          message: "Producto registrado con éxito."
        });
      });
    } catch (err) {
      response.render("./productos/message", {
        message: `Error al registrar producto: ${err.message}`
      });
    }

  }

  async handleSearchProduct(request: Request, response: Response) {
    let { search } = request.query; //Recupera la busqueda de la URL
    search = search.toString(); //Formatea la busqueda a String.


    try { //implementa los metodos del servicio.
      const products = await this.service.search(search);
      response.render("./productos/search", {
        products: products,
        search: search
      });
    } catch (err) {
      response.render("./productos/message", {
        message: `Error al buscar producto: ${err.message}`
      });
    }
  }

  async handleGetProductData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();
    const listCategoriasService = new CategoriaService();
    const categorias = await listCategoriasService.list();

    const product = await this.service.getData(id);

    return response.render("./productos/edit", {
      product: product,
      listaCategorias:categorias
    });
  }

  async handleUpdateProductData(request: Request, response: Response) {
    const { id, nombreProducto,descripcion,precio,categoria } = request.body;

    
    try {
      await this.service.update({ id, nombreProducto,descripcion,precio,categoria }).then(() => {
        response.render("./productos/message", {
          message: "Producto actualizado con éxito."
        });
      });
    } catch (err) {
      response.render("./productos/message", {
        message: `Error al actualizar producto: ${err.message}`
      });
    }

  }

  async handleDeleteProduct(request: Request, response: Response) {
    let id=request.body.id
    id=id.toString();

    try {
      await this.service.delete(id).then(() => {
        response.render("./productos/message", {
          message: "Producto eliminado exitosamente."
        });
      });
    } catch (err) {
      response.render("./productos/message", {
        message: `Error al eliminar producto: ${err.message}`
      });
    }
  }
  async getCategoria(req:Request,res:Response){
    const listCategoriasService = new CategoriaService();
    const categorias = await listCategoriasService.list();
    const coso="coso";
    return res.render("./productos/add",{
      listaCategorias:categorias,
      coso:coso,
    })
  }


  async handleListProducts(request: Request, response: Response) {
    const productos = await this.service.list();

    return response.render("./productos/list", {
      products: productos
    });
  }


}

export default ProductController;