"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApothemProvider = void 0;
exports.CallTransaction = CallTransaction;
exports.Disconnect = Disconnect;
exports.GetChainId = GetChainId;
exports.GetCurrentProvider = GetCurrentProvider;
exports.GetNativeBalance = void 0;
exports.GetProvider = GetProvider;
exports.IsXdc3Supported = IsXdc3Supported;
exports.MainnetProvider = void 0;
exports.SendTransaction = SendTransaction;
exports.initMetamask = initMetamask;

var _xdc = _interopRequireDefault(require("xdc3"));

var _detectProvider = _interopRequireDefault(require("@metamask/detect-provider"));

var _lodash = _interopRequireDefault(require("lodash"));

var _crypto = require("../helpers/crypto");

var _constant = require("../helpers/constant");

var actions = _interopRequireWildcard(require("../actions"));

var _store = _interopRequireDefault(require("../redux/store"));

var _reactToastify = require("react-toastify");

var _miscellaneous = require("../helpers/miscellaneous");

var _math = require("../helpers/math");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function IsXdc3Supported() {
  return Boolean(window.ethereum);
}

function GetProvider() {
  return _GetProvider.apply(this, arguments);
}

function _GetProvider() {
  _GetProvider = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var provider;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _detectProvider.default)();

          case 2:
            provider = _context2.sent;
            return _context2.abrupt("return", provider);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _GetProvider.apply(this, arguments);
}

var MainnetProvider = function MainnetProvider() {
  return new _xdc.default.providers.HttpProvider(_constant.HTTP_PROVIDER[50]);
};

exports.MainnetProvider = MainnetProvider;

var ApothemProvider = function ApothemProvider() {
  return new _xdc.default.providers.HttpProvider(_constant.HTTP_PROVIDER[50]);
};

exports.ApothemProvider = ApothemProvider;

function GetChainId() {
  return _GetChainId.apply(this, arguments);
}

function _GetChainId() {
  _GetChainId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var chainId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return window.ethereum.request({
              method: "eth_chainId"
            });

          case 2:
            chainId = _context3.sent;
            return _context3.abrupt("return", (0, _miscellaneous.FormatChainId)(chainId));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _GetChainId.apply(this, arguments);
}

function initMetamask() {
  return _initMetamask.apply(this, arguments);
}

