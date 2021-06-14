const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, require: true, unique: true},
  name: {type: String, require: true},
  password: {type: String, require: true},
  registerDate: {type: String},
  loginDate: {type: String},
  status: {type: Boolean}
})

module.exports = model('User', schema)