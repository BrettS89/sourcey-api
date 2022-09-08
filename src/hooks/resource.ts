import { Hook } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import Ajv from 'ajv';

export const validate = (schemaId: string): Hook => {
  return async context => {
    const { app, data } = context;

    const schema = app.get('schema.service.' + schemaId);

    if (typeof schema !== 'object') {
      throw new Error(`cannot load schema with id "${schemaId}"`);
    }

    const ajv = new Ajv({ strict: false });

    const valid = ajv.validate(schema, data);

    if (!valid) {
      throw new BadRequest('validation failed', { errors: ajv.errors });
    }

    return context;
  };
};
