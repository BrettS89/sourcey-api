import app from '../../../src/app';

describe('\'security/verification\' service', () => {
  it('registered the service', () => {
    const service = app.service('security/verification');
    expect(service).toBeTruthy();
  });
});
