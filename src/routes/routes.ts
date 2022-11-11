import { request, response, Router } from "express";
import SearchController from "../controllers/SearchController";
import Helper from "../lib/helpers";
const helpers=new Helper;
const router = Router();


router.get("/",helpers.estaLogueado,(request,response)=>{
  response.render("./index")
});

export { router };
/* 
const searchController = new SearchController();
router.get("/search",searchController.handleSearch.bind(searchController)); */



/* router.use((req,res,next)=>{
  console.log(`
  Se realizó una solicitud de tipo
      👉 ${req.method}
      desde "${req.originalUrl}"
  `);
  next()
}); */
//Rutas de Cuentas
/* router.get("/login",(request,response)=>{
  response.render("./login");
});
router.get("/registrarse",(request,response)=>{
  response.render("./registrarse");
});
router.post("/registrarse",cuentaController.handleCreateCuenta)

 */
//Search Service

//Rutas Usuario
/* router.get("/usuarios", userController.handleListUsers.bind(userController));
router.get("/usuarios/add", (request, response) => {
  response.render("usuarios/add");
});
router.get("/usuarios/search", userController.handleSearchUser.bind(userController));
router.get("/usuarios/edit", userController.handleGetUserData.bind(userController));
router.post("/usuarios/add-user", userController.handleCreateUser.bind(userController));
router.post("/usuarios/edit-user", userController.handleUpdateUserData.bind(userController));
router.post("/usuarios/delete-user", userController.handleDeleteUser.bind(userController)); */

//Rutas Producto
/* router.get("/productos", productController.handleListProducts.bind(productController));
router.get("/productos/add",productController.getCategoria.bind(productController));
router.get("/productos/searchProducts", productController.handleSearchProduct.bind(productController));
router.get("/productos/edit", productController.handleGetProductData.bind(productController));

router.post("/productos/add-product", productController.handleCreateProduct.bind(productController));
router.post("/productos/delete", productController.handleDeleteProduct.bind(productController));
router.post("/productos/edit-product", productController.handleUpdateProductData.bind(productController)); */

//Rutas Categoria
/* router.get("/categorias",categoriaController.listhandle.bind(categoriaController));
router.get("/categorias/add",(request,response)=>{
  response.render("./categorias/add")
});
router.get("/categorias/search",categoriaController.searchhandle.bind(categoriaController));
router.get("/categorias/edit",categoriaController.getdatahandle.bind(categoriaController));



router.post("/categorias/add-categoria",categoriaController.createhandle.bind(categoriaController));
router.post("/categorias/edit-categoria",categoriaController.updatehandle.bind(categoriaController));
router.post("/categorias/delete",categoriaController.deletehandle.bind(categoriaController)); */


