const sendConfirmationEmail = require("../prac/mailService");
const { sendVerificationEmail } = require("../sendGrid/setup");

exports.sendMail = async (req, res) => {
  //   const { user } = req.body;
  const response = await sendVerificationEmail(req.body);
  console.log("responseee", response);
  res.status(200).send("emailsend");
};
