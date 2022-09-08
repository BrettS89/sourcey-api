import { Hook } from '@feathersjs/feathers';
import { BadRequest, Forbidden, GeneralError } from '@feathersjs/errors';
import { sendEmail } from '../../../../utilities/email';

const types = ['signup'];

export const sendVerificationEmail: Hook = async (context) => {
  const { app, data } = context;

  if (!types.includes(data.type)) {
    throw new BadRequest('Invalid verification');
  }

  const emailExists = await app
    .service('security/user')
    .find({
      query: {
        email: data.email,
      },
    });

  if (emailExists.data.length > 0) {
    throw new BadRequest('An account with this email already exists');
  }

  const minm = 100000;
  const maxm = 999999;

  const code =  Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;

  data.code = code;

  // SEND EMAIL HERE
  await sendEmail({
    to: data.email,
    subject: 'Your signup verification code',
    text: `Here is your signup verificatino code: ${code}`,
  });
  
  return context;
};

export const setResponseData: Hook = async (context) => {
  context.result = { status: 'success' };

  return context;
};

export const isValid: Hook = async (context) => {
  const { app, params: { query } } = context;

  if (!types.includes(query?.type)) {
    throw new BadRequest('Invalid verification');
  }

  if (!query?.email || !query?.code) {
    throw new BadRequest('Invalide request');
  }

  const codes = await app
    .service('security/verification')
    .find({
      query: {
        type: query.type,
        email: query.email,
        $sort: {
          _id: -1,
        },
      },
    });

  if (codes.data.length === 0) {
    throw new BadRequest('Invalid verifcation code');
  }

  const verification = codes.data[0];

  if (verification.code !== query.code) {
    throw new BadRequest('Invalid verifcation code');
  }

  if (Date.now() - verification.createdAt.getTime() > 600000) {
    throw new Forbidden('This code has expired');
  }

  if (query.type === 'signup') {
    if (!query.password) {
      throw new BadRequest('Must include a password');
    }

    const roles = await app
      .service('security/role')
      .find({
        query: {
          name: 'member',
        },
      });

    const role = roles.data[0];

    if (!role) {
      throw new GeneralError('Something went wrong...');
    }

    await app
      .service('security/user')
      .create({
        email: query.email,
        password: query.password,
        roleId: role._id,
      });
  }

  context.result = { status: 'success' };

  return context;
};
