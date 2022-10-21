import { Request, Response } from "express";
import AppUserServices from "../services/AppUserServices";

class AppUserController {
    private service:AppUserServices;
    constructor(){
        this.service=new AppUserServices();
    }
    async registrarUsuario(request:Request,response:Response) {
        const{username,password}=request.body; //trae datos del form.
        try{
            await this.service.registrar({
                username,
                password
            }).then(() => {
                response.render("./appUsers/message", {
                  message: "Usuario registrado con éxito.",
                  correcto:true
                });
            });
        } catch (err){
            response.render("./appUsers/message", {
                message: `Error al registrar usuario: ${err.message}`,
                correcto:false
              });
        }
}};
export default AppUserController;