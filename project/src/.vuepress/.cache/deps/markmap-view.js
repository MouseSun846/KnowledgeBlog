import {
  Hook,
  addClass,
  childSelector,
  debounce,
  getId,
  loadCSS,
  loadJS,
  noop,
  walkTree
} from "./chunk-Q463VRAJ.js";
import "./chunk-ZS7NZCD4.js";

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/ascending.js
function ascending(a2, b) {
  return a2 == null || b == null ? NaN : a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/descending.js
function descending(a2, b) {
  return a2 == null || b == null ? NaN : b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/bisector.js
function bisector(f) {
  let compare1, compare2, delta;
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x3) => ascending(f(d), x3);
    delta = (d, x3) => f(d) - x3;
  } else {
    compare1 = f === ascending || f === descending ? f : zero;
    compare2 = f;
    delta = f;
  }
  function left(a2, x3, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x3, x3) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x3) < 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a2, x3, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x3, x3) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x3) <= 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a2, x3, lo = 0, hi = a2.length) {
    const i = left(a2, x3, lo, hi - 1);
    return i > lo && delta(a2[i - 1], x3) > -delta(a2[i], x3) ? i - 1 : i;
  }
  return { left, center, right };
}
function zero() {
  return 0;
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/number.js
function number(x3) {
  return x3 === null ? NaN : +x3;
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector(number).center;

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/blur.js
var blur2 = Blur2(blurf);
var blurImage = Blur2(blurfImage);
function Blur2(blur3) {
  return function(data, rx, ry = rx) {
    if (!((rx = +rx) >= 0))
      throw new RangeError("invalid rx");
    if (!((ry = +ry) >= 0))
      throw new RangeError("invalid ry");
    let { data: values, width, height } = data;
    if (!((width = Math.floor(width)) >= 0))
      throw new RangeError("invalid width");
    if (!((height = Math.floor(height !== void 0 ? height : values.length / width)) >= 0))
      throw new RangeError("invalid height");
    if (!width || !height || !rx && !ry)
      return data;
    const blurx = rx && blur3(rx);
    const blury = ry && blur3(ry);
    const temp = values.slice();
    if (blurx && blury) {
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    } else if (blurx) {
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
    } else if (blury) {
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    }
    return data;
  };
}
function blurh(blur3, T, S, w, h) {
  for (let y3 = 0, n = w * h; y3 < n; ) {
    blur3(T, S, y3, y3 += w, 1);
  }
}
function blurv(blur3, T, S, w, h) {
  for (let x3 = 0, n = w * h; x3 < w; ++x3) {
    blur3(T, S, x3, x3 + n, w);
  }
}
function blurfImage(radius) {
  const blur3 = blurf(radius);
  return (T, S, start2, stop, step) => {
    start2 <<= 2, stop <<= 2, step <<= 2;
    blur3(T, S, start2 + 0, stop + 0, step);
    blur3(T, S, start2 + 1, stop + 1, step);
    blur3(T, S, start2 + 2, stop + 2, step);
    blur3(T, S, start2 + 3, stop + 3, step);
  };
}
function blurf(radius) {
  const radius0 = Math.floor(radius);
  if (radius0 === radius)
    return bluri(radius);
  const t = radius - radius0;
  const w = 2 * radius + 1;
  return (T, S, start2, stop, step) => {
    if (!((stop -= step) >= start2))
      return;
    let sum4 = radius0 * S[start2];
    const s0 = step * radius0;
    const s1 = s0 + step;
    for (let i = start2, j2 = start2 + s0; i < j2; i += step) {
      sum4 += S[Math.min(stop, i)];
    }
    for (let i = start2, j2 = stop; i <= j2; i += step) {
      sum4 += S[Math.min(stop, i + s0)];
      T[i] = (sum4 + t * (S[Math.max(start2, i - s1)] + S[Math.min(stop, i + s1)])) / w;
      sum4 -= S[Math.max(start2, i - s0)];
    }
  };
}
function bluri(radius) {
  const w = 2 * radius + 1;
  return (T, S, start2, stop, step) => {
    if (!((stop -= step) >= start2))
      return;
    let sum4 = radius * S[start2];
    const s2 = step * radius;
    for (let i = start2, j2 = start2 + s2; i < j2; i += step) {
      sum4 += S[Math.min(stop, i)];
    }
    for (let i = start2, j2 = stop; i <= j2; i += step) {
      sum4 += S[Math.min(stop, i + s2)];
      T[i] = sum4 / w;
      sum4 -= S[Math.max(start2, i - s2)];
    }
  };
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/fsum.js
var Adder = class {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x3) {
    const p = this._partials;
    let i = 0;
    for (let j2 = 0; j2 < this._n && j2 < 32; j2++) {
      const y3 = p[j2], hi = x3 + y3, lo = Math.abs(x3) < Math.abs(y3) ? x3 - (hi - y3) : y3 - (hi - x3);
      if (lo)
        p[i++] = lo;
      x3 = hi;
    }
    p[i] = x3;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n, x3, y3, lo, hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x3 = hi;
        y3 = p[--n];
        hi = x3 + y3;
        lo = y3 - (hi - x3);
        if (lo)
          break;
      }
      if (n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0)) {
        y3 = lo * 2;
        x3 = hi + y3;
        if (y3 == x3 - hi)
          hi = x3;
      }
    }
    return hi;
  }
};

// node_modules/.pnpm/internmap@2.0.3/node_modules/internmap/src/index.js
var InternMap = class extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries != null)
      for (const [key2, value] of entries)
        this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
};
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key))
    return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/array.js
var array = Array.prototype;
var slice = array.slice;
var map = array.map;

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function tickSpec(start2, stop, count3) {
  const step = (stop - start2) / Math.max(0, count3), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start2 * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start2)
      ++i1;
    if (i2 / inc > stop)
      --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start2 / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start2)
      ++i1;
    if (i2 * inc > stop)
      --i2;
  }
  if (i2 < i1 && 0.5 <= count3 && count3 < 2)
    return tickSpec(start2, stop, count3 * 2);
  return [i1, i2, inc];
}
function tickIncrement(start2, stop, count3) {
  stop = +stop, start2 = +start2, count3 = +count3;
  return tickSpec(start2, stop, count3)[2];
}
function tickStep(start2, stop, count3) {
  stop = +stop, start2 = +start2, count3 = +count3;
  const reverse2 = stop < start2, inc = reverse2 ? tickIncrement(stop, start2, count3) : tickIncrement(start2, stop, count3);
  return (reverse2 ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/max.js
function max(values, valueof) {
  let max5;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null && (max5 < value || max5 === void 0 && value >= value)) {
        max5 = value;
      }
    }
  } else {
    let index2 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index2, values)) != null && (max5 < value || max5 === void 0 && value >= value)) {
        max5 = value;
      }
    }
  }
  return max5;
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/min.js
function min(values, valueof) {
  let min4;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null && (min4 > value || min4 === void 0 && value >= value)) {
        min4 = value;
      }
    }
  } else {
    let index2 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index2, values)) != null && (min4 > value || min4 === void 0 && value >= value)) {
        min4 = value;
      }
    }
  }
  return min4;
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/minIndex.js
function minIndex(values, valueof) {
  let min4;
  let minIndex2 = -1;
  let index2 = -1;
  if (valueof === void 0) {
    for (const value of values) {
      ++index2;
      if (value != null && (min4 > value || min4 === void 0 && value >= value)) {
        min4 = value, minIndex2 = index2;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index2, values)) != null && (min4 > value || min4 === void 0 && value >= value)) {
        min4 = value, minIndex2 = index2;
      }
    }
  }
  return minIndex2;
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/merge.js
function* flatten(arrays) {
  for (const array4 of arrays) {
    yield* array4;
  }
}
function merge(arrays) {
  return Array.from(flatten(arrays));
}

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle2(array4, i0 = 0, i1 = array4.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i = random() * m-- | 0, t = array4[m + i0];
      array4[m + i0] = array4[i + i0];
      array4[i + i0] = t;
    }
    return array4;
  };
}

// node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/dispatch.js
var noop2 = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _2 = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _2 || /[\s.]/.test(t))
      throw new Error("illegal type: " + t);
    _2[t] = [];
  }
  return new Dispatch(_2);
}
function Dispatch(_2) {
  this._ = _2;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _2 = this._, T = parseTypenames(typename + "", _2), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n)
        if ((t = (typename = T[i]).type) && (t = get(_2[t], typename.name)))
          return t;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type)
        _2[t] = set(_2[t], typename.name, callback);
      else if (callback == null)
        for (t in _2)
          _2[t] = set(_2[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy3 = {}, _2 = this._;
    for (var t in _2)
      copy3[t] = _2[t].slice();
    return new Dispatch(copy3);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0)
      for (var args = new Array(n), i = 0, n, t; i < n; ++i)
        args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i = 0, n = type2.length, c3; i < n; ++i) {
    if ((c3 = type2[i]).name === name) {
      return c3.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop2, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null)
    type2.push({ name, value: callback });
  return type2;
}
var dispatch_default = dispatch;

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
    name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group2 = groups2[j2], n = group2.length, subgroup = subgroups[j2] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js
