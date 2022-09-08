import { authenticate } from '../../../hooks';
import { hashPassword } from './hooks';

export default {
  before: {
    all: [],
    find: [authenticate()],
    get: [authenticate()],
    create: [
      hashPassword,
    ],
    update: [authenticate()],
    patch: [authenticate()],
    remove: [authenticate()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
