//AQUI SE HARA LA CONFIGURACION DE LA APLICACION
const express = require('express');
const app = express();
//entender los archivos json
app.use(express.json());
//entender datos a traves de formularios y convierte en objetos
app.use(express.urlencoded({extended:false}));

app.use(require('./controllers/authController'));

module.exports = app;
