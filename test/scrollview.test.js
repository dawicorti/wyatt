var Ti = require('titanium-namespace');
var assert = require("assert")
var ScrollViewElement = require('../lib/el/scrollview')

describe('scrollview', function () {
  
  it('should create correct UI type', function () {
    var el = new ScrollViewElement;
    el.create({});

    assert.equal('Titanium.UI.ScrollView', el.ui._type);
  });

});