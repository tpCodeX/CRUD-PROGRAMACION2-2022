import { response, Router } from "express";
import UserController from "./controllers/UserController";
import ProductController from "./controllers/ProductController";

const router = Router();

const userController = new UserController();
const productController = new ProductController();

//Product Services
/*router.get("/", productController.handleListProducts.bind(productController));

router.get("/add", (request, response) => {
  response.render("add");
});
router.post("/add-product", productController.handleCreateProduct.bind(productController));

router.get("/search", productController.handleSearchProduct.bind(productController));

router.get("/edit", productController.handleGetProductData.bind(productController));

router.post("/edit-product", productController.handleUpdateProductData.bind(productController));

router.post("/delete-product", productController.handleDeleteProduct.bind(productController));*/


//User Services
router.get("/", userController.handleListUsers.bind(userController));

router.get("/add", (request, response) => {
  response.render("add");
});
router.post("/add-user", userController.handleCreateUser.bind(userController));

router.get("/search", userController.handleSearchUser.bind(userController));

router.get("/edit", userController.handleGetUserData.bind(userController));

router.post("/edit-user", userController.handleUpdateUserData.bind(userController));

router.post("/delete-user", userController.handleDeleteUser.bind(userController));

export { router };
