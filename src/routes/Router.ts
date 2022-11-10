import { Router } from "express";
export const router = Router()
import passHelper from "../lib/passHelper";

const protect = new passHelper;


router.get("/",protect.logueado,function(req, res){
    res.render("index");
  });
