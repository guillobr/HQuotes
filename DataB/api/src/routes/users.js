const { Router } = require('express')
const router = Router()
const User = require('../models/User')

router.get('/', async function (req, res) {
    try {
      const users = await User.find({})
      return res.json(users)
    } catch (error) {
      console.log('FALLO GET Users', error)
    }
  })


router.post('/addUser', async function (req, res) {
    const { nickname, name, email,  } = req.body
    console.log('Entre')
    try{

        const isExistUser = await User.findOne({ email })
      
          if (isExistUser) return res.json([isExistUser])

        let isSuperAdmin = false
        if (email === 'guillermobr88@gmail.com') isSuperAdmin = true

    const newUser = new User({
        nickname,
        name,
        email,
     
        isSuperAdmin
      })
      await newUser.save()
      return res.json(newUser)

    }catch{
        console.log('FALLO POST USER', err.message)
    }
})

module.exports = router






