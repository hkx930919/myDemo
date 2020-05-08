const { expect } = require('chai')
describe('#chai', function() {
  it('不包含4', function() {
    expect([1, 2, 3]).to.not.include(4)
  })
  /**
   * 将.equal, .include, .members, .keys 和 .property放在.deep链式之后将导致使用深度相等的方式来代替严格相等(===)
   */
  it('has deep {a:1}', function() {
    // expect(new Set([{ a: 1 }])).to.have.deep.keys([{ a: 1 }])
    // expect(new Set([{ a: 1 }])).to.have.keys([{ a: 1 }])
    // expect([{ a: 1 }]).to.include({ a: 1 })
    expect([{ a: 1 }]).to.deep.include({ a: 1 })
  })

  /**
   * 在其后使用的.property 和 .include断言中可以使用.和括号表示法。
   * .nested不可与.own断言连用
   */
  it('nested', function() {
    expect({
      a: { b: ['x', 'y'] }
    }).to.have.nested.property('a.b[1]')
  })

  /**
   * 使得其后的.property 和 .include断言中的继承属性被忽略。
   * .nested不可与.own断言连用
   */
  it('own', function() {
    Object.prototype.b = 2
    // expect({
    //   a: 1
    // }).to.have.own.property('b')
    expect({
      a: 1
    }).to.have.property('b')
  })
  /**
   * 使得其后的.members断言需求以相同（译注：不加ordered时member断言值断言成员存在性而忽视顺序）的顺序断言其成员
   */
  it('ordered', function() {
    // expect([1, 2]).to.have.ordered.members([2, 1])
    expect([1, 2]).to.have.members([2, 1])
  })
  /**
   * 使得跟在其后的.key断言仅需求目标包含至少一个所给定的键名，它与需求目标满足所有所给键的.all断言是相反的。
   */
  it('any', function() {
    expect({ c: 1, d: 2 }).to.have.any.keys('d', 'e')
  })
  /**
   * 使得跟在其后的.key断言仅需求目标需要包含所有所给的键名，它与仅需求目标包含至少一个所给定的键名.any断言是相反
   */
  it('all', function() {
    // expect({ c: 1, d: 2 }).to.have.all.keys('d')
    expect({ c: 1, d: 2 }).to.have.all.keys('d', 'c')
  })
  /**
   * 断言目标的length或size与给定值相同，接受参数msg在断言错误时给出提示。
   */
  it('lengthOf', function() {
    // expect([1, 2, 3], 'nooo why fail??').to.have.lengthOf(3)
    expect('12').to.have.lengthOf(2, 'nooo why fail??')
  })
  /**
    断言目标字符串包含所给子串，支持message在出错时给出用户信息。
   *  
   */
  it('string', function() {
    expect('12').string('2')
  })
})
