var expect = require('chai').expect;

require('mocha-jsdom')();

describe('AndroidBridge', function () {
  before(function () {
    this.bridge = require('..');
  });
  describe('simplify', function () {
    before(function () {
      var self = this;
      var Zombie = {};
      Zombie.invoker = function (foo, bar, baz, handlerName) {
        var a = [foo, {foobar: bar}, [baz]];
        var b = foo + bar + baz;
        setTimeout(function () {
          self.bridge.callHandler(handlerName, a, b);
        }, 0);
      };
      this.bridge.setInvoker(Zombie, 'invoker');
    });
    after(function () {
      this.bridge.releaseInvoker();
    });
    it('should work', function (done) {
      this.bridge.invoke('123', 'abc', 'efg', function (a, b) {
        expect(a).to.be.deep.equal(['123', {foobar: 'abc'}, ['efg']]);
        expect(b).to.be.deep.equal('123abcefg');
        done();
      });
    });
  });
  describe('scope', function () {
    before(function () {
      var self = this;
      var Zombie = {};
      Zombie.invoker = function (foo, bar, baz, handlerName) {
        var a = [foo, {foobar: bar}, [baz]];
        var b = foo + bar + baz;
        self.bridge.callHandler(handlerName, a, b);
      };
      this.bridge.setInvoker(Zombie, 'invoker');
    });
    after(function () {
      this.bridge.releaseInvoker();
    });
    it('scope should work', function () {
      var self = this;
      (function () {
        var tmp = '456';
        self.bridge.invoke('123', 'abc', 'efg', function (a, b) {
          expect(tmp).to.be.equal('456');
        });
      })();
    });
    it('context should work', function () {
      var self = this;
      (function () {
        var Person = function () {
          this.name = 'yelo';
          return this;
        };
        Person.prototype.invoke = function () {
          var name = this.name;
          self.bridge.invoke('123', 'abc', 'efg', function (a, b) {
            expect(name).to.be.equal('yelo');
          });
        };
      })();
    });
  });
});
