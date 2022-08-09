const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  category: {
    type: String,
  },
  quotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quote',
    },
  ],
})

module.exports = model('Category', categorySchema)
