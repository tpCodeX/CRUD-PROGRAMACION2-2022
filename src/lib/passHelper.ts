import bcryptjs from 'bcryptjs';


class passHelper{

    async encriptarContra(password){
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password,salt);
        return hash;
    };

    async compararContra(password,savedPass){
        return await bcryptjs.compare(password,savedPass);
    }

    async logueado(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
            return res.redirect("/login")
        }
    };

    async noLogueado (req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/')
        }
        
    };

}

export default passHelper;