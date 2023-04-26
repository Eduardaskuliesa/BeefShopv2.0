import * as dotenv from 'dotenv';

dotenv.config();

const {
 SERVER_PORT,
 SERVER_DOMAIN,
 MONGO_KEY,
 BCRYPT_ROUNDS,
 JWT_ACCESS_TOKEN,
 JWT_ACCES_TOKEN_EXPIRATION,
 JWT_REFRESH_TOKEN,
 JWT_REFRESH_TOKEN_EXPIRATION,
} = process.env;

if (!SERVER_PORT
|| !SERVER_DOMAIN
|| !MONGO_KEY

|| !BCRYPT_ROUNDS

|| !JWT_ACCESS_TOKEN
|| !JWT_ACCES_TOKEN_EXPIRATION
|| !JWT_REFRESH_TOKEN
|| !JWT_REFRESH_TOKEN_EXPIRATION
) {
 throw new Error('Please define constant in .env file');
}

const config = {
 server: {
   domain: SERVER_DOMAIN,
   port: SERVER_PORT,
},
 mongo: {
   key: MONGO_KEY,
},
jwtToken: {
  access: {
    secret: JWT_ACCESS_TOKEN,
    expiresIn: JWT_ACCES_TOKEN_EXPIRATION,
  },
  refresh: {
    secret: JWT_REFRESH_TOKEN,
    expiresIn: JWT_REFRESH_TOKEN_EXPIRATION,
  },
},
 passwordEncryption: {
   secret: Number(BCRYPT_ROUNDS),
 },
};

export default config;
