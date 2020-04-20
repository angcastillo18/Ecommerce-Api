//importar dos metodos de mongoose
const {Schema,model} = require('mongoose');
//importamos bcrypt para encriptar la contraseña
const bcrypt = require('bcryptjs');

const userSchema=new Schema({
    email:{type:String,unique:true,lowercase:true},
    username:String,
    //select:false, para que por defecto cuando se realice un get 
    //de algun usuario, la contraseña no lo envie al cliente
    password:{type:String/* ,select:false */}
});

userSchema.methods.encryptPassword=async (password)=>{
    //salto , es cuantas veces apLICAMOS el algoritmo, este metodo es asincrono 
    const salt= await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
};
//aqui no es funcion flecha para acceder al this. password
userSchema.methods.validatePassword= function (password){
    return bcrypt.compare(password,this.password);
}

module.exports=model('User',userSchema);

