import { Router } from "express";
import passport from "passport";
import Helper from "../lib/helpers";
const helpers=new Helper;

const routerCuentas=Router();

//Si no esta logueado, devuelve al loguin
routerCuentas.get('/',helpers.noLogueado, function(req,res){
    res.render("login")
  })

  //Autentica al usuario y redirecciona segun corresponda 
  routerCuentas.post("/",passport.authenticate('local.signin',{    
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash: true
  }));
  
  //Renderiza Registro
  routerCuentas.get("/registrarse", (request, response) => {
    response.render("registrarse");
  });
  
  routerCuentas.post('/registrarse',passport.authenticate('local.signup',{
    
    successRedirect:'/login',
    failureRedirect:'/registrarse',
    failureFlash: true
  }));
  
  routerCuentas.get('/logout', (req, res) => {
    req.logOut(()=>{});
    res.redirect('/');
  });

  export default routerCuentas;