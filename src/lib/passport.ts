import passport from "passport";
import Helper from "./helpers";
import '../database'
import { CuentaService } from "../services/CuentaServices";
import CuentaController from "../controllers/CuentaController";
import { CuentasRepository } from "../repositories/CuentasRepository";
import { Cuenta } from "../entities/Cuenta";
import { getCustomRepository } from "typeorm";

const estrategiaLocal=require('passport-local').Strategy;
const cuentaService=new CuentaService();
const helpers=new Helper;


//Logueo

passport.use('local.signin', new estrategiaLocal ({
  
    usernameField: 'username',
    passwordField: 'contraseña',
  
    }, async (username, contraseña, done) => {
     
    const cuenta = {
      username,
      contraseña,
    }
  
    const cuentasRepository = getCustomRepository(CuentasRepository);     
    const cuentaExiste = await cuentasRepository.findOne({username})
    console.log(cuentaExiste)
  
    if (!!cuentaExiste) {
      const esCorrecta = await helpers.comparar(contraseña, cuentaExiste.contraseña)
  
      if (esCorrecta) {
  
        console.log('Sesion iniciada')
        done(null, cuentaExiste);
  
      } else {
  
        done(null, false);
      }
    } else {
      console.log('La cuenta no existe')
      return done(null, false);
    }
  
  
  }));

//Registro

passport.use('local.signup',new estrategiaLocal({

    usernameField: 'username',
    emailField: 'email',
    passwordField: 'contraseña',
    passReqToCallback: true
  
  }, async (req,username,contraseña, done) =>{
    const { email } = req.body;
    const cuenta = {
      username,
      email,
      contraseña,
    }
    console.log(cuenta)
  
    const user = await cuentaService.create(cuenta)
  
    console.log(user)
  
    return done(null,user)
  
  }));

  //Serialize y Deserialize

  passport.serializeUser((user: Cuenta,done) =>{
    done(null,user.id)
})

passport.deserializeUser(async (id ,done)=>{
    const user = await cuentaService.getData(id)
    done (null, user)
})