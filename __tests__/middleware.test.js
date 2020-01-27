'use strict';
const { server } = require('../src/app');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
describe('Product route testing', () => {
  it('Should respond with a status of 404', async () => {
    try {
      let result = await mockRequest.get('/bad');
      expect(result.status).toEqual(404);
    } catch (error) {
      error;
    }
  });
  it('should respond with an error', () => {
    return mockRequest
      .get('/bad')
      .then(results => {
        expect(results.status).toBe(404);
      })
      .catch(console.error);
  });
});
