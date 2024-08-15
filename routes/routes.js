const express = require("express");
const nodemailer = require("nodemailer");
const validator = require("validator");

const router = express.Router();

router.post("/sendMailContact", (req, res) => {
  const { FirstName, LastName, Email, PhoneNumber, Message } = req.body;
  if (!validator.isEmail(Email)) {
    return res.status(400).send("Invalid email address");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahmedkhan.cse010@gmail.com",
      pass: "togh eooj svfn xjxb", // Consider using environment variables for sensitive info
    },
  });

  const mailOptions = {
    from: "Portfolio <ahmedkhan.cse010@gmail.com>",
    to: "ahmedkhan.cse010@gmail.com",
    subject: "New message from your website",
    text: `First Name: ${FirstName}\nLast Name: ${LastName}\nEmail: ${Email}\nPhone number: ${PhoneNumber}\nMessage: ${Message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Internal server error");
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = router;