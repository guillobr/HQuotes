require('dotenv').config()
const mongoose = require('mongoose')

//const uri = 'mongodb://127.0.0.1:27017/hquotes';

const { DB_USER, DB_PASSWORD } = process.env

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.naitk.mongodb.net/hquotes?retryWrites=true&w=majority`;


mongoose.connect(uri).catch((err) => {
    console.log('ERROR AL CONECTAR', err)
  })
  
  const db = mongoose.connection
  
  db.on('open', (_) => {
    console.log('conectado a ', uri)
  })
  db.on('error', (err) => {
    console.log('error en db', err)
  })
  
