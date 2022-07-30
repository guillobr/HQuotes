require('../connection')

const Quote = require('../models/Quote')


const someFunction = async() => {
    const quote = await Quote.findOne({quote:"Abandona la gota, se el océano"});
    console.log(quote)
    quote.quote = "Abandona la gota... sé el océano";
    quote.save();
}

const otherFunction = async () => {
    Quote.findOneAndUpdate({
        quote:"Abandona la gota... sé el océano"
    },
    {quote: "Abandona la gota, sé el océano"})
}


async function updateQuote(){
   const quote = await Quote.update(
    {quote:'Que tu pasado sea tu servidor'},
    {quote:'Que tu pasado, sea tu servidor'},
    {new:true} //para que devuelva el dato actualziado y no el anterior
    )
   console.log(quote)
}


//updateQuote();
//someFunction();
otherFunction()


/*
Use updateOne, updateMany, or bulkWrite instead.

*/