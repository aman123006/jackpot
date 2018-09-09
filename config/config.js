const dotenv = require('dotenv').config();
let config = {
    EMAIL:process.env.EMAIL,
    EMAIL_PASS:process.env.EP,
    DB_URL:process.env.DB_URL,
   PORT:process.env.PORT,
   HOST:process.env.HOST,
}

module.exports = config;