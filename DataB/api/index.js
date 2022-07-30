require('./connection')

const Quote = require('./models/Quote')

const quote = new Quote({
    quote : "La verdadera recompensa de una vida bien vivida no reside en lo que obtienes al final del sendero, sino en lo que eres cuando llegas ahí",
    author: {name: "Robin Sharma"},
})

quote.save((err,document)=>{
    if(err) console.log(err);
    console.log(document)
})


console.log(quote)