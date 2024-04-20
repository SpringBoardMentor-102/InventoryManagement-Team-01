const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.post('/login', userController.loginUser);

router.post('/register', userController.registerUser);

router.get('/login', (req, res) => {
    try {
        res.sendFile(__dirname + '/../public/loginForm.html');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/register', (req, res) => {
    try {
        res.sendFile(__dirname + '/../public/registrationForm.html');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
