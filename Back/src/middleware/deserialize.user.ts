import express from 'express';
import { get } from 'lodash';
import TokenService from 'services/token-services';
import config from 'config';
import { reIssueAccessToken } from 'services/seesion-services';

const deserializeUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  const refreshToken = get(req, 'headers.x-refresh') as string;

  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = TokenService.verifyToken(accessToken, config.jwtToken.access.secret);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }
    const result = TokenService.verifyToken(newAccessToken as string, config.jwtToken.access.secret);

    res.locals.user = result.decoded;
    return next();
  }
  return next();
};

export default deserializeUser;
