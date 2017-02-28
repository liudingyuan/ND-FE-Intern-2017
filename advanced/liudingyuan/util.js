// 判断arr是否为一个数组，返回一个bool值
function isArray (arr) { return Object.prototype.toString.call(arr) === '[object Array]'; }

// 判断fn是否为一个函数，返回一个bool值
function isFunction (fn) { return Object.prototype.toString.call(fn) === '[object Function]'; }

// clone
function cloneObject (src) {
  //
}

// 数组去重
function uniqArray (arr) {
  //
}

// 去除字符串首尾空格
function trim (str) {
  //
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each (arr, fn) {
  arr.forEach(function (item, index) { fn.call(item, item, index); });
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength (obj) {
  let count = 0;
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) {
      count++;
    }
  }
  return count;
}

// 判断是否为邮箱地址
function isEmail (emailStr) {
    // your implement
}

// 判断是否为手机号
function isMobilePhone (phone) {
  //
}

// 为element增加一个样式名为newClassName的新样式
function addClass (element, newClassName) {
  element.classList.add(newClassName);
}

// 移除element中的样式oldClassName
function removeClass (element, oldClassName) {
  element.classList.remove(oldClassName);
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode (element, siblingNode) {
  return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition (element) {
  const elPosition = element.getBoundingClientRect();
  return {
    x: elPosition.left,
    y: elPosition.top
  };
}

// 实现一个简单的Query
function $ (selector) {
  if (!/\s/.test(selector)) {
    switch (selector[0]) {
      case '#':
        return document.getElementById(selector.substring(1));
        break;
      case '.':
        return document.getElementsByClassName(selector.substring(1))[0];
        break;
      case '[':
        //
        break;
      default: return document.getElementsByTagName(selector)[0];
    }
  } else {
    const selectorArr = selector.split(' ');
  }
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent (element, event, listener) {
  element.addEventListener(event, listener, false);
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent (element, event, listener) {
  element.removeEventListener(event, listener, false);
}

// 实现对click事件的绑定
function addClickEvent (element, listener) {
  addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent (element, listener) {
  addEvent(element, 'keydown', function (e) {
    if (e.keyCode === 13) { listener(e); }
  });
}

$.on = function (element, event, listener) { addEvent(element, event, listener); };
$.un = function (element, event, listener) { removeEvent(element, event, listener); };
$.click = function (element, listener) { addClickEvent(element, listener); };
$.enter = function (element, listener) { addEnterEvent(element, listener); };

// 事件代理
function delegateEvent (element, tag, eventName, listener) {
  addEvent(element, eventName, function (e) {
    if (e.target.nodeName.toLowerCase() === tag) {
      listener(e);
    }
  });
}

$.on = function (selector, event, listener) { addEvent($(selector), event, listener); };
$.un = function (selector, event, listener) { removeEvent($(selector), event, listener); };
$.click = function (selector, listener) { addClickEvent($(selector), listener); };
$.delegate = function (selector, tag, event, listener) { delegateEvent($(selector), tag, event, listener); };
