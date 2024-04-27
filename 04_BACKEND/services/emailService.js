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

async function sendRegistrationEmail(email, confirmEmailToken) {
  const mailOptions = {
    from: "infosysspringboard76@gmail.com",
    to: email,
    subject: "Registration Confirmation",
    text: `Click this link to confirm your email and complete registration: http://localhost:3000/confirm-email?token=${confirmEmailToken}`,
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
