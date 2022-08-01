const { Schema , model } = require('mongoose')

const userSchema = new Schema({
    nickname: {
        type: String,
        unique: true,
        required: true,
      },
      name: {
        type: String,
      },
      surname: {
        type: String,
      },
      birthday: {
        type: String,
        default: '',
      },
      dni: {
        type: String,
        default: '',
      },
      country: {
        type: String,
        default: '',
      },
      // email: {
      //   type: String,
      //   unique: true,
      //   required: true,
      // },
      // picture: {
      //   type: String,
      //   required: true,
      // },
      phone: {
        type: String,
        default: '',
      },
      address: {
        type: String,
        default: '',
      },
      ciudad: {
        type: String,
        default: '',
      },
      postal: {
        type: String,
        default: '',
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      isBanned: {
        type: Boolean,
        default: false,
      },
      isSuperAdmin: {
        type: Boolean,
        default: false,
      },
      isPremiun: {
        type: Boolean,
        default: false,
      },
      favouritesQuotes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Quote',
        },
      ],
})

module.exports = model('User' , userSchema)