import { fastJoin } from 'feathers-hooks-common';
import { authenticate } from '../../../hooks';
import { deletePlaylistItems } from './hooks';
import resolvers from './playlist.resolvers';

export default {
  before: {
    all: [authenticate()],
    find: [],
    get: [],
    create: [],
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
    remove: [deletePlaylistItems]
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
