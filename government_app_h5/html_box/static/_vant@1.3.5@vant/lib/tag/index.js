"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _create = _interopRequireDefault(require("../utils/create"));

var _default = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      class: [_vm.b((_obj = {
        mark: _vm.mark,
        plain: _vm.plain
      }, _obj[_vm.type] = _vm.type, _obj)), {
        'van-hairline--surround': _vm.plain
      }]
    }, [_vm._t("default")], 2);

    var _obj;
  },
  name: 'tag',
  props: {
    type: String,
    mark: Boolean,
    plain: Boolean
  }
});

exports.default = _default;