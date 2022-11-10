import ProductController from "../controllers/ProductController";
import { Router } from "express";
import { router } from "./Router";

export const routerProductos = Router();

const productController = new ProductController();

routerProductos.get("/productos", productController.handleListProducts.bind(productController));
routerProductos.get("/productos/add",productController.handleSearchProduct.bind(productController));
router.get("/productos/edit", productController.handleGetProductData.bind(productController));

router.post("/productos/add-product", productController.handleCreateProduct.bind(productController));
router.post("/productos/delete", productController.handleDeleteProduct.bind(productController));
router.post("/productos/edit-product", productController.handleUpdateProductData.bind(productController));