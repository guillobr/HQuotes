const { Router } = require('express')

const Quotes = require('../model/Quote')
const Authors = require('../model/Author')
const Users = require('../model/User')
const router = Router()


const createQuote = async () =>{
  
    console.log('Holaaa')

    const createQuote = async () =>{
    
        const quoteOne = new Quote({
            quote : "La pregunta más persistente y apremiante es… que haces por los demás",
            author: "Martin Luther King"
        })
        await quoteOne.save()
    
        const quoteTwo = new Quote({
            quote : "La felicidad es un añadido, y llega a quienes no la buscan",
            author: "Robin Sharma"
        })
        await quoteTwo.save()
    }
}
    
    
    
    
    
    
    
    createQuote()