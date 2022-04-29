"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearConnectionState = ClearConnectionState;
exports.ObjToArr = exports.IsJson = exports.GetBrowser = exports.FormatChainId = exports.FilterStructResp = void 0;
exports.SetConnectionState = SetConnectionState;
exports.SetConnectionStateAddress = SetConnectionStateAddress;
exports.SetConnectionStateChainId = SetConnectionStateChainId;
exports.WithTimeout = void 0;

var _constant = require("./constant");

var _math = require("./math");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ObjToArr = function ObjToArr(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
};

exports.ObjToArr = ObjToArr;

var FilterStructResp = function FilterStructResp(obj) {
  return Object.keys(obj).filter(function (e, i) {
    if (i < Object.keys(obj).length / 2) return false;
    return true;
  }).reduce(function (acc, key) {
    acc[key] = obj[key];
    return acc;
  }, {});
};

exports.FilterStructResp = FilterStructResp;

var IsJson = function IsJson(abi) {
  try {
    JSON.parse(abi);
  } catch (e) {
    return false;
  }

  return true;
};

exports.IsJson = IsJson;

var WithTimeout = function WithTimeout(cb) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    timeout: 4999,
    onTimeout: undefined
  },
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 5000 : _ref$timeout,
      _ref$onTimeout = _ref.onTimeout,
      onTimeout = _ref$onTimeout === void 0 ? undefined : _ref$onTimeout;

  return new Promise(function (resolve, reject) {
    var int = setTimeout(function () {
      if (onTimeout) return resolve(onTimeout);
      reject("timeout");
    }, timeout);
    cb().then(function (resp) {
      clearTimeout(int);
      resolve(resp);
    }).catch(reject);
  });
};

exports.WithTimeout = WithTimeout;

var GetBrowser = function GetBrowser() {
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
    return "Opera";
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    return "Edge";
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return "Firefox";
  } else if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
    //IF IE > 10
    return "IE";
  } else {
    return "unknown";
  }
};

exports.GetBrowser = GetBrowser;

function ClearConnectionState() {
  localStorage.removeItem(_constant.CONNECTION_STATE);
}

function SetConnectionState(_ref2) {
  var loader = _ref2.loader,
      wallet = _ref2.wallet,
      chainId = _ref2.chainId;
  localStorage.setItem(_constant.CONNECTION_STATE, JSON.stringify({
    loader: loader,
    wallet: wallet,
    chainId: chainId
  }));
}

function SetConnectionStateChainId(_ref3) {
  var chainId = _ref3.chainId;
  var existing = localStorage.getItem(_constant.CONNECTION_STATE);
  if (!existing) return;
  existing = JSON.parse(existing);
  localStorage.setItem(_constant.CONNECTION_STATE, JSON.stringify(_objectSpread(_objectSpread({}, existing), {}, {
    chainId: chainId
  })));
}

function SetConnectionStateAddress(_ref4) {
  var wallet = _ref4.wallet;
  var existing = localStorage.getItem(_constant.CONNECTION_STATE);
  if (!existing) return;
  existing = JSON.parse(existing);
  localStorage.setItem(_constant.CONNECTION_STATE, JSON.stringify(_objectSpread(_objectSpread({}, existing), {}, {
    wallet: wallet
  })));
}

var FormatChainId = function FormatChainId(chain_id) {
  chain_id = "".concat(chain_id);
  if (String(chain_id).startsWith("0x") && (0, _math.IsHex)(chain_id)) chain_id = parseInt(chain_id, 16);
  return parseInt(chain_id);
};

exports.FormatChainId = FormatChainId;
Object.defineProperty(Object.prototype, "partialMatch", {
  value: function value(fields) {
    for (var _i = 0, _Object$keys = Object.keys(fields); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];

      if (Object.keys(this).includes(key)) {
        if (this[key] === fields[key]) continue;
        return false;
      } else {
        return false;
      }
    }

    return true;
  }
});
Object.defineProperty(Array.prototype, "includesPartial", {
  value: function value(fields) {
    for (var i = 0; i < this.length; i++) {
      var obj = this[i];
      console.log("objobj", obj);

      if (obj.partialMatch(fields)) {
        return i;
      }
    }

    return null;
  }
});