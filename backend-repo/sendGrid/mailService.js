const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID_KEY,
    },
  })
);
const sendConfirmationEmail = async (user) => {
  const mailOptions = {
    to: "amitmajumder833@gmail.com",
    from: "adin23855@gmail.com",
    subject: "A New Interest From LinxUs!",
    html: `<h1>A New Interest From LinxUs!</h1>
        <h2>You have been reached out to by </h2>
        <p>Are you also interested in connecting in regard of the following interests ${user}?</p>`,
  };
  try {
    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (err) {
    return err;
  }
};
module.exports = sendConfirmationEmail;
