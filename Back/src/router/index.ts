import { Express } from 'express';
import authControllers from 'controllers/auth.controller';
import requireUser from 'middleware/requere.user';

const routes = (server: Express) => {
  server.post('/api/register', authControllers.register);
  server.post('/api/sessions', authControllers.createUserSessionHandler);
  server.get('/api/sessions', requireUser, authControllers.getUserSessionsHandler);
  server.delete('/api/sessions', requireUser, authControllers.logout);
};

export default routes;
