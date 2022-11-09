import { request, response, Router } from "express";
import UserController from "./controllers/UserController";
import ProductController from "./controllers/ProductController";
import SearchController from "./controllers/SearchController";
import AppUserController from "./controllers/AppUserController";
const router = Router();
const searchController = new SearchController();
const productController = new ProductController();
const userController = new UserController();
const appUserController = new AppUserController();

/* router.use((req,res,next)=>{
  console.log(`
  Se realizó una solicitud de tipo
      👉 ${req.method}
      desde "${req.originalUrl}"
  `);
  next()
}); */


router.get("/",(request,response)=>{
  response.render("./index")
});


// Rutas de Registro
router.get('/registro',(request,response)=>{
  response.render('./registro')
});
router.post('/registrar',appUserController.registrarUsuario.bind(appUserController));



//Search Service
router.get("/search",searchController.handleSearch.bind(searchController));

//User Services
// router.get("/usuarios/search", userController.handleSearchUser.bind(userController));
router.get("/usuarios", userController.handleListUsers.bind(userController));
router.get("/usuarios/add", (request, response) => {
  response.render("usuarios/add");
});
router.get("/usuarios/edit", userController.handleGetUserData.bind(userController));
router.post("/usuarios/add-user", userController.handleCreateUser.bind(userController));
router.post("/usuarios/edit-user", userController.handleUpdateUserData.bind(userController));
router.post("/usuarios/delete-user", userController.handleDeleteUser.bind(userController));

//Product Services
// router.get("/productos/searchProducts", productController.handleSearchProduct.bind(productController));
router.get("/productos", productController.handleListProducts.bind(productController));
router.get("/productos/add", //Pasar por Controller que entregue la categoría xd
});
router.get("/productos/edit", productController.handleGetProductData.bind(productController));

router.post("/productos/add-product", productController.handleCreateProduct.bind(productController));
router.post("/productos/delete", productController.handleDeleteProduct.bind(productController));
router.post("/productos/edit-product", productController.handleUpdateProductData.bind(productController));


//Categoria Services
router.get("/categorias", productController.handleListProducts.bind(productController));
router.get("/categorias/add", //Pasar por Controller que entregue la categoría xd
});
router.get("/categorias/edit", productController.handleGetProductData.bind(productController));

router.post("/categorias/add-categoria", productController.handleCreateProduct.bind(productController));
router.post("/categorias/delete", productController.handleDeleteProduct.bind(productController));
router.post("/categorias/edit-categoria", productController.handleUpdateProductData.bind(productController));




export { router };

