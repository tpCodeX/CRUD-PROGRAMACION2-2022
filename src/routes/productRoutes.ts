import { Router } from "express";
import ProductController from "../controllers/ProductController";
const productController=new ProductController();
const routerProd = Router();

routerProd.get("/", productController.handleListProducts.bind(productController));
routerProd.get("/add",productController.getCategoria.bind(productController));
routerProd.get("/searchProducts", productController.handleSearchProduct.bind(productController));
routerProd.get("/edit", productController.handleGetProductData.bind(productController));

routerProd.post("/add-product", productController.handleCreateProduct.bind(productController));
routerProd.post("/delete", productController.handleDeleteProduct.bind(productController));
routerProd.post("/edit-product", productController.handleUpdateProductData.bind(productController));

export default routerProd;