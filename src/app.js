//AQUI SE HARA LA CONFIGURACION DE LA APLICACION
const express = require('express');
const app = express();
//entender los archivos json
app.use(express.json());
//entender datos a traves de formularios y convierte en objetos
app.use(express.urlencoded({extended:false}));

app.use(require('./controllers/authController'));
//MINUTO DEL VIDEO 18.24 https://www.youtube.com/watch?v=qckBlIfOnlA&t=107s
//para correr los servicios, mongod y nodemon run dev
//OTROS VIDEOS DE REFERENCIA https://www.youtube.com/watch?v=2jqok-WgelI&t=3896s https://www.youtube.com/watch?v=F9cvPtMI7JI&t=3183s https://www.youtube.com/watch?v=E57J73MzOEc&list=PLPl81lqbj-4KmEokV2b5tRtpBVgEVm0Nz&index=1
module.exports = app;
