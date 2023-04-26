import SessionModel, { SessionDocument } from 'model/session.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { get } from 'lodash';
import config from 'config';
import { findUser } from 'helpers/findUser';
import TokenService from './token-services';

const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
};

const findSessions = async (query: FilterQuery<SessionDocument>) => SessionModel.find(query).lean();

const updateSession = async (
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>,
) => SessionModel.updateOne(query, update);

export async function reIssueAccessToken({
    refreshToken,
  }: {
    refreshToken: string;
  }) {
    const { decoded } = TokenService.verifyToken(refreshToken, config.jwtToken.refresh.secret);

    if (!decoded || !get(decoded, 'session')) return false;

    const session = await SessionModel.findById(get(decoded, 'session'));

    console.log({ session });

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = TokenService.createToken(
      { ...user, session: session._id },
      config.jwtToken.access.secret,
      '1m',
    );

    return accessToken;
  }

const sessionServices = {
    createSession,
    findSessions,
    updateSession,
};
export default sessionServices;
