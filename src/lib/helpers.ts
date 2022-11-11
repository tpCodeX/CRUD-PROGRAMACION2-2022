import bcryptjs from 'bcryptjs'

class Helper{

    //Usa bcrypt para cifrar la pass y devuelve el hash para guardarlo en la DB
    async encriptar(password){
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password,salt);
        return hash;
    };

    //Compara la pass que llega de form con el hash de la BD para ver si corresponde.
   async comparar(password,bdpassword){
    return await bcryptjs.compare(password,bdpassword);
   };

   estaLogueado(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }else{
        return res.redirect('/login');
    }
   };

   noLogueado (req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/')
    }
    
}

}

export default Helper;