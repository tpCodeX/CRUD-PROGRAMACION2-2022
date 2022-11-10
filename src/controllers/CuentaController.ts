import { Request, Response } from "express";
import CuentaService from "../services/CuentaServices";

class CuentaController{

  async createhandle(request: Request, response: Response) {
    const { username, email, contraseña } = request.body;

    const createCuentaService = new CuentaService();

    try {
      await createCuentaService.create({
        username,
        email,
        contraseña,
      }).then(() => {
        response.render("message", {
          message: "Regristrado creado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al Regristrarse ${err.message}`
      });
    }

  }
  // async createhandle(cuenta) {
  //   const { username, email, contraseña} = cuenta

  //   const createCuentaService = new CuentaService();

  //   createCuentaService.create({
  //     username,
  //     email,
  //     contraseña,
  //   })
 

  // }
  async devolverCuentahandle(request: Request){
    const { username, email, contraseña} = request.body;
    const devolverCuenta = new CuentaService();

    devolverCuenta.devolverCuenta({username,email,contraseña})

    return devolverCuenta
  }
  async deletehandle(request: Request, response: Response) {
    const { id } = request.body;

    const deleteCuentaService = new CuentaService();

    try {
      await deleteCuentaService.delete(id).then(() => {
        response.render("message", {
          message: "Cuenta eliminado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al eliminar Cuenta: ${err.message}`
      });
    }
  }

  // async getdatahandle(request: Request, response: Response) {
  //   let { id } = request.query;
  //   id = id.toString();

  //   const getCuentaDataService = new CuentaService();

  //   const user = await getCuentaDataService.getData(id);

  //   return response.render("edit", {
  //     user: user
  //   });
  // }
  async getdatahandle(cuenta) {
    let { username } = cuenta;
    username = username.toString();

    const getCuentaDataService = new CuentaService();

    const user = await getCuentaDataService.getData(username);

    return {user: user}
  };
  

  async updatehandle(request: Request, response: Response) {
    const { id, username, email, contraseña} = request.body;

    const updateCuentaService = new CuentaService();

    try {
      await updateCuentaService.update({ id, username, email, contraseña}).then(() => {
        response.render("message", {
          message: "Cuenta actualizado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar Cuenta: ${err.message}`
      });
    }

  }
  
  async loginautentication(cuenta){
    const {username, contraseña} = cuenta
    const loginCuentaAutenticacion = new CuentaService;

  
      return await loginCuentaAutenticacion.autentication({
        username,
        contraseña

      });
    }
    
  }



export { CuentaController };
