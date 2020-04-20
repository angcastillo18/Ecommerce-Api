const jwt =require('jsonwebtoken');
const config=require('../config');
//middleware, manejador de peticiones,que podemos pasarlo antes de otras peticiones, una funcion intermedia
function verifyToken(req,res,next){
    //recibimos el token mediante el header
    const token=req.headers['x-access-token'];
    //si no existe el token
    if(!token){
        return res.status(401).json({
            auth:false,
            message:'No token provided'
        });
    }
    //verificamos el token y guardamos el valor
    const decoded=jwt.verify(token,config.secret);
    //en el objeto request guardamos el userid, ya que el objeto request lo pasamos en varias funciones
    req.userId=decoded.id;
    //porque es funcion intermedia
    next();
}

module.exports=verifyToken;