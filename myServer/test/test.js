/* eslint-disable */
const chai = require('chai')
const mocha = require('mocha')
const expect = chai.expect
// const getNum = require('../index2')

mocha.ui('bdd');
/* describe('Test', function() {
  it('should return 20 when the value is 10', function() {
      expect(getNum(10)).to.equal(20)
  })
  it('should return empty when the value is empty', function() {
    expect(getNum()).to.equal('')
  })
  it('should return string when the value is string', function() {
    expect(getNum('sdsd')).to.equal('sdsd')
  })
}) */
describe("Tests", function () {
  before(function () {
    createDiv('test')
  })
  it("content right", function () {
    var el = document.querySelector('#myDiv')
    expect(el).to.not.equal(null)
    expect(el.innerHTML).to.equal("test")
  })
})

mocha.run()