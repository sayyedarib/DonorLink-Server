const nodemailer = require("nodemailer");
const emailConfig = require("../config/nodemailer");

module.exports = async function sendMail({ email, subject, message,phone, queryMail, environment = process.env.NODE_ENV }) {
  console.log("creatigng transporter");
  let transporter = nodemailer.createTransport({
    host: emailConfig?.smtpHost,
    port: emailConfig?.smtpPort,
    secure: emailConfig?.smtpSecure,
    auth: emailConfig?.auth,
  });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
  
      .email-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
      }
  
      .header-content {
        background-color: #845ec2;
        color: white;
        padding: 20px;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
  
      .content {
        margin: 20px 0;
        line-height: 1.5;
      }
  
      .footer-content {
        background-color: #6c757d;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
  
      .logo {
        width: 150px;
        height: auto;
      }
  
      @media only screen and (max-width: 600px) {
        .email-container {
          border-radius: 0;
        }
        .header-content, .footer-content {
          border-radius: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header-content">
        <h1>${subject}</h1>
      </div>
      <div class="content">
        ${message}
      </div>
      <div class="footer-content">
        <p>Thank you for being a valued member of our community.</p>
        <p>&copy; 2023 Our Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  
  `;
  console.log("sending mail now...")
  transporter.sendMail({
    from: "contact.donorlink@gmail.com",
    to: email,
    subject: `DonorLink - ${subject}`,
    html: html
  }, (err, info) => {
    if (err) {
      console.log(`Error occured while sending mail ${err}`);
      res.status(500).send("Error Occured");
    }
    else
      res.status(200).send("Mail Sent Successfully");
  });
};