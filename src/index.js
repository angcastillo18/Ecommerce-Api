//importamos app.js
const app=require('./app');

require('./database');
//function asincrona para que arranque la app
async function init(){
    await app.listen(3000);
    console.log('Server on port 3000');
}

init();