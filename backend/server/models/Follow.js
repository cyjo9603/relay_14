const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = mongoose.Schema({
   userFrom: {
       type: String,
       ref: 'userFrom'
   },
   userTo: {
       type: String,
       ref: 'userTo'
   }

}, { timestamps: true })


const Follow = mongoose.model('Follow', followSchema);

module.exports = { Follow }
