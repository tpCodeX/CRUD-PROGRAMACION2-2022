import { Request,Response } from "express";
import { CuentaService } from "../services/CuentaServices";
class CuentaController{
    private service:CuentaService;
    constructor(){
        this.service=new CuentaService();
    }

//Registrar nueva Cuenta
    async handleCreateCuenta(req:Request,res:Response){
        const{username,email,contraseña}=req.body;

        try{
            await this.service.create({
                username,
                email,
                contraseña
            }).then(() => {
                res.render("./productos/message", {
                  message: "Usted ha sido registrado correctamente."
                });
              });
        }catch (err) {
      res.render("./productos/message", {
        message: `Error al Regristrarse ${err.message}`
      });
    };
    };

//Devolver informacion de la cuenta
    async devolverCuentahandle(request: Request){
        const { username, email, contraseña} = request.body;
        const devolverCuenta = this.service.infoCuenta({username,email,contraseña});          
        return devolverCuenta
      };
    
//  Eliminar Cuenta
    async handleDeleteCuenta(request: Request, response: Response) {
    const { id } = request.body;
  

    try {
      await this.service.delUsuario(id).then(() => {
        response.render("./productos/message", {
          message: "Su cuenta ha sido eliminada correctamente"
        });
      });
    } catch (err) {
      response.render("./productos/message", {
        message: `Error al eliminar su Cuenta: ${err.message}`
      });
    }
  };

  //Info Usuario
  async getdatahandle(cuenta) {
    let { username } = cuenta;
    username = username.toString();
   
    const user = await this.service.getData(username);

    return {user}
  };

//Actualizar Datos Cuenta
async handleUpdateCuenta(request: Request, response: Response) {
    const { id, username, email, contraseña} = request.body;

    

    try {
      await this.service.update({ id, username, email, contraseña}).then(() => {
        response.render("./productos/message", {
          message: "Sus datos han sido modificados exitosamente."
        });
      });
    } catch (err) {
      response.render("./productos/message", {
        message: `Error al modificar los datos de su cuenta: ${err.message}`
      });
    }

  };

//Autenticar Loguin
async handleAutenticacion(cuenta){
    const {username, contraseña} = cuenta
     
      return await this.service.autenticar({
        username,
        contraseña
      });
    };
    
  };

export default CuentaController;