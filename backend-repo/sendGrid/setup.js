const sgMail = require("@sendgrid/mail");
const env = require("../config/config");

sgMail.setApiKey(env.send_grid_key);

exports.sendVerificationEmail = async (mailData) => {
  const { email, amount, name, address, zip, city, country } = mailData;
  const message = {
    to: email,
    from: "adin23855@gmail.com",
    subject: "Your Order From Record Store",
    text: "thanks for shopping with us",
    html: `<h1>Dear ${name} </h1> 
          <p style={{color:"blue"}}>Next two days we wii send your order in this address: ${address} ${zip} ${city} ${country}</p>
          <p style={color:"blue"}>Total cost is $ ${amount}</p>
          <p style={color:"blue"}>Keep Shopping with us.</p>`,
  };

  try {
    const response = await sgMail.send(message);
    return response;
  } catch (error) {
    return error;
  }
};
