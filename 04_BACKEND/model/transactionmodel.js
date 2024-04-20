
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    tranid: Number,
    type: String,
    userid: Number ,
    checkoutid: Number,
    productid: Number,
    quantity:Number,
    price: Number,
    
});



module.exports = mongoose.model('trans',transactionSchema)



