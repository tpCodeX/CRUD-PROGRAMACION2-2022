import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { router } from "./routes/routes";
import "./database";
import session from 'express-session';
import passport from "passport";
import './lib/passport';
import Helper from "./lib/helpers";
import routerCat from "./routes/categoriaRouters";
import routerCuentas from "./routes/cuentaRoutes";
import routerProd from "./routes/productRoutes";
import routerUser from "./routes/userRoutes";
import routerSearch from "./routes/searchRoutes";
const cookieParser=require('cookie-parser');
const helpers=new Helper;
const secreto='topSecret_XD'

const app = express();
app.use(cookieParser(secreto));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middlewares de Passport
app.use(session({
  cookie: { maxAge: 80000 },
  secret: secreto,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



app.use(router);
app.use("/usuarios",helpers.estaLogueado,routerUser)
app.use("/search",helpers.estaLogueado,routerSearch)
app.use("/productos",helpers.estaLogueado,routerProd)
app.use("/categorias",helpers.estaLogueado,routerCat)
app.use("/login",routerCuentas)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    }); 
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "..", "views"));
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`
      La aplicación ha sido levantada con éxito. ✅
      Server 👂 en el puerto ${PORT}.
      🌐 >> http://localhost:${PORT}/ << 🌐
  `);
});
