/**
 * describe块和it块都允许调用only方法，表示只运行某个测试套件或测试用例。
 */
const { expect } = require('chai')
it.only('1 加 1 应该等于 2', function() {
  expect(1 + 1).to.be.equal(2)
})
