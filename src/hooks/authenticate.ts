import { Hook } from '@feathersjs/feathers';
import { NotAuthenticated, NotFound } from '@feathersjs/errors';
import jwt from 'jsonwebtoken';

export const authenticate = (config?: { freshTokenRequired: boolean }): Hook => {
  return async context => {
    const { app, params } = context;
    const token = params?.headers?.authorization;

    if (!params?.headers && !params?.route && !params?.provider) {
      return context;
    }

    if (!token) {
      throw new NotAuthenticated('Missing token');
    }
    
    try {
      jwt.verify(token, app.get('jwtSecret'));
    } catch (e) {
      if (e instanceof Error) {

        if (e.message === 'invalid signature') {
          throw new NotAuthenticated('Invalid token');
        }
  
        if (e.message === 'jwt expired' && config?.freshTokenRequired) {
          throw new NotAuthenticated('Token expired');
        }
      }
    }

    const decodedUser = jwt.decode(token);

    if (!decodedUser || typeof decodedUser === 'string') {

      throw new NotAuthenticated('Invalid token');
    }

    const user = await app.service('security/user')
      .get(decodedUser._id);

    if (!user) {
      throw new NotFound('No user found');
    }

    context.params.user = user;

    return context;
  };
};
