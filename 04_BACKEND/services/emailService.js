const nodemailer = require('nodemailer');

async function sendPasswordResetEmail(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'infosysspringboard76@gmail.com',
            pass: 'uydg uxyr yvtq fzqh'
        }
    });

    const mailOptions = {
        from: 'infosysspringboard76@gmail.com',
        to: email,
        subject: 'Password Reset Link',
        text: `Use this link to reset your password: http://localhost:3000/reset-password?token=${token}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            throw new Error('Error sending password reset email');
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    await transporter.sendMail(mailOptions);
}

module.exports = { sendPasswordResetEmail };
