import { getCustomRepository } from "typeorm";
import IAppUser from "../interfaces/iAppUser";
import { AppUser } from "../entities/AppUser";
import { AppUserRepository } from "../repositories/AppUserRepository";

class AppUserServices{
    async registrar({username,password}:IAppUser) {
        if (!username || !password) {
          throw new Error("Por favor, rellene todos los campos.");
        }
        const appUserRepo = getCustomRepository(AppUserRepository);
        
        const usuarioExiste = await appUserRepo.findOne({username});
        
        if (usuarioExiste) {
            throw new Error("El nombre de usuario seleccionado ya está registrado.");
        }
        const appUser = appUserRepo.create({username,password});
  
        await appUserRepo.save(appUser);
  
        return appUser; 
    }
};

export default AppUserServices;