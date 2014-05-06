describe('AppBridge', function () {
  describe('simplify', function () {
    before(function () {
      var Zombie = {};
      Zombie.invoker = function (foo, bar, baz, handlerName) {
        var a = [foo, {foobar: bar}, [baz]];
        var b = foo + bar + baz;
        setTimeout(function () {
          AppBridge.callHandler(handlerName, a, b);
        }, 0);
      };
      AppBridge.setInvoker(Zombie, 'invoker');
    });
    after(function () {
      AppBridge.releaseInvoker();
    });
    it('should work', function (done) {
      AppBridge.invoke('123', 'abc', 'efg', function (a, b) {
        expect(a).to.be.deep.equal(['123', {foobar: 'abc'}, ['efg']]);
        expect(b).to.be.deep.equal('123abcefg');
        done();
      });
    });
  });
  describe('scope', function () {
    before(function () {
      var Zombie = {};
      Zombie.invoker = function (foo, bar, baz, handlerName) {
        var a = [foo, {foobar: bar}, [baz]];
        var b = foo + bar + baz;
        AppBridge.callHandler(handlerName, a, b);
      };
      AppBridge.setInvoker(Zombie, 'invoker');
    });
    after(function () {
      AppBridge.releaseInvoker();
    });
    it('scope should work', function () {
      (function () {
        var tmp = '456';
        AppBridge.invoke('123', 'abc', 'efg', function (a, b) {
          expect(tmp).to.be.equal('456');
        });
      })();
    });
    it('context should work', function () {
      (function () {
        var Person = function () {
          this.name = 'yelo';
          return this;
        };
        Person.prototype.invoke = function () {
          var name = this.name;
          AppBridge.invoke('123', 'abc', 'efg', function (a, b) {
            expect(name).to.be.equal('yelo');
          });
        };
      })();
    });
  });
});
