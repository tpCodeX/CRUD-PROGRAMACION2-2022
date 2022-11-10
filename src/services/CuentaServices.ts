import { getCustomRepository } from "typeorm";
import { CuentaRepository } from "../repositories/CuentaRepository";
import { Cuenta } from "../entities/Cuenta";
import ICuenta from "../interfaces/ICuenta";
import passHelper from "../lib/passHelper";




class CuentaService{
  async create({ username, email, contraseña}: ICuenta) {
    if (!username || !email || !contraseña) {
      throw new Error("Por favor rellene todos los campos");
    }

    const cuentasRepository = getCustomRepository(CuentaRepository);
    const encriptado = new passHelper
    const usernameAlreadyExists = await cuentasRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("Username ya esta registrado");
    }

    const emailAlreadyExists = await cuentasRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("El Email ya esta registrado");
    }

    contraseña = await encriptado.encriptarContra(contraseña)
    const user = cuentasRepository.create({ username, email, contraseña});
    
    await cuentasRepository.save(user);
  
    return user

  }
  
  async devolverCuenta(username ){

    const cuentasRepository = getCustomRepository(CuentaRepository);
    return await cuentasRepository.findOne({ username });
  }
  async delete(id: string) {
    const cuentaRepository = getCustomRepository(CuentaRepository);

    const user = await cuentaRepository
      .createQueryBuilder()
      .delete()
      .from(Cuenta)
      .where("id = :id", { id })
      .execute();

    return user;

  }
  // async delete(username) {
  //   const cuentaRepository = getCustomRepository(CuentasRepository);

  //   const user = await cuentaRepository
  //     .createQueryBuilder()
  //     .select()
  //     .from(Cuenta,username)
  //     .where({ username })

  //   return user;

  // }
  
  async getData(username) {
    const cuentasRepository = getCustomRepository(CuentaRepository);

    const user = await cuentasRepository.findOne(username);

    return user;
  }


  async update({ id,contraseña}: ICuenta) {
    const cuentasRepository = getCustomRepository(CuentaRepository);

    const user = await cuentasRepository
      .createQueryBuilder()
      .update(Cuenta)
      .set({ contraseña})
      .where("id = :id", { id })
      .execute();

    return user;

  }

  async autentication({ username, contraseña}: ICuenta) {
    if (!username || !contraseña) {
      throw new Error("Por favor rellene todos los campos");
    }

    const desencriptado = new passHelper
    const cuentasRepository = getCustomRepository(CuentaRepository);
    const cuentaAlreadyExists = await cuentasRepository.findOne({ username });

    if(!cuentaAlreadyExists){
      const contraseña_desencriptado = desencriptado.compararContra(contraseña, cuentaAlreadyExists.contraseña )
      console.log (contraseña_desencriptado)
      if (contraseña_desencriptado) {
      return true
      }else{
        return false
      }  
    }else{
      return false
    }
  }

}


export default CuentaService;
