const { expect } = require('chai')
describe('#children', function() {
  it('对象有userinfo', function() {
    expect({ userinfo: [] }).to.property('userinfo')
  })
})
