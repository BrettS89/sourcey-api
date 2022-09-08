import { Hook } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

export const checkForDuplicateArticle: Hook = async (context) => {
  const { app, data: { articleId, playlistId }, params: { user } } = context;

  if (!playlistId) {
    throw new BadRequest('Musit specify a playlist.');
  }

  const results = await app
    .service('content/playlist-item')
    .find({
      query: {
        articleId,
        playlistId,
        userId: user?._id,
      },
    });

  if (results.data.length > 0) {
    throw new BadRequest('This article already exists in this playlsit');
  }
};
