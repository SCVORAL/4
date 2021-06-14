const {Router} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// index
router.get(
  '/index',
  async (req, res) => {
    const users = await User.find(function (err, usersBD) {
      if (err) return console.error(err)
      return usersBD
    })
    res.send(users)
  }
)

router.put(
  '/lock',
  async (req, res) => {
    const {checkedIds} = req.body

    checkedIds.map(async (id, i) => {
      const del = await User.findOne({ _id: id })
      del.status = false
      del.save()
    })
  }
)

router.put(
  '/unlock/',
  async (req, res) => {
    const {checkedIds} = req.body

    checkedIds.map(async (id, i) => {
      const del = await User.findOne({ _id: id })
      del.status = true
      del.save()
    })
  }
)


module.exports = router