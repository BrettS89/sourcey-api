import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    playlistItems: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      const items = await app
        .service('content/playlist-item')
        .find({
          query: {
            playlistId: resource._id,
            $limit: 100,
            $resolve: {
              article: true,
            }
          },
        });

      resource.playlistItems = items.data;
      resource.count = items.total;
    },

  }
};

export default resolvers;