function _initMetamask() {
  _initMetamask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var chainId,
        link,
        currentProvider,
        _args8 = arguments;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            chainId = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : _constant.DEFAULT_CHAIN_ID;
            _context8.prev = 1;
            link = GetLink();

            if (link) {
              _context8.next = 6;
              break;
            }

            (0, _reactToastify.toast)( /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              children: "Metamask not available in the browser. Please use Firefox or Chrome."
            }), {
              autoClose: false
            });
            return _context8.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

          case 6:
            if (window.ethereum) {
              _context8.next = 9;
              break;
            }

            (0, _reactToastify.toast)( /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: ["Metamask not available in the browser. Please refer", " ", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                href: link,
                children: "here"
              })]
            }), {
              autoClose: false
            });
            return _context8.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

          case 9:
            _context8.next = 11;
            return GetCurrentProvider();

          case 11:
            currentProvider = _context8.sent;

            if (!(currentProvider !== "metamask")) {
              _context8.next = 15;
              break;
            }

            (0, _reactToastify.toast)( /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              children: "Metamask not available in the browser. Maybe you are using multiple wallets?"
            }), {
              autoClose: false
            });
            return _context8.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

          case 15:
            // init listeners
            window.ethereum.request({
              method: "eth_requestAccounts"
            }).then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(accounts) {
                var chainIdHex, swth, chain_id;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        // connected
                        chainIdHex = _xdc.default.utils.toHex(chainId);
                        _context4.next = 4;
                        return switchToXdc(chainIdHex);

                      case 4:
                        swth = _context4.sent;

                        if (!swth) {
                          (0, _reactToastify.toast)( /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                            children: "Error while switching network "
                          }), {
                            autoClose: false
                          });
                        }

                        _context4.t0 = _miscellaneous.FormatChainId;
                        _context4.next = 9;
                        return window.ethereum.request({
                          method: "eth_chainId"
                        });

                      case 9:
                        _context4.t1 = _context4.sent;
                        chain_id = (0, _context4.t0)(_context4.t1);

                        if (!(accounts.length === 0)) {
                          _context4.next = 14;
                          break;
                        }

                        console.log("no accounts connected");
                        return _context4.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

                      case 14:
                        return _context4.abrupt("return", _store.default.dispatch(actions.WalletConnected({
                          address: accounts[0],
                          chain_id: chain_id,
                          loader: _constant.LOADERS.Metamask,
                          explorer: _constant.CHAIN_DATA[chain_id]
                        })));

                      case 17:
                        _context4.prev = 17;
                        _context4.t2 = _context4["catch"](0);
                        console.log("e", _context4.t2);

                      case 20:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, null, [[0, 17]]);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()).catch(function (err) {
              if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log("Please connect to MetaMask.");
              } else {
                console.error(err);
              }
            });
            window.ethereum.on("accountsChanged", /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(accounts) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!(!accounts || accounts.length === 0)) {
                          _context5.next = 3;
                          break;
                        }

                        console.log("no accounts connected");
                        return _context5.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

                      case 3:
                        _store.default.dispatch(actions.AccountChanged(accounts[0]));

                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }());
            window.ethereum.on("chainChanged", /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(chainId) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        chainId = (0, _miscellaneous.FormatChainId)(chainId);

                        _store.default.dispatch(actions.NetworkChanged(chainId));

                      case 2:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }());
            window.ethereum.on("connect", /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref5) {
                var chainIdHex, chain_id, accounts;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        chainIdHex = _ref5.chainId;
                        _context7.prev = 1;
                        chain_id = (0, _miscellaneous.FormatChainId)(chainIdHex);
                        _context7.next = 5;
                        return window.ethereum.request({
                          method: "eth_requestAccounts"
                        });

                      case 5:
                        accounts = _context7.sent;

                        if (!(!accounts || accounts.length === 0)) {
                          _context7.next = 9;
                          break;
                        }

                        console.log("no accounts connected");
                        return _context7.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

                      case 9:
                        return _context7.abrupt("return", _store.default.dispatch(actions.WalletConnected({
                          address: accounts[0],
                          chain_id: chain_id,
                          loader: _constant.LOADERS.Metamask,
                          explorer: _constant.CHAIN_DATA[chain_id]
                        })));

                      case 12:
                        _context7.prev = 12;
                        _context7.t0 = _context7["catch"](1);
                        console.log(_context7.t0);

                      case 15:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, null, [[1, 12]]);
              }));

              return function (_x6) {
                return _ref6.apply(this, arguments);
              };
            }());
            window.ethereum.on("disconnect", function (data) {
              console.log("disconnect", data);
              return _store.default.dispatch(actions.WalletDisconnected());
            });
            _context8.next = 27;
            break;

          case 22:
            _context8.prev = 22;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);
            (0, _reactToastify.toast)( /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              children: "Error while connecting to Metamask provider"
            }), {
              autoClose: false
            });
            return _context8.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

          case 27:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 22]]);
  }));
  return _initMetamask.apply(this, arguments);
}

function SendTransaction(tx) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var data, _data$wallet$gasMulti, gasMultiplier, provider, xdc3, gasPrice;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              data = _store.default.getState();
              _data$wallet$gasMulti = data.wallet.gasMultiplier, gasMultiplier = _data$wallet$gasMulti === void 0 ? 1 : _data$wallet$gasMulti;

              if (tx.value) {
                tx.value = _xdc.default.utils.toHex(tx.value);
              }

              if (tx.gas) {
                tx.gas = _xdc.default.utils.toHex(tx.gas);
              }

              if (!tx.gasPrice) {
                _context.next = 9;
                break;
              }

              tx.gasPrice = _xdc.default.utils.toHex(tx.gasPrice);
              _context.next = 19;
              break;

            case 9:
              _context.next = 11;
              return GetProvider();

            case 11:
              provider = _context.sent;
              xdc3 = new _xdc.default(provider);
              _context.next = 15;
              return xdc3.eth.getGasPrice();

            case 15:
              gasPrice = _context.sent;

              if ((0, _math.IsHex)(gasPrice)) {
                gasPrice = parseInt(gasPrice, 16);
              } else {
                gasPrice = parseInt(gasPrice);
              }

              gasPrice = parseFloat(gasMultiplier) * parseFloat(gasPrice);
              tx.gasPrice = _xdc.default.utils.toHex(gasPrice);

            case 19:
              if (tx.from) {
                tx.from = _xdc.default.utils.fromXdcAddress(tx.from);
              }

              if (tx.to) {
                tx.to = _xdc.default.utils.fromXdcAddress(tx.to);
              }

              window.ethereum.request({
                method: "eth_sendTransaction",
                params: [tx]
              }).then(function (hash) {
                resolve({
                  transactionHash: hash
                });
              }).catch(function (e) {
                reject(e);
              });
              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              reject(_context.t0);

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 24]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

