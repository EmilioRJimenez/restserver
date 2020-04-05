///Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//Base de datos
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


//Caducidad del token
process.env.CAD = 60 * 60 * 24 * 30;


//Seed
process.env.SEED = process.env.SEED || 'seedDesarrollo';