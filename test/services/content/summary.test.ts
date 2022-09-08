import app from '../../../src/app';

describe('\'content/article\' service', () => {
  it('registered the service', () => {
    const service = app.service('content/article');
    expect(service).toBeTruthy();
  });
});
