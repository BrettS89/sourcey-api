import { Hook, Paginated } from '@feathersjs/feathers';

export const deletePlaylistItems: Hook = async (context) => {
  const { app, id } = context;

  const playlistItems = await app
    .service('content/playlist-item')
    .find({
      query: {
        playlistId: id,
        $limit: 1000,
      },
    }) as Paginated<Record<string, any>>;

  const promises = playlistItems.data.map(p =>
    app.service('content/playlist-item').remove(p._id)
  );

  await Promise.all(promises);

  return context;
};
