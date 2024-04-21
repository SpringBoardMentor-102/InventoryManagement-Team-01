const bcrypt = require('bcrypt');
const User = require('../model/userModel');


async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // Find the user with the provided email
        const user = await User.findOne({ email });

        // If user not found, return error
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid email or password');
        }

        // Password is correct, log the user in
        res.redirect('/dashboard'); // Redirect to the dashboard page
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}



async function registerUser(req, res) {
    const { email, password, firstName, lastName, phone, roles, city } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).send('Email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            roles,
            city
        });

        await newUser.save();
        res.redirect('/loginForm.html'); // Redirect to the login page after registration
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}



module.exports = { loginUser, registerUser };
