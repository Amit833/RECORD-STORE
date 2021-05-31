const sendConfirmationEmail = require("../sendGrid/mailService");
const { sendVerificationEmail } = require("../sendGrid/setup");

// exports.sendMail = async (req, res) => {
//   console.log("hello");
//   const { user } = req.body;
//   const response = await sendConfirmationEmail(user);
//   console.log("responseee", response);
//   res.status(200).send("emailsend");
// };

exports.sendMail = async (req, res) => {
  console.log("hello");
  //   const { user } = req.body;
  const response = await sendVerificationEmail(req.body);
  console.log("responseee", response);
  res.status(200).send("emailsend");
};
