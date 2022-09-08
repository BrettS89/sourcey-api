import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    article: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      resource.article = (
        await app
          .service('content/article')
          .get(resource.articleId, {
            query: {
              $resolve: { audioFile: true }
            }
          }).catch(() => null)
      );
    },

  }
};

export default resolvers;
