;(function () {
  var NAMESPACE = 'AppBridge';

  var common = (function () {
    var exports = {};
    var getNonceStr = function () {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var maxPos = chars.length;
      var result = '';
      for (i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return result;
    }
    exports.toArray = function (arg) {
      return Array.prototype.slice.call(arg);
    };
    exports.generateKey = function () {
      return String(Number(new Date())) + getNonceStr();
    };
    return exports;
  })();

  var AppBridge = (function () {
    var exports = {};
    var _binder = function () {};
    var _context = window;
    var _handlers = {};
    var _bind = function (args) {
      _context[_binder].apply(_context, args);
    };
    exports.setBinder = function (context, binder) {
      _context = context;
      _binder = binder;
    };
    var setHandler = function (handler) {
      var key = common.generateKey();
      _handlers[key] = handler;
      return key;
    };
    exports.callHandler = function (key, argv) {
      var args = toArray(arguments);
      var handler = _handlers[key] || function () {};
      handler.apply(window, args.slice(1));
    };
    exports.bind = function (argv, callback) {
      var args = toArray(arguments);
      var key = setHanlder(args.slice(-1));
      _bind(args.slice(0, -1).concat(key));
    };
  })();

  window[NAMESPACE] = AppBridge;

})(document, window);

(function () {
  AppBridge.setBinder(window.appBindJs, 'passDataToApp');
})('example');
