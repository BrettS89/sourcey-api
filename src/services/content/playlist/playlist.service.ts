// Initializes the `content/playlist` service on path `/content/playlist`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Playlist } from './playlist.class';
import createModel from '../../../models/playlist.model';
import hooks from './playlist.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'content/playlist': Playlist & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/content/playlist', new Playlist(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('content/playlist');

  service.hooks(hooks);
}
