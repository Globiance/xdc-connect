"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddMultiplier = void 0;
exports.IsHex = IsHex;
exports.ToDoubleDigit = exports.RemoveMultiplier = exports.RemoveExpo = exports.RandomInt = exports.Random = exports.MinOf = exports.MaxOf = void 0;

var MinOf = function MinOf(x, y) {
  return parseFloat(x) < parseFloat(y) ? parseFloat(x) : parseFloat(y);
};

exports.MinOf = MinOf;

var MaxOf = function MaxOf(x, y) {
  return parseFloat(x) < parseFloat(y) ? parseFloat(y) : parseFloat(x);
};

exports.MaxOf = MaxOf;

var Random = function Random(min, max) {
  return min + Math.random() * (max - min);
};

exports.Random = Random;

var RandomInt = function RandomInt(min, max) {
  return Math.round(min + Math.random() * (max - min));
};

exports.RandomInt = RandomInt;

var ToDoubleDigit = function ToDoubleDigit(x) {
  x = "".concat(x);
  if (x.length === 1) return "0".concat(x);
  return x;
};

exports.ToDoubleDigit = ToDoubleDigit;

var AddMultiplier = function AddMultiplier(amount) {
  var multiplier = Math.pow(10, 18);
  return RemoveExpo(parseFloat(amount) * multiplier);
};

exports.AddMultiplier = AddMultiplier;

var RemoveMultiplier = function RemoveMultiplier(amount) {
  var multiplier = Math.pow(10, 18);
  return parseFloat(amount) / multiplier;
};

exports.RemoveMultiplier = RemoveMultiplier;

function IsHex(num) {
  return Boolean(num.match(/^0x[0-9a-f]+$/i));
}
/* eslint-disable no-useless-escape */


var RemoveExpo = function RemoveExpo(x) {
  var data = String(x).split(/[eE]/);
  if (data.length === 1) return data[0];
  var z = "",
      sign = x < 0 ? "-" : "",
      str = data[0].replace(".", ""),
      mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";

    while (mag++) {
      z += "0";
    }

    return z + str.replace(/^\-/, "");
  }

  mag -= str.length;

  while (mag--) {
    z += "0";
  }

  return str + z;
};

exports.RemoveExpo = RemoveExpo;