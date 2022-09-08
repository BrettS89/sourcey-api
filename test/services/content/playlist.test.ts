import app from '../../../src/app';

describe('\'content/playlist\' service', () => {
  it('registered the service', () => {
    const service = app.service('content/playlist');
    expect(service).toBeTruthy();
  });
});
