const { Schema, model } = require('mongoose')




const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    default: 'Unknown',
  },
  country: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default:
      'https://st.depositphotos.com/1898481/3660/i/600/depositphotos_36608939-stock-photo-unknown-person.jpg',
  },
  biography: {
    type: String,
    required: true,
  },
  quotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quote',
    },
  ],
  
  isActive: {
    type: Boolean,
    default: true,
  },
})

module.exports = model('Author', authorSchema)
