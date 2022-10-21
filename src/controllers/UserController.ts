import { Request, Response } from "express";
import UserServices from "../services/UserServices";

class UserController {
  private service:UserServices;
  constructor(){
    this.service=new UserServices();
  }
  async handleCreateUser(request: Request, response: Response) {
    const { nombreUsuario, eMail, teléfono, ciudad, provincia } = request.body; //recibe los datos del formulario

    

    try {
      await this.service.create({
        nombreUsuario,
        eMail,
        teléfono,
        ciudad,
        provincia
      }).then(() => {
        response.render("./usuarios/message", {
          message: "Usuario registrado con éxito."
        });
      });
    } catch (err) {
      response.render("./usuarios/message", {
        message: `Error al registrar usuario: ${err.message}`
      });
    }

  }

  async handleSearchUser(request: Request, response: Response) {
    let { search } = request.query; //Recupera la busqueda de la URL
    search = search.toString(); //Formatea la busqueda a String.


    try { //implementa los metodos del servicio.
      const users = await this.service.search(search);
      response.render("./usuarios/search", {
        users: users,
        search: search
      });
    } catch (err) {
      response.render("./usuarios/message", {
        message: `Error al buscar usuario: ${err.message}`
      });
    }
  }

  async handleGetUserData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const user = await this.service.getData(id);

    return response.render("./usuarios/edit", {
      user: user
    });
  }

  async handleUpdateUserData(request: Request, response: Response) {
    const { id, nombreUsuario, eMail, teléfono, ciudad, provincia } = request.body;

    
    try {
      await this.service.update({ id, nombreUsuario, eMail, teléfono, ciudad, provincia }).then(() => {
        response.render("./usuarios/message", {
          message: "Usuario actualizado con éxito."
        });
      });
    } catch (err) {
      response.render("./usuarios/message", {
        message: `Error al actualizar usuario: ${err.message}`
      });
    }

  }

  async handleDeleteUser(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await this.service.delete(id).then(() => {
        response.render("./usuarios/message", {
          message: "Usuario eliminado exitosamente."
        });
      });
    } catch (err) {
      response.render("./usuarios/message", {
        message: `Error al eliminar usuario: ${err.message}`
      });
    }
  }
  async handleListUsers(request: Request, response: Response) {
    const users = await this.service.list(); //Espera users:Usuario[](ARRAY DE OBJETOS 'Usuario'.)

    return response.render("./usuarios/list", { //renderiza /usuarios/list.ejs
      users: users //Aquí retorna users:Usuario[];
    });
  }


}

export default UserController;