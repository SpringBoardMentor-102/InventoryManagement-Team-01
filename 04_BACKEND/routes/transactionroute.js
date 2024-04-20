const express = require('express')
const router = express.Router()
const app = express();
bodyParser = require('body-parser');
app.use(bodyParser.json());
const feedController = require('../models/transactionmodel');
router.get('/posts');// GET /feed/posts will be handled right now
router.post('/post');// POST /feed/post will be handled right now
module.exports = router;


app.get('/', (req, res) => {
    res.sendFile(feedController + '/transaction.html');
});


app.post('/submit',  async (req, res) => {
    try {
    
        const newtrans = new trans({
            tranid: req.body.tranid,
            type: req.body.type,
            userid: req.body.userid ,
            checkoutid: req.body.checkoutid,
            productid:req.body.productid,
            quantity:req.body.quantity,
            price: req.body.Price,
        });

        await newtrans.save();
        res.status(201).send('saved successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});






