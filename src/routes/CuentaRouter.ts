import { response, Router } from "express";
import { CuentaController } from "../controllers/CuentaController";
import passport from "passport";
import passHelper from "../lib/passHelper";
const protect = new passHelper;

export const routerCuenta = Router();
const cuentaController = new CuentaController();


//  ------------- Categoria ---------------

routerCuenta.get('/',protect.noLogueado, function(req,res){
  res.render("login")
})

routerCuenta.post("/",passport.authenticate('local.signin',{
  
  successRedirect:'/',
  failureRedirect:'/login',
  failureFlash: true
}));

routerCuenta.get("/registro", (request, response) => {
  response.render("registro");
});

routerCuenta.post('/registro',passport.authenticate('local.signup',{
  
  successRedirect:'/login',
  failureRedirect:'/registro',
  failureFlash: true
}));

routerCuenta.get('/logout', (req, res) => {
  req.logOut(()=>{});
  res.redirect('/');
});


