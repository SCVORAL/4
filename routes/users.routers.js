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
    checkedIds.map(async id => {
      const del = await User.findOne({ _id: id })
      del.status = false
      del.save()
    })

    const users = await User.find(function (err, usersBD) {
      if (err) return console.error(err)
      return usersBD
    })
    res.send(users)
  }
)

router.put(
  '/unlock',
  async (req, res) => {
    const {checkedIds} = req.body

    checkedIds.map(async id => {
      const unlock = await User.findOne({ _id: id })
      unlock.status = true
      unlock.save()
    })

    const users = await User.find(function (err, usersBD) {
      if (err) return console.error(err)
      return usersBD
    })
    res.send(users)

  }
)

router.delete(
  '/delete',
  async (req, res) => {
    const array = req.body

    array.map(async id => {
      const del = await User.deleteMany({ _id: id })
    })

    const users = await User.find(function (err, usersBD) {
      if (err) return console.error(err)
      return usersBD
    })
    res.send(users)

  }
)

module.exports = router