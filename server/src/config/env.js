const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const _config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Simple validation to make sure critical variables exist
for (const [key, value] of Object.entries(_config)) {
  if (value === undefined) {
    console.warn(`Warning: Environment variable ${key} is missing!`);
  }
}

module.exports = _config;