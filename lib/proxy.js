var Ti = require('titanium-namespace');
var extend = require('extendable');
var logger = require('./logger');

function Proxy(template, yat) {
  template = template || {};

  if (typeof this.initialize === 'function') this.initialize(template);
  this._patch(template);
  this.yat = yat;
}

Proxy.prototype._patch = function (keys) {
  var el = this;

  Object.keys(keys).forEach(function(key) {
    if (key !== 'tree') el[key] = keys[key];
  });
};

Proxy.prototype.first = function (query) {
  return this.yat.first(query);
};

Proxy.prototype.where = function (query) {
  return this.yat.where(query);
};

Proxy.prototype.append = function (child) {
  var el = this;

  if (Array.isArray(child)) {
    child.forEach(function (c) { el.append(c); });
  } else {
    this.ui.add(child instanceof Proxy ? child.ui : child);
  }

  return this;
};

Proxy.prototype.attr = function (key, value) {
  var setter = 'set' + key.replace(/^[a-z]/, function(m){ return m.toUpperCase(); });

  if (Proxy._setter === 'setter' && typeof this.ui[setter] === 'function') {
    this.ui[setter](value);
  } else {
    this.ui[key] = value;
  }

  return this;
};

Proxy.prototype.on = function (evt, cb) {
  this.ui.addEventListener(evt, cb);
  return this;
};

Proxy.prototype.trigger = function (evt, args) {
  this.ui.fireEvent(evt, args);
  return this;
};

Proxy.prototype.off = function (evt, cb) {
  this.ui.removeEventListener(evt, cb);
  return this;
};

Proxy._setter = 'setter';

Proxy.extend = extend;
module.exports = Proxy;