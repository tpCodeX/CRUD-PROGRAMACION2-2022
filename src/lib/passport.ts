import passport from "passport";
import passHelper from "./passHelper";
import CuentaService from "../services/CuentaServices";
import { getCustomRepository } from "typeorm";
import { CuentaRepository } from "../repositories/CuentaRepository";
import { Cuenta } from "../entities/Cuenta";
const LocalStrategy = require('passport-local').Strategy;
const cuentaService = new CuentaService();
const encriptado = new passHelper;



//Ingresar cuenta

passport.use('local.signin',new LocalStrategy({
    usernameField:'username',
    passwordField:'contraseña',
       
},async (username,contraseña,done)=>{
    const cuenta={
        username,
        contraseña
    }
    const cuentasRepository=getCustomRepository(CuentaRepository);
    const cuentaExiste=await cuentasRepository.findOne({username});

    if(!!cuentaExiste){
        const contraValida=await encriptado.compararContra(contraseña,cuentaExiste.contraseña)

        if(contraValida){
            done(null,cuentaExiste);
        }else{
            done(null,false);
        }
    } else{
        return done(null,false);
    }
}
));


//Registrar cuenta

passport.use('local.signup',new LocalStrategy({
    usernameField: 'username',
    emailField: 'email',
    passwordField: 'contraseña',
    passReqToCallback: true
    }, async (req,username,contraseña,done)=>{
        const{email}=req.body;
        const cuenta = {
            username,
            email,
            contraseña,
          }
        const usuario=await cuentaService.create(cuenta);
        return done(null,usuario);
    }));

    passport.serializeUser((user:Cuenta,done)=>{
        done(null,user.id)
    });

    passport.deserializeUser(async(id,done)=>{
        const user=await cuentaService.getData(id);
        done(null,user);
    })