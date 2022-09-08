import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    audioFile: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      resource.audioFile = (
        await app.service('storage/file').get(resource.fileId).catch(() => null)
      );
    },
    
  }
};

export default resolvers;