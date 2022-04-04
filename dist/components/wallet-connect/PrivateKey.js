"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _crypto = require("../../helpers/crypto");

var _common = require("../common");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PrivateKey = function PrivateKey(_ref) {
  var cb = _ref.cb,
      loading = _ref.loading,
      back = _ref.back;

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      privateKey = _useState2[0],
      setPrivateKey = _useState2[1];

  function renderMessage() {
    if (_lodash.default.isEmpty(privateKey)) return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "no-key",
      children: "\xA0"
    });
    var isValid = (0, _crypto.VerifyPrivateKey)(privateKey);
    if (isValid) return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "valid-private-key",
      children: "Private Key is valid"
    });else if (isValid === false) return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "invalid-private-key",
      children: "Invalid Private Key"
    });
  }

  var btnName = "Submit";

  if (loading) {
    btnName = _common.LOADER_BOX;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "modal-content",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "modal-header border-bottom-0",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h5", {
        className: "modal-title",
        id: "exampleModalLabel",
        children: "Connect with Private Key"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "modal-body",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
        className: "",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            children: "Enter Private Key"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "password",
            className: "form-control",
            placeholder: "Enter Private Key",
            value: privateKey,
            onChange: function onChange(x) {
              return setPrivateKey(x.target.value);
            }
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "private-key__message",
          children: renderMessage()
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: function onClick(e) {
            e.preventDefault();
            var account = (0, _crypto.GetAccountFromPK)(privateKey);
            cb(account);
          },
          disabled: loading,
          className: "btn btn-rounded btn-info mb-2",
          children: btnName
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "modal-footer border-top-0 d-flex justify-content-center",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: back,
        type: "button",
        className: "back",
        "data-dismiss": "modal",
        children: "Back"
      })
    })]
  });
};

var _default = PrivateKey;
exports.default = _default;