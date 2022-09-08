import { fastJoin } from 'feathers-hooks-common';
import { authenticate } from '../../../hooks';
import { checkForDuplicateArticle } from './hooks';
import resolvers from './playlist-item.resolvers';

export default {
  before: {
    all: [authenticate()],
    find: [],
    get: [],
    create: [checkForDuplicateArticle],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [fastJoin(resolvers, ctx => ctx.params.resolve || {})],
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
