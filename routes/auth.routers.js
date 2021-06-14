const {Router} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()
const moment = require('moment')

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('name', 'Введите Имя').isLength({ min: 1 }),
    check('password', 'Введите пароль').isLength({ min: 1 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при регистрации'
        })
      }

      const {email, name, password} = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const registerDate = moment().format('YYYY-MM-DD')
      const loginDate = moment().format('YYYY-MM-DD')
      const user = new User({ email, name, password: hashedPassword , registerDate, loginDate, status: true})

      await user.save()

      return res.status(200).json({ message: 'Пользователь создан' })

    } catch (e){
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при входе в систему'
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({ email })

      if (!user){
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      user.loginDate = moment().format('YYYY-MM-DD')
      user.save()

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) { 
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      return res.json({ token, userId: user.id, userStatus: user.status })

    } catch (e){
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

module.exports = router