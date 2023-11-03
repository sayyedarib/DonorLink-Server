require("dotenv").config();

const emailConfig = {
  dev: {
    smtpHost: "smtp.ethereal.email",
    smtpPort: 587,
    smtpSecure: false,
    auth: {
      user: "kaelyn.rodriguez@ethereal.email",
      pass: "5w3dSkuKT1XrxMBGEY",
    },
  },
  prod: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 465,
    smtpSecure: true,
    auth: {
      type: "OAuth2",
      user: "sayyedaribhussain4321@gmail.com",
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: process.env.OAUTH_ACCESS_TOKEN,
    },
  },
};

const emailCurrentEnv = process.env.NODE_ENV;

// Export the corresponding configuration based on the environment
module.exports = emailConfig[emailCurrentEnv];
