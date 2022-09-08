// Initializes the `content/playlist-item` service on path `/content/playlist-item`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { PlaylistItem } from './playlist-item.class';
import createModel from '../../../models/playlist-item.model';
import hooks from './playlist-item.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'content/playlist-item': PlaylistItem & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/content/playlist-item', new PlaylistItem(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('content/playlist-item');

  service.hooks(hooks);
}
