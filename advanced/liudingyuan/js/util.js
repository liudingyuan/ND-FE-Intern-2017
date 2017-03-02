// 判断arr是否为一个数组，返回一个bool值
function isArray (arr) { return Object.prototype.toString.call(arr) === '[object Array]'; }

// 判断fn是否为一个函数，返回一个bool值
function isFunction (fn) { return Object.prototype.toString.call(fn) === '[object Function]'; }

// 判断obj是否为一个日期对象，返回一个bool值
function isDate (obj) { return Object.prototype.toString.call(obj) === '[object Date]'; }

// clone 递归实现
function cloneObject (src) {
  let obj = null;
  if (typeof src !== 'object' || src === null) { return src; }
  if (isArray(src)) {
    obj = [];
    for (let i = 0; i < src.length; i++) {
      if (typeof src[i] === 'object') {
        obj[i] = cloneObject(src[i]);
      } else {
        obj[i] = src[i];
      }
    }
  } else if (isDate(src)) {
    obj = src;
  } else {
    obj = {};
    for (const x in src) {
      if (typeof src[x] === 'object') {
        obj[x] = cloneObject(src[x]);
      } else {
        obj[x] = src[x];
      }
    }
  }
  return obj;
}

// function clone (src) {
//   if (typeof src !== 'object') { return src; }
//   return JSON.parse(JSON.stringify(src));
// }

// 数组去重
function uniqArray (arr) {
  const newArr = [];
  for (const item of arr) {
    if (!newArr.includes(item)) {
      newArr.push(item);
    }
  }
  return newArr;
}

// 去除字符串首尾空格
function trim (str) { return str.replace(/(^\s*)|(\s*$)/g, ''); }

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
function isEmail (emailStr) { return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(emailStr); }

// 判断是否为手机号
function isMobilePhone (phone) { return /^1\d{10}$/.test(phone); }

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
function $ (selector, target) {
  let el = target || document;
  if (!/\s/.test(selector)) {
    switch (selector[0]) {
      case '#':
        if (el.getElementById) {
          el = el.getElementById(selector.substring(1));
        } else {
          el = document.getElementById(selector.substring(1));
        }
        break;
      case '.':
        el = el.getElementsByClassName(selector.substring(1))[0];
        break;
      case '[':
        const elArr = document.all;
        const selec = selector.substring(1, selector.length - 1);
        if (!selector.includes('=')) {
          for (const x of elArr) {
            if (x.getAttribute(selec)) {
              el = x;
              break;
            }
          }
        } else {
          const attr = selec.split('=')[0];
          const data = selec.split('=')[1];
          for (const x of elArr) {
            if (x.getAttribute(attr) && x.getAttribute(attr) === data) {
              el = x;
              break;
            }
          }
        }
        break;
      default: el = el.getElementsByTagName(selector)[0];
    }
  } else {
    const selec = selector.split(' ')[0];
    const reSelector = selector.substring(selec.length + 1, selector.length);
    el = $(reSelector, $(selec));
  }
  return el;
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
    if (e.keyCode === 13) { listener.call(this, e); }
  });
}

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

// 事件代理
function delegateEvent (element, tag, eventName, listener) {
  addEvent(element, eventName, function (e) {
    if (e.target.nodeName.toLowerCase() === tag) {
      listener.call(this, e);
    }
  });
}

$.on = function (selector, event, listener) { addEvent($(selector), event, listener); };
$.un = function (selector, event, listener) { removeEvent($(selector), event, listener); };
$.click = function (selector, listener) { addClickEvent($(selector), listener); };
$.delegate = function (selector, tag, event, listener) { delegateEvent($(selector), tag, event, listener); };

// 判断是否为IE浏览器，返回-1或者版本号
function isIE () {
  var userAgentStr = navigator.userAgent;
  var edge = userAgentStr.match('Edge');
  var ieAgent = userAgentStr.match(/MSIE (\d+\.\d+)/i);
  var ie11 = userAgentStr.match(/rv:(\d+\.\d+)/i);
  if (edge) {
    return edge[0];
  } else if (ieAgent) {
    return ieAgent[1];
  } else if (ie11) {
    return ie11[1];
  } else {
    return -1;
  }
}

// 设置cookie
function setCookie (cookieName, cookieValue, expiredays) {
  const date = new Date();
  date.setTime(date.getTime() + expiredays * 24 * 3600 * 1000);
  document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()}`;
}

// 获取cookie值
function getCookie (cookieName) {
  const name = cookieName + '=';
  const cookieArr = document.cookie.split(';');
  for (const x of cookieArr) {
    const target = x.trim();
    if (target.includes(name)) {
      return target.substring(name.length, target.length);
    }
  }
}

// ajax
function ajax (url, options) {
  let request = null;
  const type = options.type || 'get';
  const data = options.data || null;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject('Microsoft XMLHTTP');
  }
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      options.onsuccess(request.responseText, request);
    } else {
      options.onfail(request.status, request);
    }
  };
  request.open(type, url);
  request.send(data);
}
