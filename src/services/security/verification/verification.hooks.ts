import { disallow } from 'feathers-hooks-common';
import { sendVerificationEmail, setResponseData, isValid } from './hooks';

export default {
  before: {
    all: [],
    find: [],
    get: [isValid],
    create: [sendVerificationEmail],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [setResponseData],
    create: [setResponseData],
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
