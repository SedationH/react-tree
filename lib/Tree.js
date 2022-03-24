'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          }),
    _typeof(obj)
  );
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireWildcard(require('react'));

var _classnames = _interopRequireDefault(require('classnames'));

var _HasChildrenIcon = _interopRequireDefault(require('./HasChildrenIcon'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (_typeof(obj) !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function deleteKeyFromArray(key, array) {
  return array.filter(function (keyFromArray) {
    return keyFromArray !== key;
  });
}

var prefixCls = 'sedationh';

function Tree(_ref) {
  var _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    selectedKeysFromProps = _ref.selectedKeys,
    expandedKeysFromProps = _ref.expandedKeys,
    _ref$defaultExpandedK = _ref.defaultExpandedKeys,
    defaultExpandedKeys = _ref$defaultExpandedK === void 0 ? [] : _ref$defaultExpandedK,
    _ref$defaultSelectedK = _ref.defaultSelectedKeys,
    defaultSelectedKeys = _ref$defaultSelectedK === void 0 ? [] : _ref$defaultSelectedK,
    onSelect = _ref.onSelect,
    onExpand = _ref.onExpand;

  var _useState = (0, _react.useState)(selectedKeysFromProps || defaultSelectedKeys),
    _useState2 = _slicedToArray(_useState, 2),
    selectedKeys = _useState2[0],
    setSelectedKeys = _useState2[1];

  var _useState3 = (0, _react.useState)(expandedKeysFromProps || defaultExpandedKeys),
    _useState4 = _slicedToArray(_useState3, 2),
    expandedKeys = _useState4[0],
    setExpandedKeys = _useState4[1];

  (0, _react.useEffect)(
    function () {
      // 处理 selectedKeysFromProps 的 变化
      // 也要防止第一次变为 undefined
      selectedKeysFromProps && setSelectedKeys(selectedKeysFromProps);
    },
    [selectedKeysFromProps],
  );
  (0, _react.useEffect)(
    function () {
      // 处理 expandedKeysFromProps 的 变化
      // 也要防止第一次变为 undefined
      expandedKeysFromProps && setExpandedKeys(expandedKeysFromProps);
    },
    [expandedKeysFromProps],
  );

  var onTreeSelect = function onTreeSelect(key, _ref2) {
    var selected = _ref2.selected,
      node = _ref2.node;
    var keys = selected ? selectedKeys.concat(key) : deleteKeyFromArray(key, selectedKeys);
    onSelect === null || onSelect === void 0
      ? void 0
      : onSelect(keys, {
          node: node,
        }); // 如果外界没有传入 selectedKeysFromProps 状态需要自己维护

    if (!selectedKeysFromProps) {
      setSelectedKeys(keys);
    }
  };

  var onTreeExpand = function onTreeExpand(key, _ref3) {
    var expanded = _ref3.expanded,
      node = _ref3.node;
    var keys = expanded ? expandedKeys.concat(key) : deleteKeyFromArray(key, expandedKeys);
    onExpand === null || onExpand === void 0
      ? void 0
      : onExpand(keys, {
          node: node,
        }); // 如果外界没有传入 expandedKeysFromProps 状态需要自己维护

    if (!expandedKeysFromProps) {
      setExpandedKeys(keys);
    }
  };

  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: (0, _classnames.default)(prefixCls, 'tree'),
    },
    data.map(function (nodeData) {
      return /*#__PURE__*/ _react.default.createElement(TreeNode, {
        key: nodeData.key,
        data: nodeData,
        selectedKeys: selectedKeys,
        expandedKeys: expandedKeys,
        onSelect: onTreeSelect,
        onExpand: onTreeExpand,
      });
    }),
  );
}

function TreeNode(_ref4) {
  var _data$children, _data$children2;

  var data = _ref4.data,
    selectedKeys = _ref4.selectedKeys,
    expandedKeys = _ref4.expandedKeys,
    onSelect = _ref4.onSelect,
    onExpand = _ref4.onExpand;
  var hasChildren = (
    (_data$children = data.children) === null || _data$children === void 0
      ? void 0
      : _data$children.length
  )
    ? true
    : false;
  var selected =
    selectedKeys === null || selectedKeys === void 0 ? void 0 : selectedKeys.includes(data.key);
  var expanded =
    expandedKeys === null || expandedKeys === void 0 ? void 0 : expandedKeys.includes(data.key);

  var onNodeSelect = function onNodeSelect() {
    onSelect(data.key, {
      selected: !selected,
      node: data,
    });
  };

  var onNodeExpand = function onNodeExpand() {
    onExpand(data.key, {
      expanded: !expanded,
      node: data,
    });
  };

  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: 'tree-node',
    },
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'content',
      },
      hasChildren
        ? /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              onClick: onNodeExpand,
              className: 'switcher',
            },
            /*#__PURE__*/ _react.default.createElement(_HasChildrenIcon.default, {
              className: (0, _classnames.default)('switcher-icon', {
                expanded: expanded,
              }),
            }),
          )
        : /*#__PURE__*/ _react.default.createElement('div', {
            className: 'switcher-placeholder',
          }),
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: (0, _classnames.default)('title-wrapper', {
            selected: selected,
          }),
          onClick: onNodeSelect,
        },
        /*#__PURE__*/ _react.default.createElement(
          'span',
          {
            className: 'title',
          },
          data.title,
        ),
      ),
    ),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: (0, _classnames.default)('children-wrapper', {
          expanded: expanded,
        }),
      },
      (_data$children2 = data.children) === null || _data$children2 === void 0
        ? void 0
        : _data$children2.map(function (nodeData) {
            return /*#__PURE__*/ _react.default.createElement(TreeNode, {
              data: nodeData,
              key: nodeData.key,
              selectedKeys: selectedKeys,
              expandedKeys: expandedKeys,
              onSelect: onSelect,
              onExpand: onExpand,
            });
          }),
    ),
  );
}

var _default = Tree;
exports.default = _default;
