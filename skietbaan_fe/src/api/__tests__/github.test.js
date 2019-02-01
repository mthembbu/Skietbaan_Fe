
/* eslint-env jest */
jest.mock('../request')

const github = require('../github')

// A simple example test
describe('#getUser() using Promises', () => {
  it('should load user data', () => {
    return github.getUser('vnglst')
    .then(data => {
      expect(data).toBeDefined()
      
    })
  })

  it('should load user data', () => {
    return github.getUser('vnglst')
    .then(data => {
      expect(data.entity.name).toEqual('Koen van Gilst')
})
})
})