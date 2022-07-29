const { Schema , model } = require('mongoose')

const quoteSchema = new Schema({
    quote : String,
    author: {
        type: Object,
        default: 'Unknown'
    },
    category:{
        type: Array,
        default: 'Unknown'
    },
    active: {
        type: Boolean,
        default: True
    }
})

module.exports = model('Quote' , quoteSchema)