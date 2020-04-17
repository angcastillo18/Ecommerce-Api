//importar dos metodos de mongoose
const {schema,model} = require('mongoose');

const userSchema=new Schema({
    email:{type:String,unique:true,lowercase:true},
    username:String,
    //select:false, para que por defecto cuando se realice un get 
    //de algun usuario, la contraseña no lo envie al cliente
    password:{type:String,select:false}
});

module.exports=model('User',userSchema);

