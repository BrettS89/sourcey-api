// Initializes the `storage/signature` service on path `/storage/signature`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Signature } from './signature.class';
import hooks from './signature.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'storage/signature': Signature & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/storage/signature', new Signature(app));

  // Get our initialized service so that we can register hooks
  const service = app.service('storage/signature');

  service.hooks(hooks);
}
