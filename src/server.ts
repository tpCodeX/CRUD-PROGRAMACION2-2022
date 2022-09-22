import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { router } from "./routes";
import "./database";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

/*app.use((req,res,next)=>{
  if(req.method == 'POST'){console.log(`
  Se realizó una solicitud de tipo
      👉 ${req.method}
      desde "${req.originalUrl}"
  `)};
  next()
});*/


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

app.set("productViews", path.join(__dirname, "..", "views","productViews"));//ver q onda xd

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`
      La aplicación ha sido levantada con éxito. ✅
      Server 👂 en el puerto ${PORT}.
      🌐 >> http://localhost:3000/ << 🌐
  `);
});