function array2(x3) {
  return x3 == null ? [] : Array.isArray(x3) ? x3 : Array.from(x3);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array2(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function")
    select = arrayAll(select);
  else
    select = selectorAll_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = [], parents = [], j2 = 0; j2 < m; ++j2) {
    for (var group2 = groups2[j2], n = group2.length, node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        subgroups.push(select.call(node, node.__data__, i, group2));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js
var filter2 = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter2.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group2 = groups2[j2], n = group2.length, subgroup = subgroups[j2] = [], node, i = 0; i < n; ++i) {
      if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js
function constant_default(x3) {
  return function() {
    return x3;
  };
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group2, enter, update, exit, data) {
  var i = 0, node, groupLength = group2.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group2[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group2[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group2, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group2.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group2[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group2) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group2[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups2 = this._groups;
  if (typeof value !== "function")
    value = constant_default(value);
  for (var m = groups2.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j2 = 0; j2 < m; ++j2) {
    var parent = parents[j2], group2 = groups2[j2], groupLength = group2.length, data = arraylike(value.call(parent, parent && parent.__data__, j2, parents)), dataLength = data.length, enterGroup = enter[j2] = new Array(dataLength), updateGroup = update[j2] = new Array(dataLength), exitGroup = exit[j2] = new Array(groupLength);
    bind(parent, group2, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter)
      enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update)
      update = update.selection();
  }
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j2 = 0; j2 < m; ++j2) {
    for (var group0 = groups0[j2], group1 = groups1[j2], n = group0.length, merge2 = merges[j2] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge2[i] = node;
      }
    }
  }
  for (; j2 < m0; ++j2) {
    merges[j2] = groups0[j2];
  }
  return new Selection(merges, this._parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups2 = this._groups, j2 = -1, m = groups2.length; ++j2 < m; ) {
    for (var group2 = groups2[j2], i = group2.length - 1, next = group2[i], node; --i >= 0; ) {
      if (node = group2[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare)
    compare = ascending2;
  function compareNode(a2, b) {
    return a2 && b ? compare(a2.__data__, b.__data__) : !a2 - !b;
  }
  for (var groups2 = this._groups, m = groups2.length, sortgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group2 = groups2[j2], n = group2.length, sortgroup = sortgroups[j2] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending2(a2, b) {
  return a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups2 = this._groups, j2 = 0, m = groups2.length; j2 < m; ++j2) {
    for (var group2 = groups2[j2], i = 0, n = group2.length; i < n; ++i) {
      var node = group2[i];
      if (node)
        return node;
    }
  }
  return null;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups2 = this._groups, j2 = 0, m = groups2.length; j2 < m; ++j2) {
    for (var group2 = groups2[j2], i = 0, n = group2.length, node; i < n; ++i) {
      if (node = group2[i])
        callback.call(node, node.__data__, i, group2);
    }
  }
  return this;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v2);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v2);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v2, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      delete this[name];
    else
      this[name] = v2;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n)
      if (!list.contains(names[i]))
        return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v2 = value.apply(this, arguments);
    this.textContent = v2 == null ? "" : v2;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v2 = value.apply(this, arguments);
    this.innerHTML = v2 == null ? "" : v2;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on)
      return;
    for (var j2 = 0, i = -1, m = on.length, o; j2 < m; ++j2) {
      if (o = on[j2], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i)
      on.length = i;
    else
      delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on)
      for (var j2 = 0, m = on.length; j2 < m; ++j2) {
        if ((o = on[j2]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on)
      this.__on = [o];
    else
      on.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j2 = 0, m = on.length, o; j2 < m; ++j2) {
        for (i = 0, o = on[j2]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i)
    this.each(on(typenames[i], value, options));
  return this;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups2 = this._groups, j2 = 0, m = groups2.length; j2 < m; ++j2) {
    for (var group2 = groups2[j2], i = 0, n = group2.length, node; i < n; ++i) {
      if (node = group2[i])
        yield node;
    }
  }
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups2, parents) {
  this._groups = groups2;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/local.js
var nextId = 0;
function local() {
  return new Local();
}
function Local() {
  this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id2 = this._;
    while (!(id2 in node))
      if (!(node = node.parentNode))
        return;
    return node[id2];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent)
    event = sourceEvent;
  return event;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/pointer.js
function pointer_default(event, node) {
  event = sourceEvent_default(event);
  if (node === void 0)
    node = event.currentTarget;
  if (node) {
    var svg2 = node.ownerSVGElement || node;
    if (svg2.createSVGPoint) {
      var point6 = svg2.createSVGPoint();
      point6.x = event.clientX, point6.y = event.clientY;
      point6 = point6.matrixTransform(node.getScreenCTM().inverse());
      return [point6.x, point6.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

// node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/noevent.js
var nonpassivecapture = { capture: true, passive: false };
function noevent_default(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/nodrag.js
function nodrag_default(view) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", noevent_default, nonpassivecapture);
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", noevent_default, nonpassivecapture);
  } else {
    root2.__noselect = root2.style.MozUserSelect;
    root2.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", null);
  if (noclick) {
    selection2.on("click.drag", noevent_default, nonpassivecapture);
    setTimeout(function() {
      selection2.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", null);
  } else {
    root2.style.MozUserSelect = root2.__noselect;
    delete root2.__noselect;
  }
}

// node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/event.js
function DragEvent(type2, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x: x3,
  y: y3,
  dx,
  dy,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type2, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    subject: { value: subject, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    identifier: { value: identifier, enumerable: true, configurable: true },
    active: { value: active, enumerable: true, configurable: true },
    x: { value: x3, enumerable: true, configurable: true },
    y: { value: y3, enumerable: true, configurable: true },
    dx: { value: dx, enumerable: true, configurable: true },
    dy: { value: dy, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}
DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a2) {
  if (a2 <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a2 = clampa(this.opacity);
  return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s2, l, a2) {
  if (a2 <= 0)
    h = s2 = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s2 = NaN;
  else if (s2 <= 0)
    h = NaN;
  return new Hsl(h, s2, l, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min4 = Math.min(r, g, b), max5 = Math.max(r, g, b), h = NaN, s2 = max5 - min4, l = (max5 + min4) / 2;
  if (s2) {
    if (r === max5)
      h = (g - b) / s2 + (g < b) * 6;
    else if (g === max5)
      h = (b - r) / s2 + 2;
    else
      h = (r - g) / s2 + 4;
    s2 /= l < 0.5 ? max5 + min4 : 2 - max5 - min4;
    h *= 60;
  } else {
    s2 = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s2, l, o.opacity);
}
function hsl(h, s2, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s2, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s2, l, opacity) {
  this.h = +h;
  this.s = +s2;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s2, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab)
    return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl)
    return hcl2lab(o);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y3 = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x3, z;
  if (r === g && g === b)
    x3 = z = y3;
  else {
    x3 = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y3 - 16, 500 * (x3 - y3), 200 * (y3 - z), o.opacity);
}
function lab(l, a2, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a2, b, opacity == null ? 1 : opacity);
}
function Lab(l, a2, b, opacity) {
  this.l = +l;
  this.a = +a2;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter(k2) {
    return new Lab(this.l + K * (k2 == null ? 1 : k2), this.a, this.b, this.opacity);
  },
  darker(k2) {
    return new Lab(this.l - K * (k2 == null ? 1 : k2), this.a, this.b, this.opacity);
  },
  rgb() {
    var y3 = (this.l + 16) / 116, x3 = isNaN(this.a) ? y3 : y3 + this.a / 500, z = isNaN(this.b) ? y3 : y3 - this.b / 200;
    x3 = Xn * lab2xyz(x3);
    y3 = Yn * lab2xyz(y3);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb(3.1338561 * x3 - 1.6168667 * y3 - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x3 + 1.9161415 * y3 + 0.033454 * z),
      lrgb2rgb(0.0719453 * x3 - 0.2289914 * y3 + 1.4052427 * z),
      this.opacity
    );
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x3) {
  return 255 * (x3 <= 31308e-7 ? 12.92 * x3 : 1.055 * Math.pow(x3, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x3) {
  return (x3 /= 255) <= 0.04045 ? x3 / 12.92 : Math.pow((x3 + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl)
    return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab))
    o = labConvert(o);
  if (o.a === 0 && o.b === 0)
    return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c3, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c3, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c3, l, opacity) {
  this.h = +h;
  this.c = +c3;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h))
    return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k2) {
    return new Hcl(this.h, this.c, this.l + K * (k2 == null ? 1 : k2), this.opacity);
  },
  darker(k2) {
    return new Hcl(this.h, this.c, this.l - K * (k2 == null ? 1 : k2), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix)
    return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k2 = (E * (g - l) - C * bl) / D, s2 = Math.sqrt(k2 * k2 + bl * bl) / (E * l * (1 - l)), h = s2 ? Math.atan2(k2, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s2, l, o.opacity);
}
function cubehelix(h, s2, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s2, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s2, l, opacity) {
  this.h = +h;
  this.s = +s2;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a2 = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh2 = Math.cos(h), sinh2 = Math.sin(h);
    return new Rgb(
      255 * (l + a2 * (A * cosh2 + B * sinh2)),
      255 * (l + a2 * (C * cosh2 + D * sinh2)),
      255 * (l + a2 * (E * cosh2)),
      this.opacity
    );
  }
}));

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basis.js
function basis(t13, v0, v1, v2, v3) {
  var t22 = t13 * t13, t32 = t22 * t13;
  return ((1 - 3 * t13 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t13 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
var constant_default3 = (x3) => () => x3;

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js
function linear(a2, d) {
  return function(t) {
    return a2 + t * d;
  };
}
function exponential(a2, b, y3) {
  return a2 = Math.pow(a2, y3), b = Math.pow(b, y3) - a2, y3 = 1 / y3, function(t) {
    return Math.pow(a2 + t * b, y3);
  };
}
function hue(a2, b) {
  var d = b - a2;
  return d ? linear(a2, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default3(isNaN(a2) ? b : a2);
}
function gamma(y3) {
  return (y3 = +y3) === 1 ? nogamma : function(a2, b) {
    return b - a2 ? exponential(a2, b, y3) : constant_default3(isNaN(a2) ? b : a2);
  };
}
function nogamma(a2, b) {
  var d = b - a2;
  return d ? linear(a2, d) : constant_default3(isNaN(a2) ? b : a2);
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y3) {
  var color2 = gamma(y3);
  function rgb2(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
function number_default(a2, b) {
  return a2 = +a2, b = +b, function(t) {
    return a2 * (1 - t) + b * t;
  };
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero2(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a2, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s2 = [], q2 = [];
  a2 = a2 + "", b = b + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s2[i])
        s2[i] += bs;
      else
        s2[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s2[i])
        s2[i] += bm;
      else
        s2[++i] = bm;
    } else {
      s2[++i] = null;
      q2.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s2[i])
      s2[i] += bs;
    else
      s2[++i] = bs;
  }
  return s2.length < 2 ? q2[0] ? one(q2[0].x) : zero2(b) : (b = q2.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s2[(o = q2[i2]).i] = o.x(t);
    return s2.join("");
  });
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a2, b, c3, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a2 * a2 + b * b))
    a2 /= scaleX, b /= scaleX;
  if (skewX = a2 * c3 + b * d)
    c3 -= a2 * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c3 * c3 + d * d))
    c3 /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a2 * d < b * c3)
    a2 = -a2, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a2) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity2 : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null)
    return identity2;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity2;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s2) {
    return s2.length ? s2.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s2, q2) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push("translate(", null, pxComma, null, pxParen);
      q2.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s2.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a2, b, s2, q2) {
    if (a2 !== b) {
      if (a2 - b > 180)
        b += 360;
      else if (b - a2 > 180)
        a2 += 360;
      q2.push({ i: s2.push(pop(s2) + "rotate(", null, degParen) - 2, x: number_default(a2, b) });
    } else if (b) {
      s2.push(pop(s2) + "rotate(" + b + degParen);
    }
  }
  function skewX(a2, b, s2, q2) {
    if (a2 !== b) {
      q2.push({ i: s2.push(pop(s2) + "skewX(", null, degParen) - 2, x: number_default(a2, b) });
    } else if (b) {
      s2.push(pop(s2) + "skewX(" + b + degParen);
    }
  }
  function scale2(xa, ya, xb, yb, s2, q2) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push(pop(s2) + "scale(", null, ",", null, ")");
      q2.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s2.push(pop(s2) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a2, b) {
    var s2 = [], q2 = [];
    a2 = parse(a2), b = parse(b);
    translate(a2.translateX, a2.translateY, b.translateX, b.translateY, s2, q2);
    rotate(a2.rotate, b.rotate, s2, q2);
    skewX(a2.skewX, b.skewX, s2, q2);
    scale2(a2.scaleX, a2.scaleY, b.scaleX, b.scaleY, s2, q2);
    a2 = b = null;
    return function(t) {
      var i = -1, n = q2.length, o;
      while (++i < n)
        s2[(o = q2[i]).i] = o.x(t);
      return s2.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x3) {
  return ((x3 = Math.exp(x3)) + 1 / x3) / 2;
}
function sinh(x3) {
  return ((x3 = Math.exp(x3)) - 1 / x3) / 2;
}
function tanh(x3) {
  return ((x3 = Math.exp(2 * x3)) - 1) / (x3 + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b02 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b12 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b02 * b02 + 1) - b02), r1 = Math.log(Math.sqrt(b12 * b12 + 1) - b12);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s2 = t * S, coshr0 = cosh(r0), u4 = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s2 + r0) - sinh(r0));
        return [
          ux0 + u4 * dx,
          uy0 + u4 * dy,
          w0 * coshr0 / cosh(rho * s2 + r0)
        ];
      };
    }
    i.duration = S * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom.rho = function(_2) {
    var _1 = Math.max(1e-3, +_2), _22 = _1 * _1, _4 = _22 * _22;
    return zoomRho(_1, _22, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start2, end) {
    var h = hue2((start2 = hsl(start2)).h, (end = hsl(end)).h), s2 = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.h = h(t);
      start2.s = s2(t);
      start2.l = l(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start2, end) {
    var h = hue2((start2 = hcl(start2)).h, (end = hcl(end)).h), c3 = nogamma(start2.c, end.c), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.h = h(t);
      start2.c = c3(t);
      start2.l = l(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y3) {
    y3 = +y3;
    function cubehelix3(start2, end) {
      var h = hue2((start2 = cubehelix(start2)).h, (end = cubehelix(end)).h), s2 = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
      return function(t) {
        start2.h = h(t);
        start2.s = s2(t);
        start2.l = l(Math.pow(t, y3));
        start2.opacity = opacity(t);
        return start2 + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time2) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time2 = (time2 == null ? now() : +time2) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time2;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time2) {
  var t = new Timer();
  t.restart(callback, delay, time2);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t03, t13 = taskHead, t22, time2 = Infinity;
  while (t13) {
    if (t13._call) {
      if (time2 > t13._time)
        time2 = t13._time;
      t03 = t13, t13 = t13._next;
    } else {
      t22 = t13._next, t13._next = null;
      t13 = t03 ? t03._next = t22 : taskHead = t22;
    }
  }
  taskTail = t03;
  sleep(time2);
}
function sleep(time2) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay = time2 - clockNow;
  if (delay > 24) {
    if (time2 < Infinity)
      timeout = setTimeout(wake, time2 - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time2) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time2);
  return t;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id2, index2, group2, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create(node, id2, {
    name,
    index: index2,
    // For context during callback.
    group: group2,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED)
    throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2]))
    throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self) {
  var schedules = node.__transition, tween;
  schedules[id2] = self;
  self.timer = timer(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed)
      start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i, j2, n, o;
    if (self.state !== SCHEDULED)
      return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name)
        continue;
      if (o.state === STARTED)
        return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING)
      return;
    self.state = STARTED;
    tween = new Array(n = self.tween.length);
    for (i = 0, j2 = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j2] = o;
      }
    }
    tween.length = j2 + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id2];
    for (var i in schedules)
      return;
    delete node.__transition;
  }
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2)
    delete node.__transition;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function")
    throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n)
        tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a2, b) {
  var c3;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c3 = color(b)) ? (b = c3, rgb_default) : string_default)(a2, b);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t03, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t03 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t03;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t03, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t03 = (i0 = i) && attrInterpolate(name, i);
    return t03;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function")
    throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (typeof v2 !== "function")
      throw new Error();
    set2(this, id2).ease = v2;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group2 = groups2[j2], n = group2.length, subgroup = subgroups[j2] = [], node, i = 0; i < n; ++i) {
      if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j2 = 0; j2 < m; ++j2) {
    for (var group0 = groups0[j2], group1 = groups1[j2], n = group0.length, merge2 = merges[j2] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge2[i] = node;
      }
    }
  }
  for (; j2 < m0; ++j2) {
    merges[j2] = groups0[j2];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0)
      t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0)
      (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition)
      if (+i !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group2 = groups2[j2], n = group2.length, subgroup = subgroups[j2] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default3(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selectorAll_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = [], parents = [], j2 = 0; j2 < m; ++j2) {
    for (var group2 = groups2[j2], n = group2.length, node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        for (var children2 = select.call(node, node.__data__, i, group2), child, inherit2 = get2(node, id2), k2 = 0, l = children2.length; k2 < l; ++k2) {
          if (child = children2[k2]) {
            schedule_default(child, name, id2, k2, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener)
      (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t03, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t03 = (i0 = i) && textInterpolate(i);
    return t03;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, textTween(value));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups2 = this._groups, m = groups2.length, j2 = 0; j2 < m; ++j2) {
    for (var group2 = groups2[j2], n = group2.length, node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i, group2, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups2, this._parents, name, id1);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0)
      resolve();
  });
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups2, parents, name, id2) {
  this._groups = groups2;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default3,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/poly.js
var exponent = 3;
var polyIn = function custom(e) {
  e = +e;
  function polyIn2(t) {
    return Math.pow(t, e);
  }
  polyIn2.exponent = custom;
  return polyIn2;
}(exponent);
var polyOut = function custom2(e) {
  e = +e;
  function polyOut2(t) {
    return 1 - Math.pow(1 - t, e);
  }
  polyOut2.exponent = custom2;
  return polyOut2;
}(exponent);
var polyInOut = function custom3(e) {
  e = +e;
  function polyInOut2(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }
  polyInOut2.exponent = custom3;
  return polyInOut2;
}(exponent);

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/sin.js
var pi = Math.PI;
var halfPi = pi / 2;

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/math.js
function tpmt(x3) {
  return (Math.pow(2, -10 * x3) - 9765625e-10) * 1.0009775171065494;
}

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/bounce.js
var b1 = 4 / 11;
var b2 = 6 / 11;
var b3 = 8 / 11;
var b4 = 3 / 4;
var b5 = 9 / 11;
var b6 = 10 / 11;
var b7 = 15 / 16;
var b8 = 21 / 22;
var b9 = 63 / 64;
var b0 = 1 / b1 / b1;

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/back.js
var overshoot = 1.70158;
var backIn = function custom4(s2) {
  s2 = +s2;
  function backIn2(t) {
    return (t = +t) * t * (s2 * (t - 1) + t);
  }
  backIn2.overshoot = custom4;
  return backIn2;
}(overshoot);
var backOut = function custom5(s2) {
  s2 = +s2;
  function backOut2(t) {
    return --t * t * ((t + 1) * s2 + t) + 1;
  }
  backOut2.overshoot = custom5;
  return backOut2;
}(overshoot);
var backInOut = function custom6(s2) {
  s2 = +s2;
  function backInOut2(t) {
    return ((t *= 2) < 1 ? t * t * ((s2 + 1) * t - s2) : (t -= 2) * t * ((s2 + 1) * t + s2) + 2) / 2;
  }
  backInOut2.overshoot = custom6;
  return backInOut2;
}(overshoot);

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/elastic.js
var tau = 2 * Math.PI;
var amplitude = 1;
var period = 0.3;
var elasticIn = function custom7(a2, p) {
  var s2 = Math.asin(1 / (a2 = Math.max(1, a2))) * (p /= tau);
  function elasticIn2(t) {
    return a2 * tpmt(- --t) * Math.sin((s2 - t) / p);
  }
  elasticIn2.amplitude = function(a3) {
    return custom7(a3, p * tau);
  };
  elasticIn2.period = function(p2) {
    return custom7(a2, p2);
  };
  return elasticIn2;
}(amplitude, period);
var elasticOut = function custom8(a2, p) {
  var s2 = Math.asin(1 / (a2 = Math.max(1, a2))) * (p /= tau);
  function elasticOut2(t) {
    return 1 - a2 * tpmt(t = +t) * Math.sin((t + s2) / p);
  }
  elasticOut2.amplitude = function(a3) {
    return custom8(a3, p * tau);
  };
  elasticOut2.period = function(p2) {
    return custom8(a2, p2);
  };
  return elasticOut2;
}(amplitude, period);
var elasticInOut = function custom9(a2, p) {
  var s2 = Math.asin(1 / (a2 = Math.max(1, a2))) * (p /= tau);
  function elasticInOut2(t) {
    return ((t = t * 2 - 1) < 0 ? a2 * tpmt(-t) * Math.sin((s2 - t) / p) : 2 - a2 * tpmt(t) * Math.sin((s2 + t) / p)) / 2;
  }
  elasticInOut2.amplitude = function(a3) {
    return custom9(a3, p * tau);
  };
  elasticInOut2.period = function(p2) {
    return custom9(a2, p2);
  };
  return elasticInOut2;
}(amplitude, period);

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups2 = this._groups, m = groups2.length, j2 = 0; j2 < m; ++j2) {
    for (var group2 = groups2[j2], n = group2.length, node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        schedule_default(node, name, id2, i, group2, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups2, this._parents, name, id2);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/brush.js
var { abs, max: max2, min: min2 } = Math;
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x3, e) {
    return x3 == null ? null : [[+x3[0], e[0][1]], [+x3[1], e[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y3, e) {
    return y3 == null ? null : [[e[0][0], +y3[0]], [e[1][0], +y3[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
function type(t) {
  return { type: t };
}

// node_modules/.pnpm/d3-chord@3.0.1/node_modules/d3-chord/src/math.js
var pi2 = Math.PI;
var halfPi2 = pi2 / 2;
var tau2 = pi2 * 2;

// node_modules/.pnpm/d3-path@3.1.0/node_modules/d3-path/src/path.js
var pi3 = Math.PI;
var tau3 = 2 * pi3;
var epsilon = 1e-6;
var tauEpsilon = tau3 - epsilon;
function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0))
    throw new Error(`invalid digits: ${digits}`);
  if (d > 15)
    return append;
  const k2 = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k2) / k2 + strings[i];
    }
  };
}
var Path = class {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x3, y3) {
    this._append`M${this._x0 = this._x1 = +x3},${this._y0 = this._y1 = +y3}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x3, y3) {
    this._append`L${this._x1 = +x3},${this._y1 = +y3}`;
  }
  quadraticCurveTo(x12, y1, x3, y3) {
    this._append`Q${+x12},${+y1},${this._x1 = +x3},${this._y1 = +y3}`;
  }
  bezierCurveTo(x12, y1, x22, y22, x3, y3) {
    this._append`C${+x12},${+y1},${+x22},${+y22},${this._x1 = +x3},${this._y1 = +y3}`;
  }
  arcTo(x12, y1, x22, y22, r) {
    x12 = +x12, y1 = +y1, x22 = +x22, y22 = +y22, r = +r;
    if (r < 0)
      throw new Error(`negative radius: ${r}`);
    let x02 = this._x1, y0 = this._y1, x21 = x22 - x12, y21 = y22 - y1, x01 = x02 - x12, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (this._x1 === null) {
      this._append`M${this._x1 = x12},${this._y1 = y1}`;
    } else if (!(l01_2 > epsilon))
      ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._append`L${this._x1 = x12},${this._y1 = y1}`;
    } else {
      let x20 = x22 - x02, y20 = y22 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi3 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._append`L${x12 + t01 * x01},${y1 + t01 * y01}`;
      }
      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x12 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x3, y3, r, a0, a1, ccw) {
    x3 = +x3, y3 = +y3, r = +r, ccw = !!ccw;
    if (r < 0)
      throw new Error(`negative radius: ${r}`);
    let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x02 = x3 + dx, y0 = y3 + dy, cw = 1 ^ ccw, da2 = ccw ? a0 - a1 : a1 - a0;
    if (this._x1 === null) {
      this._append`M${x02},${y0}`;
    } else if (Math.abs(this._x1 - x02) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._append`L${x02},${y0}`;
    }
    if (!r)
      return;
    if (da2 < 0)
      da2 = da2 % tau3 + tau3;
    if (da2 > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x3 - dx},${y3 - dy}A${r},${r},0,1,${cw},${this._x1 = x02},${this._y1 = y0}`;
    } else if (da2 > epsilon) {
      this._append`A${r},${r},0,${+(da2 >= pi3)},${cw},${this._x1 = x3 + r * Math.cos(a1)},${this._y1 = y3 + r * Math.sin(a1)}`;
    }
  }
  rect(x3, y3, w, h) {
    this._append`M${this._x0 = this._x1 = +x3},${this._y0 = this._y1 = +y3}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
};
function path() {
  return new Path();
}
path.prototype = Path.prototype;

// node_modules/.pnpm/d3-chord@3.0.1/node_modules/d3-chord/src/array.js
var slice2 = Array.prototype.slice;

// node_modules/.pnpm/d3-contour@4.0.2/node_modules/d3-contour/src/array.js
var array3 = Array.prototype;
var slice3 = array3.slice;

// node_modules/.pnpm/robust-predicates@3.0.2/node_modules/robust-predicates/esm/util.js
var epsilon4 = 11102230246251565e-32;
var resulterrbound = (3 + 8 * epsilon4) * epsilon4;
function vec(n) {
  return new Float64Array(n);
}

// node_modules/.pnpm/robust-predicates@3.0.2/node_modules/robust-predicates/esm/orient2d.js
var ccwerrboundA = (3 + 16 * epsilon4) * epsilon4;
var ccwerrboundB = (2 + 12 * epsilon4) * epsilon4;
var ccwerrboundC = (9 + 64 * epsilon4) * epsilon4 * epsilon4;
var B2 = vec(4);
var C1 = vec(8);
var C2 = vec(12);
var D2 = vec(16);
var u = vec(4);

// node_modules/.pnpm/robust-predicates@3.0.2/node_modules/robust-predicates/esm/orient3d.js
var o3derrboundA = (7 + 56 * epsilon4) * epsilon4;
var o3derrboundB = (3 + 28 * epsilon4) * epsilon4;
var o3derrboundC = (26 + 288 * epsilon4) * epsilon4 * epsilon4;
var bc = vec(4);
var ca = vec(4);
var ab = vec(4);
var at_b = vec(4);
var at_c = vec(4);
var bt_c = vec(4);
var bt_a = vec(4);
var ct_a = vec(4);
var ct_b = vec(4);
var bct = vec(8);
var cat = vec(8);
var abt = vec(8);
var u2 = vec(4);
var _8 = vec(8);
var _8b = vec(8);
var _16 = vec(8);
var _12 = vec(12);
var fin = vec(192);
var fin2 = vec(192);

// node_modules/.pnpm/robust-predicates@3.0.2/node_modules/robust-predicates/esm/incircle.js
var iccerrboundA = (10 + 96 * epsilon4) * epsilon4;
var iccerrboundB = (4 + 48 * epsilon4) * epsilon4;
var iccerrboundC = (44 + 576 * epsilon4) * epsilon4 * epsilon4;
var bc2 = vec(4);
var ca2 = vec(4);
var ab2 = vec(4);
var aa = vec(4);
var bb = vec(4);
var cc = vec(4);
var u3 = vec(4);
var v = vec(4);
var axtbc = vec(8);
var aytbc = vec(8);
var bxtca = vec(8);
var bytca = vec(8);
var cxtab = vec(8);
var cytab = vec(8);
var abt2 = vec(8);
var bct2 = vec(8);
var cat2 = vec(8);
var abtt = vec(4);
var bctt = vec(4);
var catt = vec(4);
var _82 = vec(8);
var _162 = vec(16);
var _16b = vec(16);
var _16c = vec(16);
var _32 = vec(32);
var _32b = vec(32);
var _48 = vec(48);
var _64 = vec(64);
var fin3 = vec(1152);
var fin22 = vec(1152);

// node_modules/.pnpm/robust-predicates@3.0.2/node_modules/robust-predicates/esm/insphere.js
var isperrboundA = (16 + 224 * epsilon4) * epsilon4;
var isperrboundB = (5 + 72 * epsilon4) * epsilon4;
var isperrboundC = (71 + 1408 * epsilon4) * epsilon4 * epsilon4;
var ab3 = vec(4);
var bc3 = vec(4);
var cd = vec(4);
var de = vec(4);
var ea = vec(4);
var ac = vec(4);
var bd = vec(4);
var ce = vec(4);
var da = vec(4);
var eb = vec(4);
var abc = vec(24);
var bcd = vec(24);
var cde = vec(24);
var dea = vec(24);
var eab = vec(24);
var abd = vec(24);
var bce = vec(24);
var cda = vec(24);
var deb = vec(24);
var eac = vec(24);
var adet = vec(1152);
var bdet = vec(1152);
var cdet = vec(1152);
var ddet = vec(1152);
var edet = vec(1152);
var abdet = vec(2304);
var cddet = vec(2304);
var cdedet = vec(3456);
var deter = vec(5760);
var _83 = vec(8);
var _8b2 = vec(8);
var _8c = vec(8);
var _163 = vec(16);
var _24 = vec(24);
var _482 = vec(48);
var _48b = vec(48);
var _96 = vec(96);
var _192 = vec(192);
var _384x = vec(384);
var _384y = vec(384);
var _384z = vec(384);
var _768 = vec(768);
var xdet = vec(96);
var ydet = vec(96);
var zdet = vec(96);
var fin4 = vec(1152);

// node_modules/.pnpm/delaunator@5.0.1/node_modules/delaunator/index.js
var EPSILON = Math.pow(2, -52);
var EDGE_STACK = new Uint32Array(512);

// node_modules/.pnpm/d3-delaunay@6.0.4/node_modules/d3-delaunay/src/delaunay.js
var tau4 = 2 * Math.PI;

// node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/dsv.js
var EOL = {};
var EOF = {};
var QUOTE = 34;
var NEWLINE = 10;
var RETURN = 13;
function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + '] || ""';
  }).join(",") + "}");
}
function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}
function inferColumns(rows) {
  var columnSet = /* @__PURE__ */ Object.create(null), columns = [];
  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });
  return columns;
}
function pad(value, width) {
  var s2 = value + "", length = s2.length;
  return length < width ? new Array(width - length + 1).join(0) + s2 : s2;
}
function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6) : year > 9999 ? "+" + pad(year, 6) : pad(year, 4);
}
function formatDate(date) {
  var hours = date.getUTCHours(), minutes = date.getUTCMinutes(), seconds2 = date.getUTCSeconds(), milliseconds2 = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date" : formatYear(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2) + (milliseconds2 ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds2, 2) + "." + pad(milliseconds2, 3) + "Z" : seconds2 ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds2, 2) + "Z" : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z" : "");
}
function dsv_default(delimiter) {
  var reFormat = new RegExp('["' + delimiter + "\n\r]"), DELIMITER = delimiter.charCodeAt(0);
  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert)
        return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }
  function parseRows(text, f) {
    var rows = [], N2 = text.length, I2 = 0, n = 0, t, eof = N2 <= 0, eol = false;
    if (text.charCodeAt(N2 - 1) === NEWLINE)
      --N2;
    if (text.charCodeAt(N2 - 1) === RETURN)
      --N2;
    function token() {
      if (eof)
        return EOF;
      if (eol)
        return eol = false, EOL;
      var i, j2 = I2, c3;
      if (text.charCodeAt(j2) === QUOTE) {
        while (I2++ < N2 && text.charCodeAt(I2) !== QUOTE || text.charCodeAt(++I2) === QUOTE)
          ;
        if ((i = I2) >= N2)
          eof = true;
        else if ((c3 = text.charCodeAt(I2++)) === NEWLINE)
          eol = true;
        else if (c3 === RETURN) {
          eol = true;
          if (text.charCodeAt(I2) === NEWLINE)
            ++I2;
        }
        return text.slice(j2 + 1, i - 1).replace(/""/g, '"');
      }
      while (I2 < N2) {
        if ((c3 = text.charCodeAt(i = I2++)) === NEWLINE)
          eol = true;
        else if (c3 === RETURN) {
          eol = true;
          if (text.charCodeAt(I2) === NEWLINE)
            ++I2;
        } else if (c3 !== DELIMITER)
          continue;
        return text.slice(j2, i);
      }
      return eof = true, text.slice(j2, N2);
    }
    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF)
        row.push(t), t = token();
      if (f && (row = f(row, n++)) == null)
        continue;
      rows.push(row);
    }
    return rows;
  }
  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }
  function format2(rows, columns) {
    if (columns == null)
      columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }
  function formatBody(rows, columns) {
    if (columns == null)
      columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }
  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }
  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }
  function formatValue(value) {
    return value == null ? "" : value instanceof Date ? formatDate(value) : reFormat.test(value += "") ? '"' + value.replace(/"/g, '""') + '"' : value;
  }
  return {
    parse,
    parseRows,
    format: format2,
    formatBody,
    formatRows,
    formatRow,
    formatValue
  };
}

// node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/csv.js
var csv = dsv_default(",");
var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatBody = csv.formatBody;
var csvFormatRows = csv.formatRows;
var csvFormatRow = csv.formatRow;
var csvFormatValue = csv.formatValue;

// node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/tsv.js
var tsv = dsv_default("	");
var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatBody = tsv.formatBody;
var tsvFormatRows = tsv.formatRows;
var tsvFormatRow = tsv.formatRow;
var tsvFormatValue = tsv.formatValue;

// node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/autoType.js
var fixtz = (/* @__PURE__ */ new Date("2019-01-01T00:00")).getHours() || (/* @__PURE__ */ new Date("2019-07-01T00:00")).getHours();

// node_modules/.pnpm/d3-fetch@3.0.1/node_modules/d3-fetch/src/text.js
function responseText(response) {
  if (!response.ok)
    throw new Error(response.status + " " + response.statusText);
  return response.text();
}
function text_default3(input, init2) {
  return fetch(input, init2).then(responseText);
}

// node_modules/.pnpm/d3-fetch@3.0.1/node_modules/d3-fetch/src/dsv.js
function dsvParse(parse) {
  return function(input, init2, row) {
    if (arguments.length === 2 && typeof init2 === "function")
      row = init2, init2 = void 0;
    return text_default3(input, init2).then(function(response) {
      return parse(response, row);
    });
  };
}
var csv2 = dsvParse(csvParse);
var tsv2 = dsvParse(tsvParse);

// node_modules/.pnpm/d3-fetch@3.0.1/node_modules/d3-fetch/src/xml.js
function parser(type2) {
  return (input, init2) => text_default3(input, init2).then((text) => new DOMParser().parseFromString(text, type2));
}
var xml_default = parser("application/xml");
var html = parser("text/html");
var svg = parser("image/svg+xml");

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/add.js
function add_default(d) {
  const x3 = +this._x.call(null, d), y3 = +this._y.call(null, d);
  return add(this.cover(x3, y3), x3, y3, d);
}
function add(tree, x3, y3, d) {
  if (isNaN(x3) || isNaN(y3))
    return tree;
  var parent, node = tree._root, leaf = { data: d }, x02 = tree._x0, y0 = tree._y0, x12 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j2;
  if (!node)
    return tree._root = leaf, tree;
  while (node.length) {
    if (right = x3 >= (xm = (x02 + x12) / 2))
      x02 = xm;
    else
      x12 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2))
      y0 = ym;
    else
      y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right]))
      return parent[i] = leaf, tree;
  }
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x3 === xp && y3 === yp)
    return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x3 >= (xm = (x02 + x12) / 2))
      x02 = xm;
    else
      x12 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2))
      y0 = ym;
    else
      y1 = ym;
  } while ((i = bottom << 1 | right) === (j2 = (yp >= ym) << 1 | xp >= xm));
  return parent[j2] = node, parent[i] = leaf, tree;
}
function addAll(data) {
  var d, i, n = data.length, x3, y3, xz = new Array(n), yz = new Array(n), x02 = Infinity, y0 = Infinity, x12 = -Infinity, y1 = -Infinity;
  for (i = 0; i < n; ++i) {
    if (isNaN(x3 = +this._x.call(null, d = data[i])) || isNaN(y3 = +this._y.call(null, d)))
      continue;
    xz[i] = x3;
    yz[i] = y3;
    if (x3 < x02)
      x02 = x3;
    if (x3 > x12)
      x12 = x3;
    if (y3 < y0)
      y0 = y3;
    if (y3 > y1)
      y1 = y3;
  }
  if (x02 > x12 || y0 > y1)
    return this;
  this.cover(x02, y0).cover(x12, y1);
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }
  return this;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/cover.js
function cover_default(x3, y3) {
  if (isNaN(x3 = +x3) || isNaN(y3 = +y3))
    return this;
  var x02 = this._x0, y0 = this._y0, x12 = this._x1, y1 = this._y1;
  if (isNaN(x02)) {
    x12 = (x02 = Math.floor(x3)) + 1;
    y1 = (y0 = Math.floor(y3)) + 1;
  } else {
    var z = x12 - x02 || 1, node = this._root, parent, i;
    while (x02 > x3 || x3 >= x12 || y0 > y3 || y3 >= y1) {
      i = (y3 < y0) << 1 | x3 < x02;
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0:
          x12 = x02 + z, y1 = y0 + z;
          break;
        case 1:
          x02 = x12 - z, y1 = y0 + z;
          break;
        case 2:
          x12 = x02 + z, y0 = y1 - z;
          break;
        case 3:
          x02 = x12 - z, y0 = y1 - z;
          break;
      }
    }
    if (this._root && this._root.length)
      this._root = node;
  }
  this._x0 = x02;
  this._y0 = y0;
  this._x1 = x12;
  this._y1 = y1;
  return this;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/data.js
function data_default2() {
  var data = [];
  this.visit(function(node) {
    if (!node.length)
      do
        data.push(node.data);
      while (node = node.next);
  });
  return data;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/extent.js
function extent_default(_2) {
  return arguments.length ? this.cover(+_2[0][0], +_2[0][1]).cover(+_2[1][0], +_2[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/quad.js
function quad_default(node, x02, y0, x12, y1) {
  this.node = node;
  this.x0 = x02;
  this.y0 = y0;
  this.x1 = x12;
  this.y1 = y1;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/find.js
function find_default(x3, y3, radius) {
  var data, x02 = this._x0, y0 = this._y0, x12, y1, x22, y22, x32 = this._x1, y32 = this._y1, quads = [], node = this._root, q2, i;
  if (node)
    quads.push(new quad_default(node, x02, y0, x32, y32));
  if (radius == null)
    radius = Infinity;
  else {
    x02 = x3 - radius, y0 = y3 - radius;
    x32 = x3 + radius, y32 = y3 + radius;
    radius *= radius;
  }
  while (q2 = quads.pop()) {
    if (!(node = q2.node) || (x12 = q2.x0) > x32 || (y1 = q2.y0) > y32 || (x22 = q2.x1) < x02 || (y22 = q2.y1) < y0)
      continue;
    if (node.length) {
      var xm = (x12 + x22) / 2, ym = (y1 + y22) / 2;
      quads.push(
        new quad_default(node[3], xm, ym, x22, y22),
        new quad_default(node[2], x12, ym, xm, y22),
        new quad_default(node[1], xm, y1, x22, ym),
        new quad_default(node[0], x12, y1, xm, ym)
      );
      if (i = (y3 >= ym) << 1 | x3 >= xm) {
        q2 = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q2;
      }
    } else {
      var dx = x3 - +this._x.call(null, node.data), dy = y3 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x02 = x3 - d, y0 = y3 - d;
        x32 = x3 + d, y32 = y3 + d;
        data = node.data;
      }
    }
  }
  return data;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/remove.js
function remove_default3(d) {
  if (isNaN(x3 = +this._x.call(null, d)) || isNaN(y3 = +this._y.call(null, d)))
    return this;
  var parent, node = this._root, retainer, previous, next, x02 = this._x0, y0 = this._y0, x12 = this._x1, y1 = this._y1, x3, y3, xm, ym, right, bottom, i, j2;
  if (!node)
    return this;
  if (node.length)
    while (true) {
      if (right = x3 >= (xm = (x02 + x12) / 2))
        x02 = xm;
      else
        x12 = xm;
      if (bottom = y3 >= (ym = (y0 + y1) / 2))
        y0 = ym;
      else
        y1 = ym;
      if (!(parent = node, node = node[i = bottom << 1 | right]))
        return this;
      if (!node.length)
        break;
      if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3])
        retainer = parent, j2 = i;
    }
  while (node.data !== d)
    if (!(previous = node, node = node.next))
      return this;
  if (next = node.next)
    delete node.next;
  if (previous)
    return next ? previous.next = next : delete previous.next, this;
  if (!parent)
    return this._root = next, this;
  next ? parent[i] = next : delete parent[i];
  if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
    if (retainer)
      retainer[j2] = node;
    else
      this._root = node;
  }
  return this;
}
function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i)
    this.remove(data[i]);
  return this;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/root.js
function root_default() {
  return this._root;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/size.js
function size_default2() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length)
      do
        ++size;
      while (node = node.next);
  });
  return size;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/visit.js
function visit_default(callback) {
  var quads = [], q2, node = this._root, child, x02, y0, x12, y1;
  if (node)
    quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
  while (q2 = quads.pop()) {
    if (!callback(node = q2.node, x02 = q2.x0, y0 = q2.y0, x12 = q2.x1, y1 = q2.y1) && node.length) {
      var xm = (x02 + x12) / 2, ym = (y0 + y1) / 2;
      if (child = node[3])
        quads.push(new quad_default(child, xm, ym, x12, y1));
      if (child = node[2])
        quads.push(new quad_default(child, x02, ym, xm, y1));
      if (child = node[1])
        quads.push(new quad_default(child, xm, y0, x12, ym));
      if (child = node[0])
        quads.push(new quad_default(child, x02, y0, xm, ym));
    }
  }
  return this;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/visitAfter.js
function visitAfter_default(callback) {
  var quads = [], next = [], q2;
  if (this._root)
    quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q2 = quads.pop()) {
    var node = q2.node;
    if (node.length) {
      var child, x02 = q2.x0, y0 = q2.y0, x12 = q2.x1, y1 = q2.y1, xm = (x02 + x12) / 2, ym = (y0 + y1) / 2;
      if (child = node[0])
        quads.push(new quad_default(child, x02, y0, xm, ym));
      if (child = node[1])
        quads.push(new quad_default(child, xm, y0, x12, ym));
      if (child = node[2])
        quads.push(new quad_default(child, x02, ym, xm, y1));
      if (child = node[3])
        quads.push(new quad_default(child, xm, ym, x12, y1));
    }
    next.push(q2);
  }
  while (q2 = next.pop()) {
    callback(q2.node, q2.x0, q2.y0, q2.x1, q2.y1);
  }
  return this;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/x.js
function defaultX(d) {
  return d[0];
}
function x_default(_2) {
  return arguments.length ? (this._x = _2, this) : this._x;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/y.js
function defaultY(d) {
  return d[1];
}
function y_default(_2) {
  return arguments.length ? (this._y = _2, this) : this._y;
}

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/quadtree.js
function quadtree(nodes, x3, y3) {
  var tree = new Quadtree(x3 == null ? defaultX : x3, y3 == null ? defaultY : y3, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x3, y3, x02, y0, x12, y1) {
  this._x = x3;
  this._y = y3;
  this._x0 = x02;
  this._y0 = y0;
  this._x1 = x12;
  this._y1 = y1;
  this._root = void 0;
}
function leaf_copy(leaf) {
  var copy3 = { data: leaf.data }, next = copy3;
  while (leaf = leaf.next)
    next = next.next = { data: leaf.data };
  return copy3;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
  var copy3 = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
  if (!node)
    return copy3;
  if (!node.length)
    return copy3._root = leaf_copy(node), copy3;
  nodes = [{ source: node, target: copy3._root = new Array(4) }];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length)
          nodes.push({ source: child, target: node.target[i] = new Array(4) });
        else
          node.target[i] = leaf_copy(child);
      }
    }
  }
  return copy3;
};
treeProto.add = add_default;
treeProto.addAll = addAll;
treeProto.cover = cover_default;
treeProto.data = data_default2;
treeProto.extent = extent_default;
treeProto.find = find_default;
treeProto.remove = remove_default3;
treeProto.removeAll = removeAll;
treeProto.root = root_default;
treeProto.size = size_default2;
treeProto.visit = visit_default;
treeProto.visitAfter = visitAfter_default;
treeProto.x = x_default;
treeProto.y = y_default;

// node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/simulation.js
var initialAngle = Math.PI * (3 - Math.sqrt(5));

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x3) {
  return Math.abs(x3 = Math.round(x3)) >= 1e21 ? x3.toLocaleString("en").replace(/,/g, "") : x3.toString(10);
}
function formatDecimalParts(x3, p) {
  if ((i = (x3 = p ? x3.toExponential(p - 1) : x3.toExponential()).indexOf("e")) < 0)
    return null;
  var i, coefficient = x3.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x3.slice(i + 1)
  ];
}

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/exponent.js
function exponent_default(x3) {
  return x3 = formatDecimalParts(Math.abs(x3)), x3 ? x3[1] : NaN;
}

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j2 = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width)
        g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width)
        break;
      g = grouping[j2 = (j2 + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s2) {
  out:
    for (var n = s2.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s2[i]) {
        case ".":
          i0 = i1 = i;
          break;
        case "0":
          if (i0 === 0)
            i0 = i;
          i1 = i;
          break;
        default:
          if (!+s2[i])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
}

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x3, p) {
  var d = formatDecimalParts(x3, p);
  if (!d)
    return x3 + "";
  var coefficient = d[0], exponent2 = d[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x3, Math.max(0, p + i - 1))[0];
}

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x3, p) {
  var d = formatDecimalParts(x3, p);
  if (!d)
    return x3 + "";
  var coefficient = d[0], exponent2 = d[1];
  return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
}

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x3, p) => (x3 * 100).toFixed(p),
  "b": (x3) => Math.round(x3).toString(2),
  "c": (x3) => x3 + "",
  "d": formatDecimal_default,
  "e": (x3, p) => x3.toExponential(p),
  "f": (x3, p) => x3.toFixed(p),
  "g": (x3, p) => x3.toPrecision(p),
  "o": (x3) => Math.round(x3).toString(8),
  "p": (x3, p) => formatRounded_default(x3 * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x3) => Math.round(x3).toString(16).toUpperCase(),
  "x": (x3) => Math.round(x3).toString(16)
};

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/identity.js
function identity_default2(x3) {
  return x3;
}

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/locale.js
var map3 = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale3) {
  var group2 = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default2 : formatGroup_default(map3.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default2 : formatNumerals_default(map3.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "−" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign3 = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
    if (type2 === "n")
      comma = true, type2 = "g";
    else if (!formatTypes_default[type2])
      precision === void 0 && (precision = 12), trim = true, type2 = "g";
    if (zero3 || fill === "0" && align === "=")
      zero3 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
    var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c3;
      if (type2 === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign3 !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign3 === "(" ? sign3 : minus : sign3 === "-" || sign3 === "(" ? "" : sign3) + valuePrefix;
        valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign3 === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c3 = value.charCodeAt(i), 48 > c3 || c3 > 57) {
              valueSuffix = (c3 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero3)
        value = group2(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero3)
        value = group2(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k2 = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k2 * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/math.js
var epsilon5 = 1e-6;
var epsilon22 = 1e-12;
var pi4 = Math.PI;
var halfPi3 = pi4 / 2;
var quarterPi = pi4 / 4;
var tau5 = pi4 * 2;
var degrees3 = 180 / pi4;
var radians2 = pi4 / 180;
var abs3 = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos2 = Math.cos;
var exp = Math.exp;
var log = Math.log;
var sin2 = Math.sin;
var sign = Math.sign || function(x3) {
  return x3 > 0 ? 1 : x3 < 0 ? -1 : 0;
};
var sqrt = Math.sqrt;
var tan = Math.tan;
function acos(x3) {
  return x3 > 1 ? 0 : x3 < -1 ? pi4 : Math.acos(x3);
}
function asin(x3) {
  return x3 > 1 ? halfPi3 : x3 < -1 ? -halfPi3 : Math.asin(x3);
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/noop.js
function noop3() {
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/area.js
var areaRingSum = new Adder();
var areaSum = new Adder();

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/cartesian.js
function cartesian(spherical2) {
  var lambda = spherical2[0], phi2 = spherical2[1], cosPhi = cos2(phi2);
  return [cosPhi * cos2(lambda), cosPhi * sin2(lambda), sin2(phi2)];
}
function cartesianCross(a2, b) {
  return [a2[1] * b[2] - a2[2] * b[1], a2[2] * b[0] - a2[0] * b[2], a2[0] * b[1] - a2[1] * b[0]];
}
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/rotation.js
function rotationIdentity(lambda, phi2) {
  if (abs3(lambda) > pi4)
    lambda -= Math.round(lambda / tau5) * tau5;
  return [lambda, phi2];
}
rotationIdentity.invert = rotationIdentity;

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/buffer.js
function buffer_default2() {
  var lines = [], line;
  return {
    point: function(x3, y3, m) {
      line.push([x3, y3, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop3,
    rejoin: function() {
      if (lines.length > 1)
        lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/pointEqual.js
function pointEqual_default(a2, b) {
  return abs3(a2[0] - b[0]) < epsilon5 && abs3(a2[1] - b[1]) < epsilon5;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/rejoin.js
function Intersection(point6, points, other, entry) {
  this.x = point6;
  this.z = points;
  this.o = other;
  this.e = entry;
  this.v = false;
  this.n = this.p = null;
}
function rejoin_default(segments, compareIntersection2, startInside, interpolate, stream) {
  var subject = [], clip = [], i, n;
  segments.forEach(function(segment) {
    if ((n2 = segment.length - 1) <= 0)
      return;
    var n2, p0 = segment[0], p1 = segment[n2], x3;
    if (pointEqual_default(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n2; ++i)
          stream.point((p0 = segment[i])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      p1[0] += 2 * epsilon5;
    }
    subject.push(x3 = new Intersection(p0, segment, null, true));
    clip.push(x3.o = new Intersection(p0, null, x3, false));
    subject.push(x3 = new Intersection(p1, segment, null, false));
    clip.push(x3.o = new Intersection(p1, null, x3, true));
  });
  if (!subject.length)
    return;
  clip.sort(compareIntersection2);
  link(subject);
  link(clip);
  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }
  var start2 = subject[0], points, point6;
  while (1) {
    var current = start2, isSubject = true;
    while (current.v)
      if ((current = current.n) === start2)
        return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i)
            stream.point((point6 = points[i])[0], point6[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i)
            stream.point((point6 = points[i])[0], point6[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}
function link(array4) {
  if (!(n = array4.length))
    return;
  var n, i = 0, a2 = array4[0], b;
  while (++i < n) {
    a2.n = b = array4[i];
    b.p = a2;
    a2 = b;
  }
  a2.n = b = array4[0];
  b.p = a2;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/polygonContains.js
function longitude(point6) {
  return abs3(point6[0]) <= pi4 ? point6[0] : sign(point6[0]) * ((abs3(point6[0]) + pi4) % tau5 - pi4);
}
function polygonContains_default(polygon, point6) {
  var lambda = longitude(point6), phi2 = point6[1], sinPhi = sin2(phi2), normal = [sin2(lambda), -cos2(lambda), 0], angle = 0, winding = 0;
  var sum4 = new Adder();
  if (sinPhi === 1)
    phi2 = halfPi3 + epsilon5;
  else if (sinPhi === -1)
    phi2 = -halfPi3 - epsilon5;
  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length))
      continue;
    var ring, m, point0 = ring[m - 1], lambda0 = longitude(point0), phi0 = point0[1] / 2 + quarterPi, sinPhi0 = sin2(phi0), cosPhi0 = cos2(phi0);
    for (var j2 = 0; j2 < m; ++j2, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j2], lambda1 = longitude(point1), phi1 = point1[1] / 2 + quarterPi, sinPhi1 = sin2(phi1), cosPhi1 = cos2(phi1), delta = lambda1 - lambda0, sign3 = delta >= 0 ? 1 : -1, absDelta = sign3 * delta, antimeridian = absDelta > pi4, k2 = sinPhi0 * sinPhi1;
      sum4.add(atan2(k2 * sign3 * sin2(absDelta), cosPhi0 * cosPhi1 + k2 * cos2(absDelta)));
      angle += antimeridian ? delta + sign3 * tau5 : delta;
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection2 = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection2);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection2[2]);
        if (phi2 > phiArc || phi2 === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }
  return (angle < -epsilon5 || angle < epsilon5 && sum4 < -epsilon22) ^ winding & 1;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/index.js
function clip_default(pointVisible, clipLine, interpolate, start2) {
  return function(sink) {
    var line = clipLine(sink), ringBuffer = buffer_default2(), ringSink = clipLine(ringBuffer), polygonStarted = false, polygon, segments, ring;
    var clip = {
      point: point6,
      lineStart,
      lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point6;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains_default(polygon, start2);
        if (segments.length) {
          if (!polygonStarted)
            sink.polygonStart(), polygonStarted = true;
          rejoin_default(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted)
            sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted)
          sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };
    function point6(lambda, phi2) {
      if (pointVisible(lambda, phi2))
        sink.point(lambda, phi2);
    }
    function pointLine(lambda, phi2) {
      line.point(lambda, phi2);
    }
    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }
    function lineEnd() {
      clip.point = point6;
      line.lineEnd();
    }
    function pointRing(lambda, phi2) {
      ring.push([lambda, phi2]);
      ringSink.point(lambda, phi2);
    }
    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }
    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();
      var clean = ringSink.clean(), ringSegments = ringBuffer.result(), i, n = ringSegments.length, m, segment, point7;
      ring.pop();
      polygon.push(ring);
      ring = null;
      if (!n)
        return;
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted)
            sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i)
            sink.point((point7 = segment[i])[0], point7[1]);
          sink.lineEnd();
        }
        return;
      }
      if (n > 1 && clean & 2)
        ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
      segments.push(ringSegments.filter(validSegment));
    }
    return clip;
  };
}
function validSegment(segment) {
  return segment.length > 1;
}
function compareIntersection(a2, b) {
  return ((a2 = a2.x)[0] < 0 ? a2[1] - halfPi3 - epsilon5 : halfPi3 - a2[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi3 - epsilon5 : halfPi3 - b[1]);
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/antimeridian.js
var antimeridian_default = clip_default(
  function() {
    return true;
  },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi4, -halfPi3]
);
function clipAntimeridianLine(stream) {
  var lambda0 = NaN, phi0 = NaN, sign0 = NaN, clean;
  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi4 : -pi4, delta = abs3(lambda1 - lambda0);
      if (abs3(delta - pi4) < epsilon5) {
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi3 : -halfPi3);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi4) {
        if (abs3(lambda0 - sign0) < epsilon5)
          lambda0 -= sign0 * epsilon5;
        if (abs3(lambda1 - sign1) < epsilon5)
          lambda1 -= sign1 * epsilon5;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean;
    }
  };
}
function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0, cosPhi1, sinLambda0Lambda1 = sin2(lambda0 - lambda1);
  return abs3(sinLambda0Lambda1) > epsilon5 ? atan((sin2(phi0) * (cosPhi1 = cos2(phi1)) * sin2(lambda1) - sin2(phi1) * (cosPhi0 = cos2(phi0)) * sin2(lambda0)) / (cosPhi0 * cosPhi1 * sinLambda0Lambda1)) : (phi0 + phi1) / 2;
}
function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi2;
  if (from == null) {
    phi2 = direction * halfPi3;
    stream.point(-pi4, phi2);
    stream.point(0, phi2);
    stream.point(pi4, phi2);
    stream.point(pi4, 0);
    stream.point(pi4, -phi2);
    stream.point(0, -phi2);
    stream.point(-pi4, -phi2);
    stream.point(-pi4, 0);
    stream.point(-pi4, phi2);
  } else if (abs3(from[0] - to[0]) > epsilon5) {
    var lambda = from[0] < to[0] ? pi4 : -pi4;
    phi2 = direction * lambda / 2;
    stream.point(-lambda, phi2);
    stream.point(0, phi2);
    stream.point(lambda, phi2);
  } else {
    stream.point(to[0], to[1]);
  }
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/rectangle.js
var clipMax = 1e9;
var clipMin = -clipMax;

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/area.js
var areaSum2 = new Adder();
var areaRingSum2 = new Adder();

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/bounds.js
var x0 = Infinity;
var x1 = -x0;

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/context.js
function PathContext(context) {
  this._context = context;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_2) {
    return this._radius = _2, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0)
      this._context.closePath();
    this._point = NaN;
  },
  point: function(x3, y3) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x3, y3);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x3, y3);
        break;
      }
      default: {
        this._context.moveTo(x3 + this._radius, y3);
        this._context.arc(x3, y3, this._radius, 0, tau5);
        break;
      }
    }
  },
  result: noop3
};

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/measure.js
var lengthSum = new Adder();

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/transform.js
function transformer(methods) {
  return function(stream) {
    var s2 = new TransformStream();
    for (var key in methods)
      s2[key] = methods[key];
    s2.stream = stream;
    return s2;
  };
}
function TransformStream() {
}
TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x3, y3) {
    this.stream.point(x3, y3);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/resample.js
var cosMinDistance = cos2(30 * radians2);

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/index.js
var transformRadians = transformer({
  point: function(x3, y3) {
    this.stream.point(x3 * radians2, y3 * radians2);
  }
});

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/azimuthal.js
function azimuthalRaw(scale2) {
  return function(x3, y3) {
    var cx = cos2(x3), cy = cos2(y3), k2 = scale2(cx * cy);
    if (k2 === Infinity)
      return [2, 0];
    return [
      k2 * cy * sin2(x3),
      k2 * sin2(y3)
    ];
  };
}
function azimuthalInvert(angle) {
  return function(x3, y3) {
    var z = sqrt(x3 * x3 + y3 * y3), c3 = angle(z), sc = sin2(c3), cc2 = cos2(c3);
    return [
      atan2(x3 * sc, z * cc2),
      asin(z && y3 * sc / z)
    ];
  };
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/azimuthalEqualArea.js
var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});
azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
  return 2 * asin(z / 2);
});

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/azimuthalEquidistant.js
var azimuthalEquidistantRaw = azimuthalRaw(function(c3) {
  return (c3 = acos(c3)) && c3 / sin2(c3);
});
azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/mercator.js
function mercatorRaw(lambda, phi2) {
  return [lambda, log(tan((halfPi3 + phi2) / 2))];
}
mercatorRaw.invert = function(x3, y3) {
  return [x3, 2 * atan(exp(y3)) - halfPi3];
};

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/equirectangular.js
function equirectangularRaw(lambda, phi2) {
  return [lambda, phi2];
}
equirectangularRaw.invert = equirectangularRaw;

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/equalEarth.js
var A1 = 1.340264;
var A2 = -0.081106;
var A3 = 893e-6;
var A4 = 3796e-6;
var M = sqrt(3) / 2;
var iterations = 12;
function equalEarthRaw(lambda, phi2) {
  var l = asin(M * sin2(phi2)), l2 = l * l, l6 = l2 * l2 * l2;
  return [
    lambda * cos2(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
  ];
}
equalEarthRaw.invert = function(x3, y3) {
  var l = y3, l2 = l * l, l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y3;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (abs3(delta) < epsilon22)
      break;
  }
  return [
    M * x3 * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos2(l),
    asin(sin2(l) / M)
  ];
};

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/gnomonic.js
function gnomonicRaw(x3, y3) {
  var cy = cos2(y3), k2 = cos2(x3) * cy;
  return [cy * sin2(x3) / k2, sin2(y3) / k2];
}
gnomonicRaw.invert = azimuthalInvert(atan);

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/naturalEarth1.js
function naturalEarth1Raw(lambda, phi2) {
  var phi22 = phi2 * phi2, phi4 = phi22 * phi22;
  return [
    lambda * (0.8707 - 0.131979 * phi22 + phi4 * (-0.013791 + phi4 * (3971e-6 * phi22 - 1529e-6 * phi4))),
    phi2 * (1.007226 + phi22 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi22 - 5916e-6 * phi4)))
  ];
}
naturalEarth1Raw.invert = function(x3, y3) {
  var phi2 = y3, i = 25, delta;
  do {
    var phi22 = phi2 * phi2, phi4 = phi22 * phi22;
    phi2 -= delta = (phi2 * (1.007226 + phi22 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi22 - 5916e-6 * phi4))) - y3) / (1.007226 + phi22 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi22 - 5916e-6 * 11 * phi4)));
  } while (abs3(delta) > epsilon5 && --i > 0);
  return [
    x3 / (0.8707 + (phi22 = phi2 * phi2) * (-0.131979 + phi22 * (-0.013791 + phi22 * phi22 * phi22 * (3971e-6 - 1529e-6 * phi22)))),
    phi2
  ];
};

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/orthographic.js
function orthographicRaw(x3, y3) {
  return [cos2(y3) * sin2(x3), sin2(y3)];
}
orthographicRaw.invert = azimuthalInvert(asin);

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/stereographic.js
function stereographicRaw(x3, y3) {
  var cy = cos2(y3), k2 = 1 + cos2(x3) * cy;
  return [cy * sin2(x3) / k2, sin2(y3) / k2];
}
stereographicRaw.invert = azimuthalInvert(function(z) {
  return 2 * atan(z);
});

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/transverseMercator.js
function transverseMercatorRaw(lambda, phi2) {
  return [log(tan((halfPi3 + phi2) / 2)), -lambda];
}
transverseMercatorRaw.invert = function(x3, y3) {
  return [-y3, 2 * atan(exp(x3)) - halfPi3];
};

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/count.js
function count2(node) {
  var sum4 = 0, children2 = node.children, i = children2 && children2.length;
  if (!i)
    sum4 = 1;
  else
    while (--i >= 0)
      sum4 += children2[i].value;
  node.value = sum4;
}
function count_default() {
  return this.eachAfter(count2);
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/each.js
function each_default2(callback, that) {
  let index2 = -1;
  for (const node of this) {
    callback.call(that, node, ++index2, this);
  }
  return this;
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/eachBefore.js
function eachBefore_default(callback, that) {
  var node = this, nodes = [node], children2, i, index2 = -1;
  while (node = nodes.pop()) {
    callback.call(that, node, ++index2, this);
    if (children2 = node.children) {
      for (i = children2.length - 1; i >= 0; --i) {
        nodes.push(children2[i]);
      }
    }
  }
  return this;
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/eachAfter.js
function eachAfter_default(callback, that) {
  var node = this, nodes = [node], next = [], children2, i, n, index2 = -1;
  while (node = nodes.pop()) {
    next.push(node);
    if (children2 = node.children) {
      for (i = 0, n = children2.length; i < n; ++i) {
        nodes.push(children2[i]);
      }
    }
  }
  while (node = next.pop()) {
    callback.call(that, node, ++index2, this);
  }
  return this;
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/find.js
function find_default2(callback, that) {
  let index2 = -1;
  for (const node of this) {
    if (callback.call(that, node, ++index2, this)) {
      return node;
    }
  }
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/sum.js
function sum_default(value) {
  return this.eachAfter(function(node) {
    var sum4 = +value(node.data) || 0, children2 = node.children, i = children2 && children2.length;
    while (--i >= 0)
      sum4 += children2[i].value;
    node.value = sum4;
  });
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/sort.js
function sort_default2(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/path.js
function path_default2(end) {
  var start2 = this, ancestor = leastCommonAncestor(start2, end), nodes = [start2];
  while (start2 !== ancestor) {
    start2 = start2.parent;
    nodes.push(start2);
  }
  var k2 = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k2, 0, end);
    end = end.parent;
  }
  return nodes;
}
function leastCommonAncestor(a2, b) {
  if (a2 === b)
    return a2;
  var aNodes = a2.ancestors(), bNodes = b.ancestors(), c3 = null;
  a2 = aNodes.pop();
  b = bNodes.pop();
  while (a2 === b) {
    c3 = a2;
    a2 = aNodes.pop();
    b = bNodes.pop();
  }
  return c3;
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/ancestors.js
function ancestors_default() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/descendants.js
function descendants_default() {
  return Array.from(this);
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/leaves.js
function leaves_default() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/links.js
function links_default() {
  var root2 = this, links = [];
  root2.each(function(node) {
    if (node !== root2) {
      links.push({ source: node.parent, target: node });
    }
  });
  return links;
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/iterator.js
function* iterator_default2() {
  var node = this, current, next = [node], children2, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      yield node;
      if (children2 = node.children) {
        for (i = 0, n = children2.length; i < n; ++i) {
          next.push(children2[i]);
        }
      }
    }
  } while (next.length);
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/index.js
function hierarchy(data, children2) {
  if (data instanceof Map) {
    data = [void 0, data];
    if (children2 === void 0)
      children2 = mapChildren;
  } else if (children2 === void 0) {
    children2 = objectChildren;
  }
  var root2 = new Node2(data), node, nodes = [root2], child, childs, i, n;
  while (node = nodes.pop()) {
    if ((childs = children2(node.data)) && (n = (childs = Array.from(childs)).length)) {
      node.children = childs;
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = childs[i] = new Node2(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }
  return root2.eachBefore(computeHeight);
}
function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}
function objectChildren(d) {
  return d.children;
}
function mapChildren(d) {
  return Array.isArray(d) ? d[1] : null;
}
function copyData(node) {
  if (node.data.value !== void 0)
    node.value = node.data.value;
  node.data = node.data.data;
}
function computeHeight(node) {
  var height = 0;
  do
    node.height = height;
  while ((node = node.parent) && node.height < ++height);
}
function Node2(data) {
  this.data = data;
  this.depth = this.height = 0;
  this.parent = null;
}
Node2.prototype = hierarchy.prototype = {
  constructor: Node2,
  count: count_default,
  each: each_default2,
  eachAfter: eachAfter_default,
  eachBefore: eachBefore_default,
  find: find_default2,
  sum: sum_default,
  sort: sort_default2,
  path: path_default2,
  ancestors: ancestors_default,
  descendants: descendants_default,
  leaves: leaves_default,
  links: links_default,
  copy: node_copy,
  [Symbol.iterator]: iterator_default2
};

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/dice.js
function dice_default(parent, x02, y0, x12, y1) {
  var nodes = parent.children, node, i = -1, n = nodes.length, k2 = parent.value && (x12 - x02) / parent.value;
  while (++i < n) {
    node = nodes[i], node.y0 = y0, node.y1 = y1;
    node.x0 = x02, node.x1 = x02 += node.value * k2;
  }
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/tree.js
function TreeNode(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null;
  this.a = this;
  this.z = 0;
  this.m = 0;
  this.c = 0;
  this.s = 0;
  this.t = null;
  this.i = i;
}
TreeNode.prototype = Object.create(Node2.prototype);

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/slice.js
function slice_default(parent, x02, y0, x12, y1) {
  var nodes = parent.children, node, i = -1, n = nodes.length, k2 = parent.value && (y1 - y0) / parent.value;
  while (++i < n) {
    node = nodes[i], node.x0 = x02, node.x1 = x12;
    node.y0 = y0, node.y1 = y0 += node.value * k2;
  }
}

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/squarify.js
var phi = (1 + Math.sqrt(5)) / 2;
function squarifyRatio(ratio, parent, x02, y0, x12, y1) {
  var rows = [], nodes = parent.children, row, nodeValue, i0 = 0, i1 = 0, n = nodes.length, dx, dy, value = parent.value, sumValue, minValue, maxValue, newRatio, minRatio, alpha, beta;
  while (i0 < n) {
    dx = x12 - x02, dy = y1 - y0;
    do
      sumValue = nodes[i1++].value;
    while (!sumValue && i1 < n);
    minValue = maxValue = sumValue;
    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);
    for (; i1 < n; ++i1) {
      sumValue += nodeValue = nodes[i1].value;
      if (nodeValue < minValue)
        minValue = nodeValue;
      if (nodeValue > maxValue)
        maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) {
        sumValue -= nodeValue;
        break;
      }
      minRatio = newRatio;
    }
    rows.push(row = { value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1) });
    if (row.dice)
      dice_default(row, x02, y0, x12, value ? y0 += dy * sumValue / value : y1);
    else
      slice_default(row, x02, y0, value ? x02 += dx * sumValue / value : x12, y1);
    value -= sumValue, i0 = i1;
  }
  return rows;
}
var squarify_default = function custom10(ratio) {
  function squarify(parent, x02, y0, x12, y1) {
    squarifyRatio(ratio, parent, x02, y0, x12, y1);
  }
  squarify.ratio = function(x3) {
    return custom10((x3 = +x3) > 1 ? x3 : 1);
  };
  return squarify;
}(phi);

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/resquarify.js
var resquarify_default = function custom11(ratio) {
  function resquarify(parent, x02, y0, x12, y1) {
    if ((rows = parent._squarify) && rows.ratio === ratio) {
      var rows, row, nodes, i, j2 = -1, n, m = rows.length, value = parent.value;
      while (++j2 < m) {
        row = rows[j2], nodes = row.children;
        for (i = row.value = 0, n = nodes.length; i < n; ++i)
          row.value += nodes[i].value;
        if (row.dice)
          dice_default(row, x02, y0, x12, value ? y0 += (y1 - y0) * row.value / value : y1);
        else
          slice_default(row, x02, y0, value ? x02 += (x12 - x02) * row.value / value : x12, y1);
        value -= row.value;
      }
    } else {
      parent._squarify = rows = squarifyRatio(ratio, parent, x02, y0, x12, y1);
      rows.ratio = ratio;
    }
  }
  resquarify.ratio = function(x3) {
    return custom11((x3 = +x3) > 1 ? x3 : 1);
  };
  return resquarify;
}(phi);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/defaultSource.js
var defaultSource_default = Math.random;

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/uniform.js
var uniform_default = function sourceRandomUniform(source) {
  function randomUniform(min4, max5) {
    min4 = min4 == null ? 0 : +min4;
    max5 = max5 == null ? 1 : +max5;
    if (arguments.length === 1)
      max5 = min4, min4 = 0;
    else
      max5 -= min4;
    return function() {
      return source() * max5 + min4;
    };
  }
  randomUniform.source = sourceRandomUniform;
  return randomUniform;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/int.js
var int_default = function sourceRandomInt(source) {
  function randomInt(min4, max5) {
    if (arguments.length < 2)
      max5 = min4, min4 = 0;
    min4 = Math.floor(min4);
    max5 = Math.floor(max5) - min4;
    return function() {
      return Math.floor(source() * max5 + min4);
    };
  }
  randomInt.source = sourceRandomInt;
  return randomInt;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/normal.js
var normal_default = function sourceRandomNormal(source) {
  function randomNormal(mu, sigma) {
    var x3, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function() {
      var y3;
      if (x3 != null)
        y3 = x3, x3 = null;
      else
        do {
          x3 = source() * 2 - 1;
          y3 = source() * 2 - 1;
          r = x3 * x3 + y3 * y3;
        } while (!r || r > 1);
      return mu + sigma * y3 * Math.sqrt(-2 * Math.log(r) / r);
    };
  }
  randomNormal.source = sourceRandomNormal;
  return randomNormal;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/logNormal.js
var logNormal_default = function sourceRandomLogNormal(source) {
  var N2 = normal_default.source(source);
  function randomLogNormal() {
    var randomNormal = N2.apply(this, arguments);
    return function() {
      return Math.exp(randomNormal());
    };
  }
  randomLogNormal.source = sourceRandomLogNormal;
  return randomLogNormal;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/irwinHall.js
var irwinHall_default = function sourceRandomIrwinHall(source) {
  function randomIrwinHall(n) {
    if ((n = +n) <= 0)
      return () => 0;
    return function() {
      for (var sum4 = 0, i = n; i > 1; --i)
        sum4 += source();
      return sum4 + i * source();
    };
  }
  randomIrwinHall.source = sourceRandomIrwinHall;
  return randomIrwinHall;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/bates.js
var bates_default = function sourceRandomBates(source) {
  var I2 = irwinHall_default.source(source);
  function randomBates(n) {
    if ((n = +n) === 0)
      return source;
    var randomIrwinHall = I2(n);
    return function() {
      return randomIrwinHall() / n;
    };
  }
  randomBates.source = sourceRandomBates;
  return randomBates;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/exponential.js
var exponential_default = function sourceRandomExponential(source) {
  function randomExponential(lambda) {
    return function() {
      return -Math.log1p(-source()) / lambda;
    };
  }
  randomExponential.source = sourceRandomExponential;
  return randomExponential;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/pareto.js
var pareto_default = function sourceRandomPareto(source) {
  function randomPareto(alpha) {
    if ((alpha = +alpha) < 0)
      throw new RangeError("invalid alpha");
    alpha = 1 / -alpha;
    return function() {
      return Math.pow(1 - source(), alpha);
    };
  }
  randomPareto.source = sourceRandomPareto;
  return randomPareto;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/bernoulli.js
var bernoulli_default = function sourceRandomBernoulli(source) {
  function randomBernoulli(p) {
    if ((p = +p) < 0 || p > 1)
      throw new RangeError("invalid p");
    return function() {
      return Math.floor(source() + p);
    };
  }
  randomBernoulli.source = sourceRandomBernoulli;
  return randomBernoulli;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/geometric.js
var geometric_default = function sourceRandomGeometric(source) {
  function randomGeometric(p) {
    if ((p = +p) < 0 || p > 1)
      throw new RangeError("invalid p");
    if (p === 0)
      return () => Infinity;
    if (p === 1)
      return () => 1;
    p = Math.log1p(-p);
    return function() {
      return 1 + Math.floor(Math.log1p(-source()) / p);
    };
  }
  randomGeometric.source = sourceRandomGeometric;
  return randomGeometric;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/gamma.js
var gamma_default = function sourceRandomGamma(source) {
  var randomNormal = normal_default.source(source)();
  function randomGamma(k2, theta) {
    if ((k2 = +k2) < 0)
      throw new RangeError("invalid k");
    if (k2 === 0)
      return () => 0;
    theta = theta == null ? 1 : +theta;
    if (k2 === 1)
      return () => -Math.log1p(-source()) * theta;
    var d = (k2 < 1 ? k2 + 1 : k2) - 1 / 3, c3 = 1 / (3 * Math.sqrt(d)), multiplier = k2 < 1 ? () => Math.pow(source(), 1 / k2) : () => 1;
    return function() {
      do {
        do {
          var x3 = randomNormal(), v2 = 1 + c3 * x3;
        } while (v2 <= 0);
        v2 *= v2 * v2;
        var u4 = 1 - source();
      } while (u4 >= 1 - 0.0331 * x3 * x3 * x3 * x3 && Math.log(u4) >= 0.5 * x3 * x3 + d * (1 - v2 + Math.log(v2)));
      return d * v2 * multiplier() * theta;
    };
  }
  randomGamma.source = sourceRandomGamma;
  return randomGamma;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/beta.js
var beta_default = function sourceRandomBeta(source) {
  var G2 = gamma_default.source(source);
  function randomBeta(alpha, beta) {
    var X2 = G2(alpha), Y3 = G2(beta);
    return function() {
      var x3 = X2();
      return x3 === 0 ? 0 : x3 / (x3 + Y3());
    };
  }
  randomBeta.source = sourceRandomBeta;
  return randomBeta;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/binomial.js
var binomial_default = function sourceRandomBinomial(source) {
  var G2 = geometric_default.source(source), B4 = beta_default.source(source);
  function randomBinomial(n, p) {
    n = +n;
    if ((p = +p) >= 1)
      return () => n;
    if (p <= 0)
      return () => 0;
    return function() {
      var acc = 0, nn = n, pp = p;
      while (nn * pp > 16 && nn * (1 - pp) > 16) {
        var i = Math.floor((nn + 1) * pp), y3 = B4(i, nn - i + 1)();
        if (y3 <= pp) {
          acc += i;
          nn -= i;
          pp = (pp - y3) / (1 - y3);
        } else {
          nn = i - 1;
          pp /= y3;
        }
      }
      var sign3 = pp < 0.5, pFinal = sign3 ? pp : 1 - pp, g = G2(pFinal);
      for (var s2 = g(), k2 = 0; s2 <= nn; ++k2)
        s2 += g();
      return acc + (sign3 ? k2 : nn - k2);
    };
  }
  randomBinomial.source = sourceRandomBinomial;
  return randomBinomial;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/weibull.js
var weibull_default = function sourceRandomWeibull(source) {
  function randomWeibull(k2, a2, b) {
    var outerFunc;
    if ((k2 = +k2) === 0) {
      outerFunc = (x3) => -Math.log(x3);
    } else {
      k2 = 1 / k2;
      outerFunc = (x3) => Math.pow(x3, k2);
    }
    a2 = a2 == null ? 0 : +a2;
    b = b == null ? 1 : +b;
    return function() {
      return a2 + b * outerFunc(-Math.log1p(-source()));
    };
  }
  randomWeibull.source = sourceRandomWeibull;
  return randomWeibull;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/cauchy.js
var cauchy_default = function sourceRandomCauchy(source) {
  function randomCauchy(a2, b) {
    a2 = a2 == null ? 0 : +a2;
    b = b == null ? 1 : +b;
    return function() {
      return a2 + b * Math.tan(Math.PI * source());
    };
  }
  randomCauchy.source = sourceRandomCauchy;
  return randomCauchy;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/logistic.js
var logistic_default = function sourceRandomLogistic(source) {
  function randomLogistic(a2, b) {
    a2 = a2 == null ? 0 : +a2;
    b = b == null ? 1 : +b;
    return function() {
      var u4 = source();
      return a2 + b * Math.log(u4 / (1 - u4));
    };
  }
  randomLogistic.source = sourceRandomLogistic;
  return randomLogistic;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/poisson.js
var poisson_default = function sourceRandomPoisson(source) {
  var G2 = gamma_default.source(source), B4 = binomial_default.source(source);
  function randomPoisson(lambda) {
    return function() {
      var acc = 0, l = lambda;
      while (l > 16) {
        var n = Math.floor(0.875 * l), t = G2(n)();
        if (t > l)
          return acc + B4(n - 1, l / t)();
        acc += n;
        l -= t;
      }
      for (var s2 = -Math.log1p(-source()), k2 = 0; s2 <= l; ++k2)
        s2 -= Math.log1p(-source());
      return acc + k2;
    };
  }
  randomPoisson.source = sourceRandomPoisson;
  return randomPoisson;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/lcg.js
var eps = 1 / 4294967296;

// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/init.js
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}

// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
  var index2 = new InternMap(), domain = [], range2 = [], unknown = implicit;
  function scale2(d) {
    let i = index2.get(d);
    if (i === void 0) {
      if (unknown !== implicit)
        return unknown;
      index2.set(d, i = domain.push(d) - 1);
    }
    return range2[i % range2.length];
  }
  scale2.domain = function(_2) {
    if (!arguments.length)
      return domain.slice();
    domain = [], index2 = new InternMap();
    for (const value of _2) {
      if (index2.has(value))
        continue;
      index2.set(value, domain.push(value) - 1);
    }
    return scale2;
  };
  scale2.range = function(_2) {
    return arguments.length ? (range2 = Array.from(_2), scale2) : range2.slice();
  };
  scale2.unknown = function(_2) {
    return arguments.length ? (unknown = _2, scale2) : unknown;
  };
  scale2.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale2, arguments);
  return scale2;
}

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/interval.js
var t02 = /* @__PURE__ */ new Date();
var t12 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count3, field) {
  function interval2(date) {
    return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
  }
  interval2.floor = (date) => {
    return floori(date = /* @__PURE__ */ new Date(+date)), date;
  };
  interval2.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval2.round = (date) => {
    const d0 = interval2(date), d1 = interval2.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval2.offset = (date, step) => {
    return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval2.range = (start2, stop, step) => {
    const range2 = [];
    start2 = interval2.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop) || !(step > 0))
      return range2;
    let previous;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop);
    return range2;
  };
  interval2.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date)
        while (floori(date), !test(date))
          date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date, 1), !test(date)) {
            }
          }
      }
    });
  };
  if (count3) {
    interval2.count = (start2, end) => {
      t02.setTime(+start2), t12.setTime(+end);
      floori(t02), floori(t12);
      return Math.floor(count3(t02, t12));
    };
    interval2.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval2 : interval2.filter(field ? (d) => field(d) % step === 0 : (d) => interval2.count(0, d) % step === 0);
    };
  }
  return interval2;
}

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/millisecond.js
var millisecond = timeInterval(() => {
}, (date, step) => {
  date.setTime(+date + step);
}, (start2, end) => {
  return end - start2;
});
millisecond.every = (k2) => {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0))
    return null;
  if (!(k2 > 1))
    return millisecond;
  return timeInterval((date) => {
    date.setTime(Math.floor(date / k2) * k2);
  }, (date, step) => {
    date.setTime(+date + step * k2);
  }, (start2, end) => {
    return (end - start2) / k2;
  });
};
var milliseconds = millisecond.range;

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/second.js
var second = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * durationSecond);
}, (start2, end) => {
  return (end - start2) / durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});
var seconds = second.range;

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/minute.js
var timeMinute = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start2, end) => {
  return (end - start2) / durationMinute;
}, (date) => {
  return date.getMinutes();
});
var timeMinutes = timeMinute.range;
var utcMinute = timeInterval((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start2, end) => {
  return (end - start2) / durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});
var utcMinutes = utcMinute.range;

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/hour.js
var timeHour = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start2, end) => {
  return (end - start2) / durationHour;
}, (date) => {
  return date.getHours();
});
var timeHours = timeHour.range;
var utcHour = timeInterval((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start2, end) => {
  return (end - start2) / durationHour;
}, (date) => {
  return date.getUTCHours();
});
var utcHours = utcHour.range;

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/day.js
var timeDay = timeInterval(
  (date) => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start2, end) => (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationDay,
  (date) => date.getDate() - 1
);
var timeDays = timeDay.range;
var utcDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start2, end) => {
  return (end - start2) / durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});
var utcDays = utcDay.range;
var unixDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start2, end) => {
  return (end - start2) / durationDay;
}, (date) => {
  return Math.floor(date / durationDay);
});
var unixDays = unixDay.range;

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start2, end) => {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var timeSunday = timeWeekday(0);
var timeMonday = timeWeekday(1);
var timeTuesday = timeWeekday(2);
var timeWednesday = timeWeekday(3);
var timeThursday = timeWeekday(4);
var timeFriday = timeWeekday(5);
var timeSaturday = timeWeekday(6);
var timeSundays = timeSunday.range;
var timeMondays = timeMonday.range;
var timeTuesdays = timeTuesday.range;
var timeWednesdays = timeWednesday.range;
var timeThursdays = timeThursday.range;
var timeFridays = timeFriday.range;
var timeSaturdays = timeSaturday.range;
function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start2, end) => {
    return (end - start2) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/month.js
var timeMonth = timeInterval((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start2, end) => {
  return end.getMonth() - start2.getMonth() + (end.getFullYear() - start2.getFullYear()) * 12;
}, (date) => {
  return date.getMonth();
});
var timeMonths = timeMonth.range;
var utcMonth = timeInterval((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start2, end) => {
  return end.getUTCMonth() - start2.getUTCMonth() + (end.getUTCFullYear() - start2.getUTCFullYear()) * 12;
}, (date) => {
  return date.getUTCMonth();
});
var utcMonths = utcMonth.range;

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/year.js
var timeYear = timeInterval((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start2, end) => {
  return end.getFullYear() - start2.getFullYear();
}, (date) => {
  return date.getFullYear();
});
timeYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date) => {
    date.setFullYear(Math.floor(date.getFullYear() / k2) * k2);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k2);
  });
};
var timeYears = timeYear.range;
var utcYear = timeInterval((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start2, end) => {
  return end.getUTCFullYear() - start2.getUTCFullYear();
}, (date) => {
  return date.getUTCFullYear();
});
utcYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date) => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k2) * k2);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k2);
  });
};
var utcYears = utcYear.range;

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/ticks.js
function ticker(year, month, week, day, hour, minute) {
  const tickIntervals = [
    [second, 1, durationSecond],
    [second, 5, 5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute, 1, durationMinute],
    [minute, 5, 5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [hour, 1, durationHour],
    [hour, 3, 3 * durationHour],
    [hour, 6, 6 * durationHour],
    [hour, 12, 12 * durationHour],
    [day, 1, durationDay],
    [day, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month, 1, durationMonth],
    [month, 3, 3 * durationMonth],
    [year, 1, durationYear]
  ];
  function ticks2(start2, stop, count3) {
    const reverse2 = stop < start2;
    if (reverse2)
      [start2, stop] = [stop, start2];
    const interval2 = count3 && typeof count3.range === "function" ? count3 : tickInterval(start2, stop, count3);
    const ticks3 = interval2 ? interval2.range(start2, +stop + 1) : [];
    return reverse2 ? ticks3.reverse() : ticks3;
  }
  function tickInterval(start2, stop, count3) {
    const target = Math.abs(stop - start2) / count3;
    const i = bisector(([, , step2]) => step2).right(tickIntervals, target);
    if (i === tickIntervals.length)
      return year.every(tickStep(start2 / durationYear, stop / durationYear, count3));
    if (i === 0)
      return millisecond.every(Math.max(tickStep(start2, stop, count3), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }
  return [ticks2, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
var [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y3, m, d) {
  return { y: y3, m, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear2,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date) {
      var string = [], i = -1, j2 = 0, n = specifier.length, c3, pad3, format2;
      if (!(date instanceof Date))
        date = /* @__PURE__ */ new Date(+date);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j2, i));
          if ((pad3 = pads[c3 = specifier.charAt(++i)]) != null)
            c3 = specifier.charAt(++i);
          else
            pad3 = c3 === "e" ? " " : "0";
          if (format2 = formats2[c3])
            c3 = format2(date, pad3);
          string.push(c3);
          j2 = i + 1;
        }
      }
      string.push(specifier.slice(j2, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
      if (i != string.length)
        return null;
      if ("Q" in d)
        return new Date(d.Q);
      if ("s" in d)
        return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d))
        d.Z = 0;
      if ("p" in d)
        d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0)
        d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53)
          return null;
        if (!("w" in d))
          d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d))
          d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j2) {
    var i = 0, n = specifier.length, m = string.length, c3, parse;
    while (i < n) {
      if (j2 >= m)
        return -1;
      c3 = specifier.charCodeAt(i++);
      if (c3 === 37) {
        c3 = specifier.charAt(i++);
        parse = parses[c3 in pads ? specifier.charAt(i++) : c3];
        if (!parse || (j2 = parse(d, string, j2)) < 0)
          return -1;
      } else if (c3 != string.charCodeAt(j2++)) {
        return -1;
      }
    }
    return j2;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" };
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad2(value, fill, width) {
  var sign3 = value < 0 ? "-" : "", string = (sign3 ? -value : value) + "", length = string.length;
  return sign3 + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s2) {
  return s2.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad2(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad2(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad2(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad2(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad2(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad2(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad2(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad2(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad2(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad2(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad2(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear2(d, p) {
  return pad2(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad2(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad2(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
  return pad2(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad2(z / 60 | 0, "0", 2) + pad2(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad2(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad2(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad2(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad2(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad2(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad2(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad2(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad2(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad2(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad2(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad2(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad2(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad2(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad2(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad2(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}

// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/defaultLocale.js
var locale2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}

// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date) {
  return date.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/colors.js
function colors_default(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n)
    colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
}

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/category10.js
var category10_default = colors_default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/Accent.js
var Accent_default = colors_default("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/Dark2.js
var Dark2_default = colors_default("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/observable10.js
var observable10_default = colors_default("4269d0efb118ff725c6cc5b03ca951ff8ab7a463f297bbf59c6b4e9498a0");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/Paired.js
var Paired_default = colors_default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/Pastel1.js
var Pastel1_default = colors_default("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/Pastel2.js
var Pastel2_default = colors_default("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/Set1.js
var Set1_default = colors_default("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/Set2.js
var Set2_default = colors_default("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/Set3.js
var Set3_default = colors_default("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/categorical/Tableau10.js
var Tableau10_default = colors_default("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/ramp.js
var ramp_default = (scheme28) => rgbBasis(scheme28[scheme28.length - 1]);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/diverging/BrBG.js
var scheme = new Array(3).concat(
  "d8b365f5f5f55ab4ac",
  "a6611adfc27d80cdc1018571",
  "a6611adfc27df5f5f580cdc1018571",
  "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
  "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
  "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
  "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
  "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
).map(colors_default);
var BrBG_default = ramp_default(scheme);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/diverging/PRGn.js
var scheme2 = new Array(3).concat(
  "af8dc3f7f7f77fbf7b",
  "7b3294c2a5cfa6dba0008837",
  "7b3294c2a5cff7f7f7a6dba0008837",
  "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
  "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
  "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
  "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
  "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
).map(colors_default);
var PRGn_default = ramp_default(scheme2);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/diverging/PiYG.js
var scheme3 = new Array(3).concat(
  "e9a3c9f7f7f7a1d76a",
  "d01c8bf1b6dab8e1864dac26",
  "d01c8bf1b6daf7f7f7b8e1864dac26",
  "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
  "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
  "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
  "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
  "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
).map(colors_default);
var PiYG_default = ramp_default(scheme3);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/diverging/PuOr.js
var scheme4 = new Array(3).concat(
  "998ec3f7f7f7f1a340",
  "5e3c99b2abd2fdb863e66101",
  "5e3c99b2abd2f7f7f7fdb863e66101",
  "542788998ec3d8daebfee0b6f1a340b35806",
  "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
  "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
  "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
  "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
  "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
).map(colors_default);
var PuOr_default = ramp_default(scheme4);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/diverging/RdBu.js
var scheme5 = new Array(3).concat(
  "ef8a62f7f7f767a9cf",
  "ca0020f4a58292c5de0571b0",
  "ca0020f4a582f7f7f792c5de0571b0",
  "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
  "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
  "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
  "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
  "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
  "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
).map(colors_default);
var RdBu_default = ramp_default(scheme5);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/diverging/RdGy.js
var scheme6 = new Array(3).concat(
  "ef8a62ffffff999999",
  "ca0020f4a582bababa404040",
  "ca0020f4a582ffffffbababa404040",
  "b2182bef8a62fddbc7e0e0e09999994d4d4d",
  "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
  "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
  "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
  "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
  "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
).map(colors_default);
var RdGy_default = ramp_default(scheme6);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js
var scheme7 = new Array(3).concat(
  "fc8d59ffffbf91bfdb",
  "d7191cfdae61abd9e92c7bb6",
  "d7191cfdae61ffffbfabd9e92c7bb6",
  "d73027fc8d59fee090e0f3f891bfdb4575b4",
  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
).map(colors_default);
var RdYlBu_default = ramp_default(scheme7);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js
var scheme8 = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(colors_default);
var RdYlGn_default = ramp_default(scheme8);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/diverging/Spectral.js
var scheme9 = new Array(3).concat(
  "fc8d59ffffbf99d594",
  "d7191cfdae61abdda42b83ba",
  "d7191cfdae61ffffbfabdda42b83ba",
  "d53e4ffc8d59fee08be6f59899d5943288bd",
  "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
  "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
  "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
  "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
).map(colors_default);
var Spectral_default = ramp_default(scheme9);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js
var scheme10 = new Array(3).concat(
  "e5f5f999d8c92ca25f",
  "edf8fbb2e2e266c2a4238b45",
  "edf8fbb2e2e266c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
).map(colors_default);
var BuGn_default = ramp_default(scheme10);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js
var scheme11 = new Array(3).concat(
  "e0ecf49ebcda8856a7",
  "edf8fbb3cde38c96c688419d",
  "edf8fbb3cde38c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
).map(colors_default);
var BuPu_default = ramp_default(scheme11);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js
var scheme12 = new Array(3).concat(
  "e0f3dba8ddb543a2ca",
  "f0f9e8bae4bc7bccc42b8cbe",
  "f0f9e8bae4bc7bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
).map(colors_default);
var GnBu_default = ramp_default(scheme12);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js
var scheme13 = new Array(3).concat(
  "fee8c8fdbb84e34a33",
  "fef0d9fdcc8afc8d59d7301f",
  "fef0d9fdcc8afc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
).map(colors_default);
var OrRd_default = ramp_default(scheme13);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js
var scheme14 = new Array(3).concat(
  "ece2f0a6bddb1c9099",
  "f6eff7bdc9e167a9cf02818a",
  "f6eff7bdc9e167a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
).map(colors_default);
var PuBuGn_default = ramp_default(scheme14);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js
var scheme15 = new Array(3).concat(
  "ece7f2a6bddb2b8cbe",
  "f1eef6bdc9e174a9cf0570b0",
  "f1eef6bdc9e174a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
).map(colors_default);
var PuBu_default = ramp_default(scheme15);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js
var scheme16 = new Array(3).concat(
  "e7e1efc994c7dd1c77",
  "f1eef6d7b5d8df65b0ce1256",
  "f1eef6d7b5d8df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
).map(colors_default);
var PuRd_default = ramp_default(scheme16);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js
var scheme17 = new Array(3).concat(
  "fde0ddfa9fb5c51b8a",
  "feebe2fbb4b9f768a1ae017e",
  "feebe2fbb4b9f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
).map(colors_default);
var RdPu_default = ramp_default(scheme17);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js
var scheme18 = new Array(3).concat(
  "edf8b17fcdbb2c7fb8",
  "ffffcca1dab441b6c4225ea8",
  "ffffcca1dab441b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
).map(colors_default);
var YlGnBu_default = ramp_default(scheme18);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js
var scheme19 = new Array(3).concat(
  "f7fcb9addd8e31a354",
  "ffffccc2e69978c679238443",
  "ffffccc2e69978c67931a354006837",
  "ffffccd9f0a3addd8e78c67931a354006837",
  "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
).map(colors_default);
var YlGn_default = ramp_default(scheme19);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js
var scheme20 = new Array(3).concat(
  "fff7bcfec44fd95f0e",
  "ffffd4fed98efe9929cc4c02",
  "ffffd4fed98efe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
).map(colors_default);
var YlOrBr_default = ramp_default(scheme20);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js
var scheme21 = new Array(3).concat(
  "ffeda0feb24cf03b20",
  "ffffb2fecc5cfd8d3ce31a1c",
  "ffffb2fecc5cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
).map(colors_default);
var YlOrRd_default = ramp_default(scheme21);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-single/Blues.js
var scheme22 = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(colors_default);
var Blues_default = ramp_default(scheme22);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-single/Greens.js
var scheme23 = new Array(3).concat(
  "e5f5e0a1d99b31a354",
  "edf8e9bae4b374c476238b45",
  "edf8e9bae4b374c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
).map(colors_default);
var Greens_default = ramp_default(scheme23);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-single/Greys.js
var scheme24 = new Array(3).concat(
  "f0f0f0bdbdbd636363",
  "f7f7f7cccccc969696525252",
  "f7f7f7cccccc969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
).map(colors_default);
var Greys_default = ramp_default(scheme24);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-single/Purples.js
var scheme25 = new Array(3).concat(
  "efedf5bcbddc756bb1",
  "f2f0f7cbc9e29e9ac86a51a3",
  "f2f0f7cbc9e29e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
).map(colors_default);
var Purples_default = ramp_default(scheme25);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-single/Reds.js
var scheme26 = new Array(3).concat(
  "fee0d2fc9272de2d26",
  "fee5d9fcae91fb6a4acb181d",
  "fee5d9fcae91fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
).map(colors_default);
var Reds_default = ramp_default(scheme26);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js
var scheme27 = new Array(3).concat(
  "fee6cefdae6be6550d",
  "feeddefdbe85fd8d3cd94701",
  "feeddefdbe85fd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
).map(colors_default);
var Oranges_default = ramp_default(scheme27);

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js
var cubehelix_default2 = cubehelixLong(cubehelix(300, 0.5, 0), cubehelix(-240, 0.5, 1));

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js
var warm = cubehelixLong(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.5, 0.8));
var cool = cubehelixLong(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.5, 0.8));
var c = cubehelix();

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js
var c2 = rgb();
var pi_1_3 = Math.PI / 3;
var pi_2_3 = Math.PI * 2 / 3;

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js
function ramp(range2) {
  var n = range2.length;
  return function(t) {
    return range2[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
var viridis_default = ramp(colors_default("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var magma = ramp(colors_default("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno = ramp(colors_default("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var plasma = ramp(colors_default("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/constant.js
function constant_default10(x3) {
  return function constant2() {
    return x3;
  };
}

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/math.js
var cos3 = Math.cos;
var sin3 = Math.sin;
var sqrt3 = Math.sqrt;
var epsilon6 = 1e-12;
var pi5 = Math.PI;
var halfPi4 = pi5 / 2;
var tau6 = 2 * pi5;

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/path.js
function withPath(shape) {
  let digits = 3;
  shape.digits = function(_2) {
    if (!arguments.length)
      return digits;
    if (_2 == null) {
      digits = null;
    } else {
      const d = Math.floor(_2);
      if (!(d >= 0))
        throw new RangeError(`invalid digits: ${_2}`);
      digits = d;
    }
    return shape;
  };
  return () => new Path(digits);
}

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/array.js
var slice4 = Array.prototype.slice;

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y3) : this._context.moveTo(x3, y3);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(x3, y3);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/point.js
function x2(p) {
  return p[0];
}
function y2(p) {
  return p[1];
}

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/radial.js
var curveRadialLinear = curveRadial(linear_default);
function Radial(curve) {
  this._curve = curve;
}
Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a2, r) {
    this._curve.point(r * Math.sin(a2), r * -Math.cos(a2));
  }
};
function curveRadial(curve) {
  function radial2(context) {
    return new Radial(curve(context));
  }
  radial2._curve = curve;
  return radial2;
}

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/bump.js
var Bump = class {
  constructor(context, x3) {
    this._context = context;
    this._x = x3;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x3, y3) {
    x3 = +x3, y3 = +y3;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line)
          this._context.lineTo(x3, y3);
        else
          this._context.moveTo(x3, y3);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        if (this._x)
          this._context.bezierCurveTo(this._x0 = (this._x0 + x3) / 2, this._y0, this._x0, y3, x3, y3);
        else
          this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y3) / 2, x3, this._y0, x3, y3);
        break;
      }
    }
    this._x0 = x3, this._y0 = y3;
  }
};
function bumpX(context) {
  return new Bump(context, true);
}

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/link.js
function linkSource(d) {
  return d.source;
}
function linkTarget(d) {
  return d.target;
}
function link2(curve) {
  let source = linkSource, target = linkTarget, x3 = x2, y3 = y2, context = null, output = null, path2 = withPath(link3);
  function link3() {
    let buffer;
    const argv = slice4.call(arguments);
    const s2 = source.apply(this, argv);
    const t = target.apply(this, argv);
    if (context == null)
      output = curve(buffer = path2());
    output.lineStart();
    argv[0] = s2, output.point(+x3.apply(this, argv), +y3.apply(this, argv));
    argv[0] = t, output.point(+x3.apply(this, argv), +y3.apply(this, argv));
    output.lineEnd();
    if (buffer)
      return output = null, buffer + "" || null;
  }
  link3.source = function(_2) {
    return arguments.length ? (source = _2, link3) : source;
  };
  link3.target = function(_2) {
    return arguments.length ? (target = _2, link3) : target;
  };
  link3.x = function(_2) {
    return arguments.length ? (x3 = typeof _2 === "function" ? _2 : constant_default10(+_2), link3) : x3;
  };
  link3.y = function(_2) {
    return arguments.length ? (y3 = typeof _2 === "function" ? _2 : constant_default10(+_2), link3) : y3;
  };
  link3.context = function(_2) {
    return arguments.length ? (_2 == null ? context = output = null : output = curve(context = _2), link3) : context;
  };
  return link3;
}
function linkHorizontal() {
  return link2(bumpX);
}

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/symbol/asterisk.js
var sqrt32 = sqrt3(3);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/symbol/diamond.js
var tan30 = sqrt3(1 / 3);
var tan30_2 = tan30 * 2;

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/symbol/star.js
var kr = sin3(pi5 / 10) / sin3(7 * pi5 / 10);
var kx = sin3(tau6 / 10) * kr;
var ky = -cos3(tau6 / 10) * kr;

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/symbol/triangle.js
var sqrt33 = sqrt3(3);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/symbol/triangle2.js
var sqrt34 = sqrt3(3);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/symbol/wye.js
var s = sqrt3(3) / 2;
var k = 1 / sqrt3(12);
var a = (k / 2 + 1) * 3;

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/noop.js
function noop_default2() {
}

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basis.js
function point2(that, x3, y3) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x3) / 6,
    (that._y0 + 4 * that._y1 + y3) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point2(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y3) : this._context.moveTo(x3, y3);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        point2(this, x3, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = x3;
    this._y0 = this._y1, this._y1 = y3;
  }
};

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basisClosed.js
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop_default2,
  areaEnd: noop_default2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x3, this._y2 = y3;
        break;
      case 1:
        this._point = 2;
        this._x3 = x3, this._y3 = y3;
        break;
      case 2:
        this._point = 3;
        this._x4 = x3, this._y4 = y3;
        this._context.moveTo((this._x0 + 4 * this._x1 + x3) / 6, (this._y0 + 4 * this._y1 + y3) / 6);
        break;
      default:
        point2(this, x3, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = x3;
    this._y0 = this._y1, this._y1 = y3;
  }
};

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basisOpen.js
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x02 = (this._x0 + 4 * this._x1 + x3) / 6, y0 = (this._y0 + 4 * this._y1 + y3) / 6;
        this._line ? this._context.lineTo(x02, y0) : this._context.moveTo(x02, y0);
        break;
      case 3:
        this._point = 4;
      default:
        point2(this, x3, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = x3;
    this._y0 = this._y1, this._y1 = y3;
  }
};

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/bundle.js
function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x3 = this._x, y3 = this._y, j2 = x3.length - 1;
    if (j2 > 0) {
      var x02 = x3[0], y0 = y3[0], dx = x3[j2] - x02, dy = y3[j2] - y0, i = -1, t;
      while (++i <= j2) {
        t = i / j2;
        this._basis.point(
          this._beta * x3[i] + (1 - this._beta) * (x02 + t * dx),
          this._beta * y3[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x3, y3) {
    this._x.push(+x3);
    this._y.push(+y3);
  }
};
var bundle_default = function custom12(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }
  bundle.beta = function(beta2) {
    return custom12(+beta2);
  };
  return bundle;
}(0.85);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/cardinal.js
function point3(that, x3, y3) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x3),
    that._y2 + that._k * (that._y1 - y3),
    that._x2,
    that._y2
  );
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point3(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y3) : this._context.moveTo(x3, y3);
        break;
      case 1:
        this._point = 2;
        this._x1 = x3, this._y1 = y3;
        break;
      case 2:
        this._point = 3;
      default:
        point3(this, x3, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var cardinal_default = function custom13(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom13(+tension2);
  };
  return cardinal;
}(0);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/cardinalClosed.js
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop_default2,
  areaEnd: noop_default2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x3, this._y3 = y3;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x3, this._y4 = y3);
        break;
      case 2:
        this._point = 3;
        this._x5 = x3, this._y5 = y3;
        break;
      default:
        point3(this, x3, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var cardinalClosed_default = function custom14(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom14(+tension2);
  };
  return cardinal;
}(0);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/cardinalOpen.js
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point3(this, x3, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var cardinalOpen_default = function custom15(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom15(+tension2);
  };
  return cardinal;
}(0);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/catmullRom.js
function point4(that, x3, y3) {
  var x12 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon6) {
    var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x12 = (x12 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }
  if (that._l23_a > epsilon6) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b + that._x1 * that._l23_2a - x3 * that._l12_2a) / m;
    y22 = (y22 * b + that._y1 * that._l23_2a - y3 * that._l12_2a) / m;
  }
  that._context.bezierCurveTo(x12, y1, x22, y22, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    if (this._point) {
      var x23 = this._x2 - x3, y23 = this._y2 - y3;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y3) : this._context.moveTo(x3, y3);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        point4(this, x3, y3);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var catmullRom_default = function custom16(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom16(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/catmullRomClosed.js
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop_default2,
  areaEnd: noop_default2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    if (this._point) {
      var x23 = this._x2 - x3, y23 = this._y2 - y3;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x3, this._y3 = y3;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x3, this._y4 = y3);
        break;
      case 2:
        this._point = 3;
        this._x5 = x3, this._y5 = y3;
        break;
      default:
        point4(this, x3, y3);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var catmullRomClosed_default = function custom17(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom17(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/catmullRomOpen.js
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    if (this._point) {
      var x23 = this._x2 - x3, y23 = this._y2 - y3;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point4(this, x3, y3);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var catmullRomOpen_default = function custom18(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom18(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/linearClosed.js
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop_default2,
  areaEnd: noop_default2,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point)
      this._context.closePath();
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    if (this._point)
      this._context.lineTo(x3, y3);
    else
      this._point = 1, this._context.moveTo(x3, y3);
  }
};

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/monotone.js
function sign2(x3) {
  return x3 < 0 ? -1 : 1;
}
function slope3(that, x22, y22) {
  var h0 = that._x1 - that._x0, h1 = x22 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y22 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign2(s0) + sign2(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}
function point5(that, t03, t13) {
  var x02 = that._x0, y0 = that._y0, x12 = that._x1, y1 = that._y1, dx = (x12 - x02) / 3;
  that._context.bezierCurveTo(x02 + dx, y0 + dx * t03, x12 - dx, y1 - dx * t13, x12, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point5(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y3) {
    var t13 = NaN;
    x3 = +x3, y3 = +y3;
    if (x3 === this._x1 && y3 === this._y1)
      return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y3) : this._context.moveTo(x3, y3);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point5(this, slope2(this, t13 = slope3(this, x3, y3)), t13);
        break;
      default:
        point5(this, this._t0, t13 = slope3(this, x3, y3));
        break;
    }
    this._x0 = this._x1, this._x1 = x3;
    this._y0 = this._y1, this._y1 = y3;
    this._t0 = t13;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x3, y3) {
  MonotoneX.prototype.point.call(this, y3, x3);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x3, y3) {
    this._context.moveTo(y3, x3);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x3, y3) {
    this._context.lineTo(y3, x3);
  },
  bezierCurveTo: function(x12, y1, x22, y22, x3, y3) {
    this._context.bezierCurveTo(y1, x12, y22, x22, y3, x3);
  }
};

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/natural.js
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x3 = this._x, y3 = this._y, n = x3.length;
    if (n) {
      this._line ? this._context.lineTo(x3[0], y3[0]) : this._context.moveTo(x3[0], y3[0]);
      if (n === 2) {
        this._context.lineTo(x3[1], y3[1]);
      } else {
        var px = controlPoints(x3), py = controlPoints(y3);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x3[i1], y3[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n === 1)
      this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x3, y3) {
    this._x.push(+x3);
    this._y.push(+y3);
  }
};
function controlPoints(x3) {
  var i, n = x3.length - 1, m, a2 = new Array(n), b = new Array(n), r = new Array(n);
  a2[0] = 0, b[0] = 2, r[0] = x3[0] + 2 * x3[1];
  for (i = 1; i < n - 1; ++i)
    a2[i] = 1, b[i] = 4, r[i] = 4 * x3[i] + 2 * x3[i + 1];
  a2[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x3[n - 1] + x3[n];
  for (i = 1; i < n; ++i)
    m = a2[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a2[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i)
    a2[i] = (r[i] - a2[i + 1]) / b[i];
  b[n - 1] = (x3[n] + a2[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i)
    b[i] = 2 * x3[i + 1] - a2[i + 1];
  return [a2, b];
}

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/step.js
function Step(context, t) {
  this._context = context;
  this._t = t;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2)
      this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    if (this._line >= 0)
      this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x3, y3) {
    x3 = +x3, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y3) : this._context.moveTo(x3, y3);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y3);
          this._context.lineTo(x3, y3);
        } else {
          var x12 = this._x * (1 - this._t) + x3 * this._t;
          this._context.lineTo(x12, this._y);
          this._context.lineTo(x12, y3);
        }
        break;
      }
    }
    this._x = x3, this._y = y3;
  }
};

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/constant.js
var constant_default11 = (x3) => () => x3;

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/event.js
function ZoomEvent(type2, {
  sourceEvent,
  target,
  transform: transform2,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type2, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    transform: { value: transform2, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js
function Transform(k2, x3, y3) {
  this.k = k2;
  this.x = x3;
  this.y = y3;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k2) {
    return k2 === 1 ? this : new Transform(this.k * k2, this.x, this.y);
  },
  translate: function(x3, y3) {
    return x3 === 0 & y3 === 0 ? this : new Transform(this.k, this.x + this.k * x3, this.y + this.k * y3);
  },
  apply: function(point6) {
    return [point6[0] * this.k + this.x, point6[1] * this.k + this.y];
  },
  applyX: function(x3) {
    return x3 * this.k + this.x;
  },
  applyY: function(y3) {
    return y3 * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x3) {
    return (x3 - this.x) / this.k;
  },
  invertY: function(y3) {
    return (y3 - this.y) / this.k;
  },
  rescaleX: function(x3) {
    return x3.copy().domain(x3.range().map(this.invertX, this).map(x3.invert, x3));
  },
  rescaleY: function(y3) {
    return y3.copy().domain(y3.range().map(this.invertY, this).map(y3.invert, y3));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity5 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom)
    if (!(node = node.parentNode))
      return identity5;
  return node.__zoom;
}

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/noevent.js
function nopropagation3(event) {
  event.stopImmediatePropagation();
}
function noevent_default3(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/zoom.js
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || identity5;
}
function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform2, extent2, translateExtent) {
  var dx0 = transform2.invertX(extent2[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent2[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent2[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent2[1][1]) - translateExtent[1][1];
  return transform2.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}
function zoom_default2() {
  var filter3 = defaultFilter, extent2 = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default, listeners = dispatch_default("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
  function zoom(selection2) {
    selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom.transform = function(collection, transform2, point6, event) {
    var selection2 = collection.selection ? collection.selection() : collection;
    selection2.property("__zoom", defaultTransform);
    if (collection !== selection2) {
      schedule(collection, transform2, point6, event);
    } else {
      selection2.interrupt().each(function() {
        gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
      });
    }
  };
  zoom.scaleBy = function(selection2, k2, p, event) {
    zoom.scaleTo(selection2, function() {
      var k0 = this.__zoom.k, k1 = typeof k2 === "function" ? k2.apply(this, arguments) : k2;
      return k0 * k1;
    }, p, event);
  };
  zoom.scaleTo = function(selection2, k2, p, event) {
    zoom.transform(selection2, function() {
      var e = extent2.apply(this, arguments), t03 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t03.invert(p0), k1 = typeof k2 === "function" ? k2.apply(this, arguments) : k2;
      return constrain(translate(scale2(t03, k1), p0, p1), e, translateExtent);
    }, p, event);
  };
  zoom.translateBy = function(selection2, x3, y3, event) {
    zoom.transform(selection2, function() {
      return constrain(this.__zoom.translate(
        typeof x3 === "function" ? x3.apply(this, arguments) : x3,
        typeof y3 === "function" ? y3.apply(this, arguments) : y3
      ), extent2.apply(this, arguments), translateExtent);
    }, null, event);
  };
  zoom.translateTo = function(selection2, x3, y3, p, event) {
    zoom.transform(selection2, function() {
      var e = extent2.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity5.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x3 === "function" ? -x3.apply(this, arguments) : -x3,
        typeof y3 === "function" ? -y3.apply(this, arguments) : -y3
      ), e, translateExtent);
    }, p, event);
  };
  function scale2(transform2, k2) {
    k2 = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k2));
    return k2 === transform2.k ? transform2 : new Transform(k2, transform2.x, transform2.y);
  }
  function translate(transform2, p0, p1) {
    var x3 = p0[0] - p1[0] * transform2.k, y3 = p0[1] - p1[1] * transform2.k;
    return x3 === transform2.x && y3 === transform2.y ? transform2 : new Transform(transform2.k, x3, y3);
  }
  function centroid(extent3) {
    return [(+extent3[0][0] + +extent3[1][0]) / 2, (+extent3[0][1] + +extent3[1][1]) / 2];
  }
  function schedule(transition2, transform2, point6, event) {
    transition2.on("start.zoom", function() {
      gesture(this, arguments).event(event).start();
    }).on("interrupt.zoom end.zoom", function() {
      gesture(this, arguments).event(event).end();
    }).tween("zoom", function() {
      var that = this, args = arguments, g = gesture(that, args).event(event), e = extent2.apply(that, args), p = point6 == null ? centroid(e) : typeof point6 === "function" ? point6.apply(that, args) : point6, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a2 = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate(a2.invert(p).concat(w / a2.k), b.invert(p).concat(w / b.k));
      return function(t) {
        if (t === 1)
          t = b;
        else {
          var l = i(t), k2 = w / l[2];
          t = new Transform(k2, p[0] - l[0] * k2, p[1] - l[1] * k2);
        }
        g.zoom(null, t);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent2.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    event: function(event) {
      if (event)
        this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform2) {
      if (this.mouse && key !== "mouse")
        this.mouse[1] = transform2.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch")
        this.touch0[1] = transform2.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch")
        this.touch1[1] = transform2.invert(this.touch1[0]);
      this.that.__zoom = transform2;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type2) {
      var d = select_default2(this.that).datum();
      listeners.call(
        type2,
        this.that,
        new ZoomEvent(type2, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type: type2,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };
  function wheeled(event, ...args) {
    if (!filter3.apply(this, arguments))
      return;
    var g = gesture(this, args).event(event), t = this.__zoom, k2 = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer_default(event);
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    } else if (t.k === k2)
      return;
    else {
      g.mouse = [p, t.invert(p)];
      interrupt_default(this);
      g.start();
    }
    noevent_default3(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale2(t, k2), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }
  function mousedowned(event, ...args) {
    if (touchending || !filter3.apply(this, arguments))
      return;
    var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v2 = select_default2(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer_default(event, currentTarget), x02 = event.clientX, y0 = event.clientY;
    nodrag_default(event.view);
    nopropagation3(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt_default(this);
    g.start();
    function mousemoved(event2) {
      noevent_default3(event2);
      if (!g.moved) {
        var dx = event2.clientX - x02, dy = event2.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer_default(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }
    function mouseupped(event2) {
      v2.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event2.view, g.moved);
      noevent_default3(event2);
      g.event(event2).end();
    }
  }
  function dblclicked(event, ...args) {
    if (!filter3.apply(this, arguments))
      return;
    var t03 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t03.invert(p0), k1 = t03.k * (event.shiftKey ? 0.5 : 2), t13 = constrain(translate(scale2(t03, k1), p0, p1), extent2.apply(this, args), translateExtent);
    noevent_default3(event);
    if (duration > 0)
      select_default2(this).transition().duration(duration).call(schedule, t13, p0, event);
    else
      select_default2(this).call(zoom.transform, t13, p0, event);
  }
  function touchstarted(event, ...args) {
    if (!filter3.apply(this, arguments))
      return;
    var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
    nopropagation3(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer_default(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0)
        g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2])
        g.touch1 = p, g.taps = 0;
    }
    if (touchstarting)
      touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g.taps < 2)
        touchfirst = p[0], touchstarting = setTimeout(function() {
          touchstarting = null;
        }, touchDelay);
      interrupt_default(this);
      g.start();
    }
  }
  function touchmoved(event, ...args) {
    if (!this.__zooming)
      return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
    noevent_default3(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer_default(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier)
        g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier)
        g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale2(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g.touch0)
      p = g.touch0[0], l = g.touch0[1];
    else
      return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }
  function touchended(event, ...args) {
    if (!this.__zooming)
      return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
    nopropagation3(event);
    if (touchending)
      clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier)
        delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier)
        delete g.touch1;
    }
    if (g.touch1 && !g.touch0)
      g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0)
      g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      if (g.taps === 2) {
        t = pointer_default(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select_default2(this).on("dblclick.zoom");
          if (p)
            p.apply(this, arguments);
        }
      }
    }
  }
  zoom.wheelDelta = function(_2) {
    return arguments.length ? (wheelDelta = typeof _2 === "function" ? _2 : constant_default11(+_2), zoom) : wheelDelta;
  };
  zoom.filter = function(_2) {
    return arguments.length ? (filter3 = typeof _2 === "function" ? _2 : constant_default11(!!_2), zoom) : filter3;
  };
  zoom.touchable = function(_2) {
    return arguments.length ? (touchable = typeof _2 === "function" ? _2 : constant_default11(!!_2), zoom) : touchable;
  };
  zoom.extent = function(_2) {
    return arguments.length ? (extent2 = typeof _2 === "function" ? _2 : constant_default11([[+_2[0][0], +_2[0][1]], [+_2[1][0], +_2[1][1]]]), zoom) : extent2;
  };
  zoom.scaleExtent = function(_2) {
    return arguments.length ? (scaleExtent[0] = +_2[0], scaleExtent[1] = +_2[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom.translateExtent = function(_2) {
    return arguments.length ? (translateExtent[0][0] = +_2[0][0], translateExtent[1][0] = +_2[1][0], translateExtent[0][1] = +_2[0][1], translateExtent[1][1] = +_2[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom.constrain = function(_2) {
    return arguments.length ? (constrain = _2, zoom) : constrain;
  };
  zoom.duration = function(_2) {
    return arguments.length ? (duration = +_2, zoom) : duration;
  };
  zoom.interpolate = function(_2) {
    return arguments.length ? (interpolate = _2, zoom) : interpolate;
  };
  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };
  zoom.clickDistance = function(_2) {
    return arguments.length ? (clickDistance2 = (_2 = +_2) * _2, zoom) : Math.sqrt(clickDistance2);
  };
  zoom.tapDistance = function(_2) {
    return arguments.length ? (tapDistance = +_2, zoom) : tapDistance;
  };
  return zoom;
}

// node_modules/.pnpm/markmap-view@0.17.0_markmap-common@0.17.0/node_modules/markmap-view/dist/index.js
var K2 = typeof navigator < "u" && navigator.userAgent.includes("Macintosh");
var gt = ordinal(category10_default);
var P = {
  autoFit: false,
  color: (e) => {
    var t;
    return gt(`${((t = e.state) == null ? void 0 : t.path) || ""}`);
  },
  duration: 500,
  embedGlobalCSS: true,
  fitRatio: 0.95,
  maxWidth: 0,
  nodeMinHeight: 16,
  paddingX: 8,
  scrollForPan: K2,
  spacingHorizontal: 80,
  spacingVertical: 5,
  initialExpandLevel: -1,
  zoom: true,
  pan: true,
  toggleRecursively: false
};
function Se(e) {
  const t = {}, n = { ...e }, { color: r, colorFreezeLevel: o } = n;
  if ((r == null ? void 0 : r.length) === 1) {
    const s2 = r[0];
    t.color = () => s2;
  } else if (r != null && r.length) {
    const s2 = ordinal(r);
    t.color = (l) => s2(`${l.state.path}`);
  }
  if (o) {
    const s2 = t.color || P.color;
    t.color = (l) => (l = {
      ...l,
      state: {
        ...l.state,
        path: l.state.path.split(".").slice(0, o).join(".")
      }
    }, s2(l));
  }
  return ["duration", "maxWidth", "initialExpandLevel"].forEach((s2) => {
    const l = n[s2];
    typeof l == "number" && (t[s2] = l);
  }), ["zoom", "pan"].forEach((s2) => {
    const l = n[s2];
    l != null && (t[s2] = !!l);
  }), t;
}
var U = 1;
var G = 2;
var xt = "http://www.w3.org/2000/svg";
var _ = "http://www.w3.org/1999/xlink";
var yt = {
  show: _,
  actuate: _,
  href: _
};
var kt = (e) => typeof e == "string" || typeof e == "number";
var vt = (e) => (e == null ? void 0 : e.vtype) === U;
var St = (e) => (e == null ? void 0 : e.vtype) === G;
function j(e, t) {
  let n;
  if (typeof e == "string")
    n = U;
  else if (typeof e == "function")
    n = G;
  else
    throw new Error("Invalid VNode type");
  return {
    vtype: n,
    type: e,
    props: t
  };
}
function bt(e) {
  return e.children;
}
var zt = {
  isSvg: false
};
function I(e, t) {
  Array.isArray(t) || (t = [t]), t = t.filter(Boolean), t.length && e.append(...t);
}
function Et(e, t, n) {
  for (const r in t)
    if (!(r === "key" || r === "children" || r === "ref"))
      if (r === "dangerouslySetInnerHTML")
        e.innerHTML = t[r].__html;
      else if (r === "innerHTML" || r === "textContent" || r === "innerText" || r === "value" && ["textarea", "select"].includes(e.tagName)) {
        const o = t[r];
        o != null && (e[r] = o);
      } else
        r.startsWith("on") ? e[r.toLowerCase()] = t[r] : wt(e, r, t[r], n.isSvg);
}
var Ct = {
  className: "class",
  labelFor: "for"
};
function wt(e, t, n, r) {
  if (t = Ct[t] || t, n === true)
    e.setAttribute(t, "");
  else if (n === false)
    e.removeAttribute(t);
  else {
    const o = r ? yt[t] : void 0;
    o !== void 0 ? e.setAttributeNS(o, t, n) : e.setAttribute(t, n);
  }
}
function Xt(e) {
  return e.reduce((t, n) => t.concat(n), []);
}
function $(e, t) {
  return Array.isArray(e) ? Xt(e.map((n) => $(n, t))) : B3(e, t);
}
function B3(e, t = zt) {
  if (e == null || typeof e == "boolean")
    return null;
  if (e instanceof Node)
    return e;
  if (St(e)) {
    const {
      type: n,
      props: r
    } = e;
    if (n === bt) {
      const a2 = document.createDocumentFragment();
      if (r.children) {
        const c3 = $(r.children, t);
        I(a2, c3);
      }
      return a2;
    }
    const o = n(r);
    return B3(o, t);
  }
  if (kt(e))
    return document.createTextNode(`${e}`);
  if (vt(e)) {
    let n;
    const {
      type: r,
      props: o
    } = e;
    if (!t.isSvg && r === "svg" && (t = Object.assign({}, t, {
      isSvg: true
    })), t.isSvg ? n = document.createElementNS(xt, r) : n = document.createElement(r), Et(n, o, t), o.children) {
      let c3 = t;
      t.isSvg && r === "foreignObject" && (c3 = Object.assign({}, c3, {
        isSvg: false
      }));
      const s2 = $(o.children, c3);
      s2 != null && I(n, s2);
    }
    const {
      ref: a2
    } = o;
    return typeof a2 == "function" && a2(n), n;
  }
  throw new Error("mount: Invalid Vnode!");
}
function O(e) {
  return B3(e);
}
function jt(e) {
  var t = 0, n = e.children, r = n && n.length;
  if (!r)
    t = 1;
  else
    for (; --r >= 0; )
      t += n[r].value;
  e.value = t;
}
function Nt() {
  return this.eachAfter(jt);
}
function Rt(e) {
  var t = this, n, r = [t], o, a2, c3;
  do
    for (n = r.reverse(), r = []; t = n.pop(); )
      if (e(t), o = t.children, o)
        for (a2 = 0, c3 = o.length; a2 < c3; ++a2)
          r.push(o[a2]);
  while (r.length);
  return this;
}
function Tt(e) {
  for (var t = this, n = [t], r, o; t = n.pop(); )
    if (e(t), r = t.children, r)
      for (o = r.length - 1; o >= 0; --o)
        n.push(r[o]);
  return this;
}
function Mt(e) {
  for (var t = this, n = [t], r = [], o, a2, c3; t = n.pop(); )
    if (r.push(t), o = t.children, o)
      for (a2 = 0, c3 = o.length; a2 < c3; ++a2)
        n.push(o[a2]);
  for (; t = r.pop(); )
    e(t);
  return this;
}
function At(e) {
  return this.eachAfter(function(t) {
    for (var n = +e(t.data) || 0, r = t.children, o = r && r.length; --o >= 0; )
      n += r[o].value;
    t.value = n;
  });
}
function _t(e) {
  return this.eachBefore(function(t) {
    t.children && t.children.sort(e);
  });
}
function Ot(e) {
  for (var t = this, n = Dt(t, e), r = [t]; t !== n; )
    t = t.parent, r.push(t);
  for (var o = r.length; e !== n; )
    r.splice(o, 0, e), e = e.parent;
  return r;
}
function Dt(e, t) {
  if (e === t)
    return e;
  var n = e.ancestors(), r = t.ancestors(), o = null;
  for (e = n.pop(), t = r.pop(); e === t; )
    o = e, e = n.pop(), t = r.pop();
  return o;
}
function $t() {
  for (var e = this, t = [e]; e = e.parent; )
    t.push(e);
  return t;
}
function Bt() {
  var e = [];
  return this.each(function(t) {
    e.push(t);
  }), e;
}
function Ft() {
  var e = [];
  return this.eachBefore(function(t) {
    t.children || e.push(t);
  }), e;
}
function Ht() {
  var e = this, t = [];
  return e.each(function(n) {
    n !== e && t.push({ source: n.parent, target: n });
  }), t;
}
function F(e, t) {
  var n = new N(e), r = +e.value && (n.value = e.value), o, a2 = [n], c3, s2, l, p;
  for (t == null && (t = It); o = a2.pop(); )
    if (r && (o.value = +o.data.value), (s2 = t(o.data)) && (p = s2.length))
      for (o.children = new Array(p), l = p - 1; l >= 0; --l)
        a2.push(c3 = o.children[l] = new N(s2[l])), c3.parent = o, c3.depth = o.depth + 1;
  return n.eachBefore(Yt);
}
function Lt() {
  return F(this).eachBefore(Wt);
}
function It(e) {
  return e.children;
}
function Wt(e) {
  e.data = e.data.data;
}
function Yt(e) {
  var t = 0;
  do
    e.height = t;
  while ((e = e.parent) && e.height < ++t);
}
function N(e) {
  this.data = e, this.depth = this.height = 0, this.parent = null;
}
N.prototype = F.prototype = {
  constructor: N,
  count: Nt,
  each: Rt,
  eachAfter: Mt,
  eachBefore: Tt,
  sum: At,
  sort: _t,
  path: Ot,
  ancestors: $t,
  descendants: Bt,
  leaves: Ft,
  links: Ht,
  copy: Lt
};
var Vt = "d3-flextree";
var Kt = "2.1.2";
var Pt = "build/d3-flextree.js";
var Ut = "index";
var Gt = {
  name: "Chris Maloney",
  url: "http://chrismaloney.org"
};
var Zt = "Flexible tree layout algorithm that allows for variable node sizes.";
var qt = [
  "d3",
  "d3-module",
  "layout",
  "tree",
  "hierarchy",
  "d3-hierarchy",
  "plugin",
  "d3-plugin",
  "infovis",
  "visualization",
  "2d"
];
var Jt = "https://github.com/klortho/d3-flextree";
var Qt = "WTFPL";
var te = {
  type: "git",
  url: "https://github.com/klortho/d3-flextree.git"
};
var ee = {
  clean: "rm -rf build demo test",
  "build:demo": "rollup -c --environment BUILD:demo",
  "build:dev": "rollup -c --environment BUILD:dev",
  "build:prod": "rollup -c --environment BUILD:prod",
  "build:test": "rollup -c --environment BUILD:test",
  build: "rollup -c",
  lint: "eslint index.js src",
  "test:main": "node test/bundle.js",
  "test:browser": "node test/browser-tests.js",
  test: "npm-run-all test:*",
  prepare: "npm-run-all clean build lint test"
};
var ne = {
  "d3-hierarchy": "^1.1.5"
};
var re2 = {
  "babel-plugin-external-helpers": "^6.22.0",
  "babel-preset-es2015-rollup": "^3.0.0",
  d3: "^4.13.0",
  "d3-selection-multi": "^1.0.1",
  eslint: "^4.19.1",
  jsdom: "^11.6.2",
  "npm-run-all": "^4.1.2",
  rollup: "^0.55.3",
  "rollup-plugin-babel": "^2.7.1",
  "rollup-plugin-commonjs": "^8.0.2",
  "rollup-plugin-copy": "^0.2.3",
  "rollup-plugin-json": "^2.3.0",
  "rollup-plugin-node-resolve": "^3.0.2",
  "rollup-plugin-uglify": "^3.0.0",
  "uglify-es": "^3.3.9"
};
var ie = {
  name: Vt,
  version: Kt,
  main: Pt,
  module: Ut,
  "jsnext:main": "index",
  author: Gt,
  description: Zt,
  keywords: qt,
  homepage: Jt,
  license: Qt,
  repository: te,
  scripts: ee,
  dependencies: ne,
  devDependencies: re2
};
var { version: oe } = ie;
var se = Object.freeze({
  children: (e) => e.children,
  nodeSize: (e) => e.data.size,
  spacing: 0
});
function q(e) {
  const t = Object.assign({}, se, e);
  function n(s2) {
    const l = t[s2];
    return typeof l == "function" ? l : () => l;
  }
  function r(s2) {
    const l = c3(a2(), s2, (p) => p.children);
    return l.update(), l.data;
  }
  function o() {
    const s2 = n("nodeSize"), l = n("spacing");
    return class Z extends F.prototype.constructor {
      constructor(h) {
        super(h);
      }
      copy() {
        const h = c3(this.constructor, this, (u4) => u4.children);
        return h.each((u4) => u4.data = u4.data.data), h;
      }
      get size() {
        return s2(this);
      }
      spacing(h) {
        return l(this, h);
      }
      get nodes() {
        return this.descendants();
      }
      get xSize() {
        return this.size[0];
      }
      get ySize() {
        return this.size[1];
      }
      get top() {
        return this.y;
      }
      get bottom() {
        return this.y + this.ySize;
      }
      get left() {
        return this.x - this.xSize / 2;
      }
      get right() {
        return this.x + this.xSize / 2;
      }
      get root() {
        const h = this.ancestors();
        return h[h.length - 1];
      }
      get numChildren() {
        return this.hasChildren ? this.children.length : 0;
      }
      get hasChildren() {
        return !this.noChildren;
      }
      get noChildren() {
        return this.children === null;
      }
      get firstChild() {
        return this.hasChildren ? this.children[0] : null;
      }
      get lastChild() {
        return this.hasChildren ? this.children[this.numChildren - 1] : null;
      }
      get extents() {
        return (this.children || []).reduce(
          (h, u4) => Z.maxExtents(h, u4.extents),
          this.nodeExtents
        );
      }
      get nodeExtents() {
        return {
          top: this.top,
          bottom: this.bottom,
          left: this.left,
          right: this.right
        };
      }
      static maxExtents(h, u4) {
        return {
          top: Math.min(h.top, u4.top),
          bottom: Math.max(h.bottom, u4.bottom),
          left: Math.min(h.left, u4.left),
          right: Math.max(h.right, u4.right)
        };
      }
    };
  }
  function a2() {
    const s2 = o(), l = n("nodeSize"), p = n("spacing");
    return class extends s2 {
      constructor(h) {
        super(h), Object.assign(this, {
          x: 0,
          y: 0,
          relX: 0,
          prelim: 0,
          shift: 0,
          change: 0,
          lExt: this,
          lExtRelX: 0,
          lThr: null,
          rExt: this,
          rExtRelX: 0,
          rThr: null
        });
      }
      get size() {
        return l(this.data);
      }
      spacing(h) {
        return p(this.data, h.data);
      }
      get x() {
        return this.data.x;
      }
      set x(h) {
        this.data.x = h;
      }
      get y() {
        return this.data.y;
      }
      set y(h) {
        this.data.y = h;
      }
      update() {
        return J(this), Q(this), this;
      }
    };
  }
  function c3(s2, l, p) {
    const h = (u4, g) => {
      const x3 = new s2(u4);
      Object.assign(x3, {
        parent: g,
        depth: g === null ? 0 : g.depth + 1,
        height: 0,
        length: 1
      });
      const m = p(u4) || [];
      return x3.children = m.length === 0 ? null : m.map((y3) => h(y3, x3)), x3.children && Object.assign(x3, x3.children.reduce(
        (y3, f) => ({
          height: Math.max(y3.height, f.height + 1),
          length: y3.length + f.length
        }),
        x3
      )), x3;
    };
    return h(l, null);
  }
  return Object.assign(r, {
    nodeSize(s2) {
      return arguments.length ? (t.nodeSize = s2, r) : t.nodeSize;
    },
    spacing(s2) {
      return arguments.length ? (t.spacing = s2, r) : t.spacing;
    },
    children(s2) {
      return arguments.length ? (t.children = s2, r) : t.children;
    },
    hierarchy(s2, l) {
      const p = typeof l > "u" ? t.children : l;
      return c3(o(), s2, p);
    },
    dump(s2) {
      const l = n("nodeSize"), p = (h) => (u4) => {
        const g = h + "  ", x3 = h + "    ", { x: m, y: y3 } = u4, f = l(u4), k2 = u4.children || [], v2 = k2.length === 0 ? " " : `,${g}children: [${x3}${k2.map(p(x3)).join(x3)}${g}],${h}`;
        return `{ size: [${f.join(", ")}],${g}x: ${m}, y: ${y3}${v2}},`;
      };
      return p(`
`)(s2);
    }
  }), r;
}
q.version = oe;
var J = (e, t = 0) => (e.y = t, (e.children || []).reduce((n, r) => {
  const [o, a2] = n;
  J(r, e.y + e.ySize);
  const c3 = (o === 0 ? r.lExt : r.rExt).bottom;
  o !== 0 && le(e, o, a2);
  const s2 = ge(c3, o, a2);
  return [o + 1, s2];
}, [0, null]), ae(e), fe(e), e);
var Q = (e, t, n) => {
  typeof t > "u" && (t = -e.relX - e.prelim, n = 0);
  const r = t + e.relX;
  return e.relX = r + e.prelim - n, e.prelim = 0, e.x = n + e.relX, (e.children || []).forEach((o) => Q(o, r, e.x)), e;
};
var ae = (e) => {
  (e.children || []).reduce((t, n) => {
    const [r, o] = t, a2 = r + n.shift, c3 = o + a2 + n.change;
    return n.relX += c3, [a2, c3];
  }, [0, 0]);
};
var le = (e, t, n) => {
  const r = e.children[t - 1], o = e.children[t];
  let a2 = r, c3 = r.relX, s2 = o, l = o.relX, p = true;
  for (; a2 && s2; ) {
    a2.bottom > n.lowY && (n = n.next);
    const h = c3 + a2.prelim - (l + s2.prelim) + a2.xSize / 2 + s2.xSize / 2 + a2.spacing(s2);
    (h > 0 || h < 0 && p) && (l += h, ce2(o, h), he(e, t, n.index, h)), p = false;
    const u4 = a2.bottom, g = s2.bottom;
    u4 <= g && (a2 = ue(a2), a2 && (c3 += a2.relX)), u4 >= g && (s2 = de2(s2), s2 && (l += s2.relX));
  }
  !a2 && s2 ? pe(e, t, s2, l) : a2 && !s2 && me(e, t, a2, c3);
};
var ce2 = (e, t) => {
  e.relX += t, e.lExtRelX += t, e.rExtRelX += t;
};
var he = (e, t, n, r) => {
  const o = e.children[t], a2 = t - n;
  if (a2 > 1) {
    const c3 = r / a2;
    e.children[n + 1].shift += c3, o.shift -= c3, o.change -= r - c3;
  }
};
var de2 = (e) => e.hasChildren ? e.firstChild : e.lThr;
var ue = (e) => e.hasChildren ? e.lastChild : e.rThr;
var pe = (e, t, n, r) => {
  const o = e.firstChild, a2 = o.lExt, c3 = e.children[t];
  a2.lThr = n;
  const s2 = r - n.relX - o.lExtRelX;
  a2.relX += s2, a2.prelim -= s2, o.lExt = c3.lExt, o.lExtRelX = c3.lExtRelX;
};
var me = (e, t, n, r) => {
  const o = e.children[t], a2 = o.rExt, c3 = e.children[t - 1];
  a2.rThr = n;
  const s2 = r - n.relX - o.rExtRelX;
  a2.relX += s2, a2.prelim -= s2, o.rExt = c3.rExt, o.rExtRelX = c3.rExtRelX;
};
var fe = (e) => {
  if (e.hasChildren) {
    const t = e.firstChild, n = e.lastChild, r = (t.prelim + t.relX - t.xSize / 2 + n.relX + n.prelim + n.xSize / 2) / 2;
    Object.assign(e, {
      prelim: r,
      lExt: t.lExt,
      lExtRelX: t.lExtRelX,
      rExt: n.rExt,
      rExtRelX: n.rExtRelX
    });
  }
};
var ge = (e, t, n) => {
  for (; n !== null && e >= n.lowY; )
    n = n.next;
  return {
    lowY: e,
    index: t,
    next: n
  };
};
var xe = ".markmap-container{position:absolute;width:0;height:0;top:-100px;left:-100px;overflow:hidden}.markmap-container>.markmap-foreign{display:inline-block}.markmap-container>.markmap-foreign>div:last-child,.markmap-container>.markmap-foreign>div:last-child :not(pre){white-space:nowrap}.markmap-container>.markmap-foreign>div:last-child code{white-space:inherit}";
var tt = ".markmap{--markmap-max-width: none;--markmap-a-color: #0097e6;--markmap-a-hover-color: #00a8ff;--markmap-code-bg: #f0f0f0;--markmap-code-color: #555;--markmap-highlight-bg: #ffeaa7;--markmap-table-border: 1px solid currentColor;--markmap-font: 300 16px/20px sans-serif;--markmap-circle-open-bg: #fff;--markmap-text-color: #333;font:var(--markmap-font);color:var(--markmap-text-color)}.markmap-link{fill:none}.markmap-node>circle{cursor:pointer}.markmap-foreign{display:inline-block}.markmap-foreign p{margin:0}.markmap-foreign a{color:var(--markmap-a-color)}.markmap-foreign a:hover{color:var(--markmap-a-hover-color)}.markmap-foreign code{padding:.25em;font-size:calc(1em - 2px);color:var(--markmap-code-color);background-color:var(--markmap-code-bg);border-radius:2px}.markmap-foreign pre{margin:0}.markmap-foreign pre>code{display:block}.markmap-foreign del{text-decoration:line-through}.markmap-foreign em{font-style:italic}.markmap-foreign strong{font-weight:700}.markmap-foreign mark{background:var(--markmap-highlight-bg)}.markmap-foreign table,.markmap-foreign th,.markmap-foreign td{border-collapse:collapse;border:var(--markmap-table-border)}.markmap-foreign img{display:inline-block}.markmap-foreign svg{fill:currentColor}.markmap-foreign-testing-max{max-width:var(--markmap-max-width)}.markmap-foreign-testing-max img{max-width:var(--markmap-max-width);max-height:none}.markmap-dark .markmap{--markmap-code-bg: #1a1b26;--markmap-code-color: #ddd;--markmap-circle-open-bg: #444;--markmap-text-color: #eee}";
var be = tt;
function W(e) {
  const t = e.data;
  return Math.max(4 - 2 * t.state.depth, 1.5);
}
function Y2(e, t) {
  const n = minIndex(e, t);
  return e[n];
}
function D3(e) {
  e.stopPropagation();
}
var ye = new Hook();
var et = class _et {
  constructor(t, n) {
    this.options = P, this.revokers = [], this.imgCache = {}, this.handleZoom = (r) => {
      const { transform: o } = r;
      this.g.attr("transform", o);
    }, this.handlePan = (r) => {
      r.preventDefault();
      const o = transform(this.svg.node()), a2 = o.translate(
        -r.deltaX / o.k,
        -r.deltaY / o.k
      );
      this.svg.call(this.zoom.transform, a2);
    }, this.handleClick = (r, o) => {
      let a2 = this.options.toggleRecursively;
      (K2 ? r.metaKey : r.ctrlKey) && (a2 = !a2), this.toggleNode(o.data, a2);
    }, this.svg = t.datum ? t : select_default2(t), this.styleNode = this.svg.append("style"), this.zoom = zoom_default2().filter((r) => this.options.scrollForPan && r.type === "wheel" ? r.ctrlKey && !r.button : (!r.ctrlKey || r.type === "wheel") && !r.button).on("zoom", this.handleZoom), this.setOptions(n), this.state = {
      id: this.options.id || this.svg.attr("id") || getId(),
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0
    }, this.g = this.svg.append("g"), this.debouncedRefresh = debounce(() => this.setData(), 200), this.revokers.push(
      ye.tap(() => {
        this.setData();
      })
    );
  }
  getStyleContent() {
    const { style: t } = this.options, { id: n } = this.state, r = typeof t == "function" ? t(n) : "";
    return [this.options.embedGlobalCSS && tt, r].filter(Boolean).join(`
`);
  }
  updateStyle() {
    this.svg.attr(
      "class",
      addClass(this.svg.attr("class"), "markmap", this.state.id)
    );
    const t = this.getStyleContent();
    this.styleNode.text(t);
  }
  toggleNode(t, n = false) {
    var o, a2;
    const r = (o = t.payload) != null && o.fold ? 0 : 1;
    n ? walkTree(t, (c3, s2) => {
      c3.payload = {
        ...c3.payload,
        fold: r
      }, s2();
    }) : t.payload = {
      ...t.payload,
      fold: (a2 = t.payload) != null && a2.fold ? 0 : 1
    }, this.renderData(t);
  }
  initializeData(t) {
    let n = 0;
    const { color: r, nodeMinHeight: o, maxWidth: a2, initialExpandLevel: c3 } = this.options, { id: s2 } = this.state, l = O(
      j("div", { className: `markmap-container markmap ${s2}-g` })
    ), p = O(
      j("style", { children: [this.getStyleContent(), xe].join(`
`) })
    );
    document.body.append(l, p);
    const h = a2 ? `--markmap-max-width: ${a2}px` : "";
    let u4 = 0, g = 0;
    walkTree(t, (m, y3, f) => {
      var b, w, z;
      g += 1, m.children = (b = m.children) == null ? void 0 : b.map((E2) => ({ ...E2 })), n += 1;
      const k2 = O(
        j(
          "div",
          {
            className: "markmap-foreign markmap-foreign-testing-max",
            style: h,
            children: j("div", { dangerouslySetInnerHTML: { __html: m.content } })
          }
        )
      );
      l.append(k2), m.state = {
        ...m.state,
        depth: g,
        id: n,
        el: k2.firstChild
      }, m.state.path = [(w = f == null ? void 0 : f.state) == null ? void 0 : w.path, m.state.id].filter(Boolean).join("."), r(m);
      const v2 = ((z = m.payload) == null ? void 0 : z.fold) === 2;
      v2 ? u4 += 1 : (u4 || c3 >= 0 && m.state.depth >= c3) && (m.payload = { ...m.payload, fold: 1 }), y3(), v2 && (u4 -= 1), g -= 1;
    });
    const x3 = Array.from(l.childNodes).map(
      (m) => m.firstChild
    );
    this._checkImages(l), x3.forEach((m) => {
      var y3;
      (y3 = m.parentNode) == null || y3.append(m.cloneNode(true));
    }), walkTree(t, (m, y3, f) => {
      var b;
      const k2 = m.state, v2 = k2.el.getBoundingClientRect();
      m.content = k2.el.innerHTML, k2.size = [
        Math.ceil(v2.width) + 1,
        Math.max(Math.ceil(v2.height), o)
      ], k2.key = [(b = f == null ? void 0 : f.state) == null ? void 0 : b.id, k2.id].filter(Boolean).join(".") + // FIXME: find a way to check content hash
      m.content, y3();
    }), l.remove(), p.remove();
  }
  _checkImages(t) {
    t.querySelectorAll("img").forEach((n) => {
      if (n.width)
        return;
      const r = this.imgCache[n.src];
      r != null && r[0] ? [n.width, n.height] = r : r || this._loadImage(n.src);
    });
  }
  _loadImage(t) {
    this.imgCache[t] = [0, 0];
    const n = new Image();
    n.src = t, n.onload = () => {
      this.imgCache[t] = [n.naturalWidth, n.naturalHeight], this.debouncedRefresh();
    };
  }
  setOptions(t) {
    this.options = {
      ...this.options,
      ...t
    }, this.options.zoom ? this.svg.call(this.zoom) : this.svg.on(".zoom", null), this.options.pan ? this.svg.on("wheel", this.handlePan) : this.svg.on("wheel", null);
  }
  setData(t, n) {
    n && this.setOptions(n), t && (this.state.data = t), this.state.data && (this.initializeData(this.state.data), this.updateStyle(), this.renderData());
  }
  renderData(t) {
    if (!this.state.data)
      return;
    const { spacingHorizontal: n, paddingX: r, spacingVertical: o, autoFit: a2, color: c3 } = this.options, s2 = q({}).children((i) => {
      var d;
      if (!((d = i.payload) != null && d.fold))
        return i.children;
    }).nodeSize((i) => {
      const [d, S] = i.data.state.size;
      return [S, d + (d ? r * 2 : 0) + n];
    }).spacing((i, d) => i.parent === d.parent ? o : o * 2), l = s2.hierarchy(this.state.data);
    s2(l);
    const p = l.descendants().reverse(), h = l.links(), u4 = linkHorizontal(), g = min(p, (i) => i.x - i.xSize / 2), x3 = max(p, (i) => i.x + i.xSize / 2), m = min(p, (i) => i.y), y3 = max(p, (i) => i.y + i.ySize - n);
    Object.assign(this.state, {
      minX: g,
      maxX: x3,
      minY: m,
      maxY: y3
    }), a2 && this.fit();
    const f = t && p.find((i) => i.data === t) || l, k2 = f.data.state.x0 ?? f.x, v2 = f.data.state.y0 ?? f.y, b = this.g.selectAll(
      childSelector("g")
    ).data(p, (i) => i.data.state.key), w = b.enter().append("g").attr("data-depth", (i) => i.data.state.depth).attr("data-path", (i) => i.data.state.path).attr(
      "transform",
      (i) => `translate(${v2 + f.ySize - i.ySize},${k2 + f.xSize / 2 - i.xSize})`
    ), z = this.transition(b.exit());
    z.select("line").attr("x1", (i) => i.ySize - n).attr("x2", (i) => i.ySize - n), z.select("foreignObject").style("opacity", 0), z.attr(
      "transform",
      (i) => `translate(${f.y + f.ySize - i.ySize},${f.x + f.xSize / 2 - i.xSize})`
    ).remove();
    const E2 = b.merge(w).attr(
      "class",
      (i) => {
        var d;
        return ["markmap-node", ((d = i.data.payload) == null ? void 0 : d.fold) && "markmap-fold"].filter(Boolean).join(" ");
      }
    );
    this.transition(E2).attr(
      "transform",
      (i) => `translate(${i.y},${i.x - i.xSize / 2})`
    );
    const nt = E2.selectAll(
      childSelector("line")
    ).data(
      (i) => [i],
      (i) => i.data.state.key
    ).join(
      (i) => i.append("line").attr("x1", (d) => d.ySize - n).attr("x2", (d) => d.ySize - n),
      (i) => i,
      (i) => i.remove()
    );
    this.transition(nt).attr("x1", -1).attr("x2", (i) => i.ySize - n + 2).attr("y1", (i) => i.xSize).attr("y2", (i) => i.xSize).attr("stroke", (i) => c3(i.data)).attr("stroke-width", W);
    const rt = E2.selectAll(
      childSelector("circle")
    ).data(
      (i) => {
        var d;
        return (d = i.data.children) != null && d.length ? [i] : [];
      },
      (i) => i.data.state.key
    ).join(
      (i) => i.append("circle").attr("stroke-width", "1.5").attr("cx", (d) => d.ySize - n).attr("cy", (d) => d.xSize).attr("r", 0).on("click", (d, S) => this.handleClick(d, S)).on("mousedown", D3),
      (i) => i,
      (i) => i.remove()
    );
    this.transition(rt).attr("r", 6).attr("cx", (i) => i.ySize - n).attr("cy", (i) => i.xSize).attr("stroke", (i) => c3(i.data)).attr(
      "fill",
      (i) => {
        var d;
        return (d = i.data.payload) != null && d.fold && i.data.children ? c3(i.data) : "var(--markmap-circle-open-bg)";
      }
    );
    const it = E2.selectAll(
      childSelector("foreignObject")
    ).data(
      (i) => [i],
      (i) => i.data.state.key
    ).join(
      (i) => {
        const d = i.append("foreignObject").attr("class", "markmap-foreign").attr("x", r).attr("y", 0).style("opacity", 0).on("mousedown", D3).on("dblclick", D3);
        return d.append("xhtml:div").select(function(R) {
          const X2 = R.data.state.el.cloneNode(true);
          return this.replaceWith(X2), X2;
        }).attr("xmlns", "http://www.w3.org/1999/xhtml"), d;
      },
      (i) => i,
      (i) => i.remove()
    ).attr(
      "width",
      (i) => Math.max(0, i.ySize - n - r * 2)
    ).attr("height", (i) => i.xSize);
    this.transition(it).style("opacity", 1);
    const ot = this.g.selectAll(
      childSelector("path")
    ).data(h, (i) => i.target.data.state.key).join(
      (i) => {
        const d = [
          v2 + f.ySize - n,
          k2 + f.xSize / 2
        ];
        return i.insert("path", "g").attr("class", "markmap-link").attr("data-depth", (S) => S.target.data.state.depth).attr("data-path", (S) => S.target.data.state.path).attr("d", u4({ source: d, target: d }));
      },
      (i) => i,
      (i) => {
        const d = [
          f.y + f.ySize - n,
          f.x + f.xSize / 2
        ];
        return this.transition(i).attr("d", u4({ source: d, target: d })).remove();
      }
    );
    this.transition(ot).attr("stroke", (i) => c3(i.target.data)).attr("stroke-width", (i) => W(i.target)).attr("d", (i) => {
      const d = i.source, S = i.target, R = [
        d.y + d.ySize - n,
        d.x + d.xSize / 2
      ], X2 = [
        S.y,
        S.x + S.xSize / 2
      ];
      return u4({ source: R, target: X2 });
    }), p.forEach((i) => {
      i.data.state.x0 = i.x, i.data.state.y0 = i.y;
    });
  }
  transition(t) {
    const { duration: n } = this.options;
    return t.transition().duration(n);
  }
  /**
   * Fit the content to the viewport.
   */
  async fit() {
    const t = this.svg.node(), { width: n, height: r } = t.getBoundingClientRect(), { fitRatio: o } = this.options, { minX: a2, maxX: c3, minY: s2, maxY: l } = this.state, p = l - s2, h = c3 - a2, u4 = Math.min(
      n / p * o,
      r / h * o,
      2
    ), g = identity5.translate(
      (n - p * u4) / 2 - s2 * u4,
      (r - h * u4) / 2 - a2 * u4
    ).scale(u4);
    return this.transition(this.svg).call(this.zoom.transform, g).end().catch(noop);
  }
  findElement(t) {
    let n;
    return this.g.selectAll(
      childSelector("g")
    ).each(function(o) {
      o.data === t && (n = {
        data: o,
        g: this
      });
    }), n;
  }
  /**
   * Pan the content to make the provided node visible in the viewport.
   */
  async ensureView(t, n) {
    var k2;
    const r = (k2 = this.findElement(t)) == null ? void 0 : k2.data;
    if (!r)
      return;
    const o = this.svg.node(), { spacingHorizontal: a2 } = this.options, c3 = o.getBoundingClientRect(), s2 = transform(o), [l, p] = [
      r.y,
      r.y + r.ySize - a2 + 2
    ].map((v2) => v2 * s2.k + s2.x), [h, u4] = [
      r.x - r.xSize / 2,
      r.x + r.xSize / 2
    ].map((v2) => v2 * s2.k + s2.y), g = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      ...n
    }, x3 = [g.left - l, c3.width - g.right - p], m = [g.top - h, c3.height - g.bottom - u4], y3 = x3[0] * x3[1] > 0 ? Y2(x3, Math.abs) / s2.k : 0, f = m[0] * m[1] > 0 ? Y2(m, Math.abs) / s2.k : 0;
    if (y3 || f) {
      const v2 = s2.translate(y3, f);
      return this.transition(this.svg).call(this.zoom.transform, v2).end().catch(noop);
    }
  }
  /**
   * Scale content with it pinned at the center of the viewport.
   */
  async rescale(t) {
    const n = this.svg.node(), { width: r, height: o } = n.getBoundingClientRect(), a2 = r / 2, c3 = o / 2, s2 = transform(n), l = s2.translate(
      (a2 - s2.x) * (1 - t) / s2.k,
      (c3 - s2.y) * (1 - t) / s2.k
    ).scale(t);
    return this.transition(this.svg).call(this.zoom.transform, l).end().catch(noop);
  }
  destroy() {
    this.svg.on(".zoom", null), this.svg.html(null), this.revokers.forEach((t) => {
      t();
    });
  }
  static create(t, n, r = null) {
    const o = new _et(t, n);
    return r && (o.setData(r), o.fit()), o;
  }
};
export {
  et as Markmap,
  gt as defaultColorFn,
  P as defaultOptions,
  Se as deriveOptions,
  be as globalCSS,
  K2 as isMacintosh,
  loadCSS,
  loadJS,
  ye as refreshHook
};
/*! Bundled license information:

markmap-view/dist/index.js:
  (*! @gera2ld/jsx-dom v2.2.2 | ISC License *)
*/
//# sourceMappingURL=markmap-view.js.map
