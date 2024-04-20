const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect("mongodb+srv://n3f677:OzqJLlbBhDEGqicB@cluster0.s3z4c5r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
{ useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(express.json());
const feedRoutes = require('./routes/transactionroute');
app.use('/transactionroute', feedRoutes);

const transaction = require('./models/transactionmodel')

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

