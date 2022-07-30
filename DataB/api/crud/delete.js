require('../connection')

const Quote = require('../models/Quote')

async function quoteDelete(){
   const result = await Quote.findByIdAndDelete('62e519221c482985ce94c856')
   console.log(result)
}


quoteDelete()

//deleteOne
//deleteMany
//findOneAndDelete
