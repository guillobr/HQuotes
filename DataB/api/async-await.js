require('./connection')

const Quote = require('./models/Quote')

async function main(){
    const quote = new Quote({
        name:"Abandona la gota, se el océano",
        author: {name: "Rumi"}
    })
    
    const quoteSaved = await quote.save();
    return quoteSaved
}


main()
.then(quoteSaved => console.log(quoteSaved))
.catch(err=> console.log(err))