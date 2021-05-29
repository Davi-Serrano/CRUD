const express = require('express')
const app = express()
const mongoose = require("mongoose")
require("./models/produtos")
const Usuario = mongoose.model("usuarios")


// Config  ejs
app.set('view engine', 'ejs');

//
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Contecta ao bando de bados
mongoose.connect('mongodb://localhost/CRUD', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}).then(()=> {
    console.log('MongoDB conectado')
}).catch((err)=> {
    console.log('Erro ao se conectar: ' + err)
})

//Pag que posta
app.get('/criar',  (req, res) => {
    res.render( '../views/index');
})
 //Posta 
app.post("/show", (req, res)=>{
    
    
    const newUser = {
        Nome: req.body.nome,
        Sobrenome: req.body.sobrenome
    }
    new Usuario(newUser).save().then(()=>{
        console.log("Salvo com sucesso")
        res.redirect("/ler")
    }).catch((err) =>{
        console.log(err)
    })
})

//Pag que mostra 

app.get('/ler',  (req, res) => {
 
Usuario.find().lean().then((usuario) =>{

    res.render("../views/read", {usuario: usuario})
}).catch((err) =>{
    console.log(err)
    })

})

//Pag que deleta as categorias

app.get("/deletar", (req, res) =>{

Usuario.find().lean().then((usuario) =>{

    res.render("../views/delete", {usuario: usuario})
}).catch((err) =>{
    console.log(err)
    })



})



//Deleta categoria
app.post("/del", (req, res) =>{
    Usuario.deleteOne({_id: req.body.id}).then(() => {
        res.redirect("/ler")
        console.log("Deletado com sucesso")
    }).catch((err) =>{
        res.redirect("/ler")
        console.log(err)
    })
})


app.listen(8000, () => {
    console.log("Servidor rodando")
})

