import { Router } from "express";
import UserController from "../controllers/UserController";
const userController=new UserController();
const routerUser=Router();

routerUser.get("/", userController.handleListUsers.bind(userController));
routerUser.get("/add", (request, response) => {
  response.render("usuarios/add");
});
routerUser.get("/search", userController.handleSearchUser.bind(userController));
routerUser.get("/edit", userController.handleGetUserData.bind(userController));
routerUser.post("/add-user", userController.handleCreateUser.bind(userController));
routerUser.post("/edit-user", userController.handleUpdateUserData.bind(userController));
routerUser.post("/delete-user", userController.handleDeleteUser.bind(userController));

export default routerUser;