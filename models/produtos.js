const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usuario = new Schema ({
  
    Nome:{
        type: String,
        required: true
    },
   Sobrenome: {
        type: String,
        required: true
    }
})



mongoose.model("usuarios", usuario)