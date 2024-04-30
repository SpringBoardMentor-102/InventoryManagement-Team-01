const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "infosysspringboard76@gmail.com",
    pass: "uydg uxyr yvtq fzqh",
  },
});

async function sendPasswordResetEmail(email, token) {
  const mailOptions = {
    from: "infosysspringboard76@gmail.com",
    to: email,
    subject: "Password Reset Link",
    text: `Use this link to reset your password: http://localhost:3000/reset?token=${token}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Error sending password reset email");
  }
}

async function sendRegistrationEmail(email, confirmEmailToken, firstName) {
  const mailOptions = {
    from: "infosysspringboard76@gmail.com",
    to: email,
    subject: "Registration Confirmation",
    html: `
      <p>Dear ${firstName},</p>
      <p>Thank you for registering with us. Please click the following link to confirm your email and complete the registration process:</p>
      <p><a href="http://localhost:3000/confirm-email?token=${confirmEmailToken}"><b>Confirm Email</b></a></p>
      <p>If you didn't register with us, you can safely ignore this email.</p>
      <p>If you already have an account, you can <a href="http://localhost:3000/login"><b>login here<b></a>.</p>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Registration email sent successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Error sending registration email");
  }
}

module.exports = { sendPasswordResetEmail, sendRegistrationEmail };
