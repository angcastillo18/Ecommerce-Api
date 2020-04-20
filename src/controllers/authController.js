const {Router} = require('express');
//crear router vacio
const router= Router();
//importamos el modelo
const User =require('../models/User');
//importar jsonWebToken
const jwt=require('jsonwebtoken');
//importar el secret del token
const config=require('../config');
//importamos function verifyToken
const verifyToken=require('./verifyToken');

router.post('/signup',async (req,res,next)=>{
    //de lo que me envien por el body , quiero capturar ->
    const {username,email,password} =req.body;
    //crear el modelo como objeto , recibir y guardarlo en nuestra base de datos 
    const user = new User({
        //es lo mismo username:username a solo username
        username:username,
        email:email,
        password:password
    });
    //vamos a llamr al metodo de cifrado asincrono por eso el await
    user.password=await user.encryptPassword(user.password);
    //guardar en la base de datos, metodo asincrono
    await user.save(); 
    //crear token mediante sign, el id le va a pasar al token,tbm un secret,para hacer unico el cifrado,
    const token=jwt.sign({id:user._id},config.secret,{
        //añadirle el tiempo de expiracion 1 dia
        expiresIn: 60*60*24
    })
    res.json({auth:true,token});
})

router.get('/profile',verifyToken, async (req,res,next)=>{

    //con el decoded tenemos el id, y haremos la consulta por el id del usuario
    const user= await User.findById(req.userId,{password:0});
    if(!user){
        return res.status(404).send('No user found');
    }
    res.json(user);
})
router.post('/signin',async (req,res,next)=>{
    //recibir email y password
    const {email,password}= req.body;
    //si el email conincide con la base de datos
    const user= await User.findOne({email:email});
    if(!user){
        return res.status(404).send("the email doesn't exists");
    }
    //confirmar si la contraseña es correcta
    const validPassword=await user.validatePassword(password);
    if(!validPassword){
        return res.status(401).json({auth:false,token:null});
    }
    //generamos token
    const token=jwt.sign({id:user._id},config.secret,{
        expiresIn:60*60*24
    })
    res.json({auth:true,token});
})

module.exports=router;