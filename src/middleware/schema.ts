import { Application } from '@feathersjs/feathers';

declare module '@feathersjs/feathers' {
  interface Application {
    schema: ((schema: string) => Record<string, any> | undefined ) & ((schema: Record<string, any>[]) => void)
  }
}

const schemaMiddleware = (app: Application): void => {
  app.schema = (schema: string | Record<string, any>[]) => {
    if (typeof schema === 'string') {
      return app.get(`system.schema.${schema}`);
    }

    schema
      .filter(s => [
        typeof s === 'object',
        typeof s.$id === 'string',
      ].every(Boolean))
      .forEach(s => {
        app.set(s.$id, s);
      });
  };
};

export default schemaMiddleware;
