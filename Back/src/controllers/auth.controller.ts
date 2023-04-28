import AuthValidation from 'validations/auth.validations';
import BcryptService from 'services/bcrypt-service';
import express from 'express';
import { UserModel } from 'model/user.model';
import TokenService from 'services/token-services';
import sessionServices from 'services/seesion-services';
import config from 'config';

const register = async (req: express.Request, res: express.Response) => {
   try {
    const { email, name, password } = req.body;
    AuthValidation.registerValidationSchema.validateSync(req.body, { abortEarly: false });

    const emailExist = await UserModel.findOne({ email });
    if (emailExist) return res.status(401).json({ message: 'Email is arleady in use' });

    const hashedPassword = BcryptService.hash(password);

    const user = new UserModel({
        name,
        email,
        password: hashedPassword,
    });
    await user.save();
    return res.status(200).json({ success: true, message: 'Your account is ready for use' });
   } catch (error) {
       return res.status(404).json({ message: error.errors });
   }
};

const createUserSessionHandler = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        AuthValidation.loginValidationSchema.validateSync(req.body, { abortEarly: false });

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Wrong email' });

        const passwordMatch = BcryptService.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ message: 'Wrong password' });

        const session = await sessionServices.createSession(user._id, req.get('user-agent') || '');

        const accessToken = TokenService.createToken(
            { ...user, session: session._id },
            config.jwtToken.access.secret,
             '1m',
);
        const refreshToken = TokenService.createToken(
            { ...user, session: session._id },
            config.jwtToken.refresh.secret,
            '1y',

);

        return res.send({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const getUserSessionsHandler = async (req: express.Request, res: express.Response) => {
 const userId = res.locals.user._id;
 const session = await sessionServices.findSessions({ user: userId, valid: true });

 return res.send(session);
};
const logout = async (req: express.Request, res: express.Response) => {
    const sessionId = res.locals.user.session;
    await sessionServices.updateSession({ _id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
};

const authControllers = {
    register,
    getUserSessionsHandler,
    createUserSessionHandler,
    logout,
};

export default authControllers;
