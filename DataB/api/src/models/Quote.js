const { Schema , model } = require('mongoose')

const quoteSchema = new Schema({
    quote:{
        type: String,
        required: true,
      },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
      },

    category:{
        type: Array,
        default: 'Unknown'
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Quote' , quoteSchema)