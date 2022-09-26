import { request, response, Router } from "express";
import UserController from "./controllers/UserController";
import ProductController from "./controllers/ProductController";
import SearchController from "./controllers/SearchController";
const router = Router();
const searchController = new SearchController();
const productController = new ProductController();
const userController = new UserController();

router.use((req,res,next)=>{
  console.log(`
  Se realizó una solicitud de tipo
      👉 ${req.method}
      desde "${req.originalUrl}"
  `);
  next()
});

router.get("/",(request,response)=>{
  response.render("./index")
})
//Search Service
router.get("/search",searchController.handleSearch.bind(searchController));

//User Services
router.get("/usuarios", userController.handleListUsers.bind(userController));
router.get("/usuarios/add", (request, response) => {
  response.render("usuarios/add");
});
router.get("/usuarios/search", userController.handleSearchUser.bind(userController));
router.get("/usuarios/edit", userController.handleGetUserData.bind(userController));
router.post("/usuarios/add-user", userController.handleCreateUser.bind(userController));
router.post("/usuarios/edit-user", userController.handleUpdateUserData.bind(userController));
router.post("/usuarios/delete-user", userController.handleDeleteUser.bind(userController));

//Product Services
router.get("/productos", productController.handleListProducts.bind(productController));
router.get("/productos/add", (request, response) => {
  response.render("productos/add");
});
router.get("/productos/searchProducts", productController.handleSearchProduct.bind(productController));
router.get("/productos/edit", productController.handleGetProductData.bind(productController));

router.post("/productos/add-product", productController.handleCreateProduct.bind(productController));
router.post("/productos/delete-product", productController.handleDeleteProduct.bind(productController));
router.post("/productos/edit-product", productController.handleUpdateProductData.bind(productController));




export { router };

