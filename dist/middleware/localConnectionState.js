"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalConnectionState = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var types = _interopRequireWildcard(require("../actions/types"));

var _miscellaneous = require("../helpers/miscellaneous");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalConnectionState = function LocalConnectionState(store) {
  return function (next) {
    return function (action) {
      if (action.type === types.WALLET_CONNECTED) {
        var _action$payload = action.payload,
            wallet = _action$payload.address,
            chain_id = _action$payload.chain_id,
            loader = _action$payload.loader;
        (0, _miscellaneous.SetConnectionState)({
          wallet: wallet,
          loader: loader,
          chainId: chain_id
        });
      }

      if (action.type === types.WALLET_DISCONNECTED) {
        (0, _miscellaneous.ClearConnectionState)();
      }

      if (action.type === types.WALLET_CHAIN_CHANGED) {
        var _chain_id = action.payload.chain_id;
        _chain_id = (0, _miscellaneous.FormatChainId)(_chain_id);
        (0, _miscellaneous.SetConnectionStateChainId)({
          chainId: _chain_id
        });
      }

      if (action.type === types.WALLET_ADDRESS_CHANGED) {
        var address = action.payload.address;

        if (!_lodash.default.isUndefined(address)) {
          (0, _miscellaneous.SetConnectionStateAddress)({
            wallet: address
          });
        }
      }

      next(action);
    };
  };
};

exports.LocalConnectionState = LocalConnectionState;