const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const Quote = require('../models/Quote')

// router.get('/', async function (req, res) {
//     try {
//       const users = await User.find({})
//       return res.json(users)
//     } catch (error) {
//       console.log('FALLO GET Users', error)
//     }
//   })

  router.get('/', async (req, res) => {
    try {
      const users = await User.find().populate([
        'favouritesQuotes',
      ])
      if (users.length === 0) throw new Error('Users is empty')
      res.json(users)
    } catch (error) {
      res.send(error.message)
    }
  })
  
  router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const userId = await User.findById(id).populate([
        'favouritesQuotes',
      ])
      
      res.json(userId)
    } catch (error) {
      res.send(error.message)
    }
  })

router.post('/addUser', async (req, res) => {
  const { nickname, name, email, picture, phone, address } = req.body
  try {
    const isExistUser = await User.findOne({ email }).populate([
      'favouritesQuotes',
    ])

    if (isExistUser) return res.json([isExistUser])

    let isSuperAdmin = false
    if (email === 'guillermobr88@gmail.com') isSuperAdmin = true

    const newUser = new User({
      nickname,
      name,
      email,
      picture,
      phone,
      address,
      isSuperAdmin,
      isAdmin
    })
    await newUser.save()

    const user = await User.find({ email }).populate([
      'favouritesQuotes',
    ])

    res.json([user])
  } catch (error) {
    res.status(404).send(error.message)
  }
})


router.put('/updateUser/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (Object.keys(req.body).length === 0) throw new Error('Send propertys')
    const user = await User.findByIdAndUpdate(id, req.body, { new: 1 })
    res.json(user)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/toggleAdmin', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await User.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isAdmin) {
          user.isAdmin = false
          await user.save()
        } else {
          user.isAdmin = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await User.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isAdmin) {
        user.isAdmin = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isAdmin = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})


router.post('/addDesiredQuotes/:idQuote/:idUser', async (req, res) => {
  const { idQuote, idUser } = req.params
  try {
    const quote = await Quote.findById(idQuote)
    const user = await User.findById(idUser).populate([
      'favouritesQuotes',
    ])

    const userQuotesFavourites = user.favouritesQuotes
    userQuotesFavourites.forEach((quoteFav) => {
      console.log(quoteFav._id.toString())
      if (quoteFav._id.toString() === quote._id.toString()) {
        return res.json([user])
      }
    })

    user.favouritesQuotes.push(quote._id)

    await user.save()

    const userUpdated = await User.findById(idUser).populate([
      'favouritesQuotes',
    ])

    res.json([userUpdated])
  } catch (error) {
    res.send(error.message)
  }
})


router.delete('/deleteDesiredQuotes/:idQuote/:idUser', async (req, res) => {
  const { idQuote, idUser } = req.params
  try {
    if (!idQuote || !idUser) throw new Error('Please insert complete data')
    const quote = await Quote.findById(idQuote)
    const user = await User.findById(idUser).populate([
      'favouritesQuotes',
    ])

    user.favouritesQuotes = user.favouritesQuotes.filter((q) => {
      return q._id.toString() !== quote._id.toString()
    })

    const userUpdate = await user.save()

    res.send([userUpdate])
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/toggleSuperAdmin', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await User.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isSuperAdmin) {
          user.isSuperAdmin = false
          await user.save()
        } else {
          user.isSuperAdmin = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await User.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isSuperAdmin) {
        user.isSuperAdmin = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isS = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})


// router.post('/hideUser/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     const user = await User.findById(id)
//     if (!user) throw new Error('El usuario no existe')

//     if (user.buyBooks.length > 0) {
//       user.buyBooks.forEach(async (idBook) => {
//         const order = await Order.findById(idBook)
//         order.isHidden = true
//         await order.save()
//       })
//     }

//     user.isHidden = true
//     user.save()

//     if (user.isHidden) return res.send('Usuario ocultado')
//   } catch (error) {
//     res.send(error.message)
//   }
// })

// router.post('/showUser/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     const user = await Users.findById(id)
//     if (!user) throw new Error('El usuario no existe')

//     if (user.buyBooks.length > 0) {
//       user.buyBooks.forEach(async (idOrder) => {
//         const order = await Order.findById(idOrder)
//         order.isHidden = false
//         await order.save()
//       })
//     }

//     user.isHidden = false
//     user.save()

//     if (!user.isHidden) return res.send('Usuario desocultado')
//   } catch (error) {
//     res.send(error.message)
//   }
// })

// router.delete('/deleteUser/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     const user = await User.findById(id)
//     if (!user) throw new Error('Usuario no encontrado')
   
//     await User.findByIdAndDelete(id)
//     res.send('Usuario eliminado correctamente')
//   } catch (error) {
//     res.status(404).send(error.message)
//   }
// })


module.exports = router






