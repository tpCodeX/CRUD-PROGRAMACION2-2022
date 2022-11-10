import { Router } from "express";
import UserController from "../controllers/UserController";


export const routerUser = Router();

const userController = new UserController();



routerUser.get("/", userController.handleListUsers.bind(userController));

routerUser.get("/add", (request, response) => {
  response.render("add");
});

routerUser.post("/add", userController.handleCreateUser.bind(userController));

routerUser.get("/search", userController.handleSearchUser.bind(userController));

routerUser.get("/edit", userController.handleGetUserData.bind(userController));

routerUser.post("/edit", userController.handleUpdateUserData.bind(userController));

routerUser.post("/delete", userController.handleDeleteUser.bind(userController));


