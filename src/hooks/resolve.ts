import { Hook } from '@feathersjs/feathers';

export const resolve: Hook = context => {
  if (context.params?.query?.$resolve) {
    context.params.resolve = context.params.query.$resolve;
    delete context.params.query.$resolve;
  }

  return context;
};
