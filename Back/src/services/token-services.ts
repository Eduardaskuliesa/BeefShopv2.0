import jwt from 'jsonwebtoken';

const createToken = (object: Object, token: string, value: string): string => jwt.sign(object, token as jwt.Secret, {
  expiresIn: value,
});

const verifyToken = (
    token: string,
    secretToken: string,
) => {
  try {
    const decoded = jwt.verify(token, secretToken);
    return {
        valid: true,
        expired: false,
        decoded,
    };
  } catch (e: any) {
    console.log(e);
    return {
        valid: false,
        expired: e.message === 'jwt expired',
        decoded: null,
    };
  }
};

// export function createToken(
//     object: Object,
//     keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
//     options?: jwt.SignOptions | undefined,
//   ) {
//     const signingKey = Buffer.from(
//       config.get<string>(keyName),
//       'base64',
//     ).toString('ascii');

//     return jwt.sign(object, signingKey, {
//       ...(options && options),
//       algorithm: 'RS256',
//     });
//   }

//   export function verifyToken(
//     token: string,
//     keyName: 'accessTokenPubliceKey' | 'refreshTokenPublicKey',
//   ) {
//     const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString(
//       'ascii',
//     );

//     try {
//       const decoded = jwt.verify(token, publicKey);
//       return {
//         valid: true,
//         expired: false,
//         decoded,
//       };
//     } catch (e: any) {
//       console.error(e);
//       return {
//         valid: false,
//         expired: e.message === 'jwt expired',
//         decoded: null,
//       };
//     }
//   }

const TokenService = {
    createToken,
    verifyToken,
};

export default TokenService;
