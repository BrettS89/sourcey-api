import app from '../../../src/app';

describe('\'content/playlist-item\' service', () => {
  it('registered the service', () => {
    const service = app.service('content/playlist-item');
    expect(service).toBeTruthy();
  });
});
