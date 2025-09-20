const express = require('express');
const path    = require('path');
const app     = express();
const publicFolderPath = path.resolve(__dirname, './public');
app.use(express.static(publicFolderPath));

const puerto = 3000;
app.listen(puerto, () =>{
    console.log(`Esta corriendo en el puerto ${puerto}`)
});

app.get('/',(req, res)=>{
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/babbage',(req, res)=>{
    res.sendFile(path.resolve(__dirname, './views/babbage.html'));
});