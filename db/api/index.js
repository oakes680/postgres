const express = require('express')
const UserModel = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const { jwtSecret } = require('../../config/secrets')

const router = express()
router.use(express.json())



router.get('/users', (req, res) => {
  UserModel.getUsers()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({message: 'there was an error retrieving user'})
  })
})


router.post('/register', (req, res) => {
   const  userData = req.body
   const hash = bcrypt.hashSync(userData.password, 12)
   userData.password = hash

   UserModel.registerUser(userData)
   .then(user => {
     res.status(200).json({message: 'you successfully registered'})
   })
   .catch(err => {
     res.status(500).json({ message: 'there was an error registering' })
   })
})

router.post('/login', (req, res) => {
  const {username, password}= req.body
  console.log({username})
  UserModel.login({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {

      const token = generateToken(user)

      res.status(200).json({token})
      } else {
        res.status(401).json({ message: 'credentials not correct' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'there was an error loggin in ' })
    })

})

const secret = "random text here"

function generateToken(user) {
 const  payload = {
    username: user.username,
    userid: user.id
  }

  const options = {
    expiresIn: '1d'
  }
//sssss

  return  jwt.sign(payload, secret, options)
}

module.exports = router