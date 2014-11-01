(function umd(require){
  if ('object' == typeof exports) {
    module.exports = require('1');
  } else if ('function' == typeof define && define.amd) {
    define(function(){ return require('1'); });
  } else {
    this['AndroidBridge'] = require('1');
  }
})((function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
module.exports = (function (win, doc) {
  var NAMESPACE, EVENTNAME, util, AndroidBridge, initEvent;
  NAMESPACE = 'AndroidBridge';
  EVENTNAME = 'AndroidBridgeReady';

  if (typeof win[NAMESPACE] !== 'undefined') {
    return win[NAMESPACE];
  }

  util = (function () {
    var exports = {};
    var getNonceStr = function () {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var maxPos = chars.length;
      var result = '';
      for (i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return result;
    };
    exports.toArray = function (arg) {
      return Array.prototype.slice.call(arg);
    };
    exports.generateKey = function () {
      return String(Number(new Date())) + getNonceStr();
    };
    exports.once = function (func) {
      var ran = false, memo;
      return function () {
        if (ran) return memo;
        ran = true;
        memo = func.apply(this, arguments);
        func = null;
        return memo;
      };
    };
    return exports;
  })();

  AndroidBridge = (function () {
    var exports = {};
    var _invoker = function () {};
    var _context = win;
    var _handlers = {};
    var _invoke = function (args) {
      _context[_invoker].apply(_context, args);
    };
    exports.setInvoker = function (context, invoker) {
      _context = context;
      _invoker = invoker;
    };
    exports.setInvoker.once = util.once(exports.setInvoker);
    exports.releaseInvoker = function () {
      _context = win;
      _invoker = function () {};
    };
    var setHandler = function (handler) {
      var key = util.generateKey();
      _handlers[key] = handler;
      return key;
    };
    exports.callHandler = function (key, argv) {
      var args = util.toArray(arguments);
      var handler = _handlers[key] || function () {};
      handler.apply(win, args.slice(1));
    };
    exports.invoke = function (argv, callback) {
      var args, key;
      args = util.toArray(arguments);
      callback = args[args.length - 1];
      key = setHandler(callback);
      _invoke(args.slice(0, -1).concat(key));
    };
    return exports;
  })();

  initEvent = function () {
    var e = doc.createEvent('Events');
    e.initEvent(EVENTNAME);
    e.bridge = AndroidBridge;
    doc.dispatchEvent(e);
  };

  win[NAMESPACE] = AndroidBridge;

  initEvent();
  
  return AndroidBridge;

})(window, document);

}, {}]}, {}, {"1":""})
);