function CallTransaction(tx) {
  if (tx.from) {
    tx.from = _xdc.default.utils.fromXdcAddress(tx.from);
  }

  if (tx.to) {
    tx.to = _xdc.default.utils.fromXdcAddress(tx.to);
  }

  return new Promise(function (resolve, reject) {
    window.ethereum.request({
      method: "eth_call",
      params: [tx]
    }).then(function (data) {
      resolve(data);
    }).catch(function (e) {
      reject(e);
    });
  });
}

function GetCurrentProvider() {
  return _GetCurrentProvider.apply(this, arguments);
}

function _GetCurrentProvider() {
  _GetCurrentProvider = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!(IsXdc3Supported() !== true)) {
              _context9.next = 2;
              break;
            }

            return _context9.abrupt("return", null);

          case 2:
            if (!window.ethereum.isMetaMask) {
              _context9.next = 4;
              break;
            }

            return _context9.abrupt("return", "metamask");

          case 4:
            return _context9.abrupt("return", "unknown");

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _GetCurrentProvider.apply(this, arguments);
}

var GetNativeBalance = function GetNativeBalance(address) {
  return window.ethereum.request({
    method: "eth_chainId",
    params: [address]
  });
}; // internal


exports.GetNativeBalance = GetNativeBalance;

function switchToXdc() {
  return _switchToXdc.apply(this, arguments);
}

function _switchToXdc() {
  _switchToXdc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var chainId,
        _args10 = arguments;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            chainId = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : "0x32";
            _context10.prev = 1;
            _context10.next = 4;
            return window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{
                chainId: chainId
              }]
            });

          case 4:
            return _context10.abrupt("return", true);

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](1);
            console.log("switchError", _context10.t0); // This error code indicates that the chain has not been added to MetaMask.

            if (!(_context10.t0.code === 4902)) {
              _context10.next = 23;
              break;
            }

            _context10.prev = 11;
            _context10.next = 14;
            return window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: chainId,
                chainName: _constant.NETWORK_NAME[(0, _miscellaneous.FormatChainId)(chainId)],
                rpcUrls: [_constant.HTTP_PROVIDER[(0, _miscellaneous.FormatChainId)(chainId)]]
                /* ... */

              }]
            });

          case 14:
            return _context10.abrupt("return", true);

          case 17:
            _context10.prev = 17;
            _context10.t1 = _context10["catch"](11);
            console.log("addError", _context10.t1);
            return _context10.abrupt("return", false);

          case 21:
            _context10.next = 24;
            break;

          case 23:
            return _context10.abrupt("return", false);

          case 24:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 7], [11, 17]]);
  }));
  return _switchToXdc.apply(this, arguments);
}

function GetLink() {
  var browser = (0, _miscellaneous.GetBrowser)();

  if (browser === "Chrome") {
    return "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";
  }

  if (browser === "Firefox") {
    return "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
  }

  return null;
}

function Disconnect() {
  return _Disconnect.apply(this, arguments);
}

function _Disconnect() {
  _Disconnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var provider, xdc3;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return GetProvider();

          case 2:
            provider = _context11.sent;
            xdc3 = new _xdc.default(provider);
            return _context11.abrupt("return", xdc3.eth.currentProvider.disconnect);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _Disconnect.apply(this, arguments);
}