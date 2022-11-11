import { getCustomRepository } from "typeorm";
import { CuentasRepository } from "../repositories/CuentasRepository";
import { Cuenta } from "../entities/Cuenta";
import Helper from "../lib/helpers";
import ICuenta from "../interfaces/ICuenta";
class CuentaService{
    async create({ username, email, contraseña}: ICuenta) {
      if (!username || !email || !contraseña) {
        throw new Error("Por favor, rellene todos los campos.");
      }
  
      const cuentasRepository = getCustomRepository(CuentasRepository);
      const helpers = new Helper; 
      const userExiste = await cuentasRepository.findOne({ username });
  
      if (userExiste) {
        throw new Error("El usuario ya se encuentra registrado.");
      }
  
      const emailExiste = await cuentasRepository.findOne({ email });
  
      if (emailExiste) {
        throw new Error("El Email ya se encuentra registrado.");
      }
  
      contraseña = await helpers.encriptar(contraseña)
      const user = cuentasRepository.create({ username, email, contraseña});
      
      await cuentasRepository.save(user);
    
      return user
  
    };
    
    async infoCuenta(username ){ //Devolver Cuenta
  
      const cuentasRepository = getCustomRepository(CuentasRepository);
      return await cuentasRepository.findOne({ username });
    };

    async delUsuario(id: string) { //Eliminar Cuenta
      const cuentaRepository = getCustomRepository(CuentasRepository);
  
      const user = await cuentaRepository
        .createQueryBuilder()
        .delete()
        .from(Cuenta)
        .where("id = :id", { id })
        .execute();
  
      return user;
    };

    async getData(username) {
        const cuentasRepository = getCustomRepository(CuentasRepository);
        
      const user = await cuentasRepository.findOne(username);
  
      return user;
    }
  
    
    async update({ id,contraseña}: ICuenta) {
        const cuentasRepository = getCustomRepository(CuentasRepository);
        
        const user = await cuentasRepository
        .createQueryBuilder()
        .update(Cuenta)
        .set({ contraseña})
        .where("id = :id", { id })
        .execute();
  
      return user;
      
    }
  
    async autenticar({ username, contraseña}: ICuenta) {
        if (!username || !contraseña) {
            throw new Error("Por favor rellene todos los campos");
      }
  
      const helpers = new Helper;
      const cuentasRepository = getCustomRepository(CuentasRepository);
      const cuentaAlreadyExists = await cuentasRepository.findOne({ username });
      
      if(!cuentaAlreadyExists){
        const esCorrecta= helpers.comparar(contraseña, cuentaAlreadyExists.contraseña )
        if (esCorrecta) {
            return true
        }else{
            return false
        }  
    }else{
        return false
      }
    }
  
}


export { CuentaService };

