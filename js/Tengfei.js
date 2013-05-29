
/**
 * @license TengfeiJS v2013.05
 * (c) 2011-2013 QiQi.Me, Inc. http://blog.qiqi.me
 * License: MIT
 * Date: 2013-05-18
 */
(function (w, d, undefined) {
'use strict';

var lowercase = function(string){return isString(string) ? string.toLowerCase() : string;};

var uppercase = function(string){return isString(string) ? string.toUpperCase() : string;};

var manualLowercase = function(s) {
  return isString(s)
      ? s.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);})
      : s;
};
var manualUppercase = function(s) {
  return isString(s)
      ? s.replace(/[a-z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) & ~32);})
      : s;
};

if ('i' !== 'I'.toLowerCase()) {
  lowercase = manualLowercase;
  uppercase = manualUppercase;
}

var 
    msie              = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]),
    jqLite,           // delay binding since jQuery could be loaded after us.
    jQuery,           // delay binding
    slice             = [].slice,
    push              = [].push,
    toString          = Object.prototype.toString,


    _angular          = window.angular,
    /** @name angular */
    angular           = window.angular || (window.angular = {}),
    angularModule,
    nodeName_,
    uid               = ['0', '0', '0'];

function noConflict() {
  var T = window.tengfei;
  window.angular = _tengfei;
  return T;
}

function isArrayLike(obj) {
  if (!obj || (typeof obj.length !== 'number')) return false;

  // We have on object which has length property. Should we treat it as array?
  if (typeof obj.hasOwnProperty != 'function' &&
      typeof obj.constructor != 'function') {
    // This is here for IE8: it is a bogus object treat it as array;
    return true;
  } else  {
    return obj instanceof JQLite ||                      // JQLite
           (jQuery && obj instanceof jQuery) ||          // jQuery
           toString.call(obj) !== '[object Object]' ||   // some browser native object
           typeof obj.callee === 'function';              // arguments (on IE8 looks like regular obj)
  }
}

function forEach(obj, iterator, context) {
  var key;
  if (obj) {
    if (isFunction(obj)){
      for (key in obj) {
        if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context);
    } else if (isArrayLike(obj)) {
      for (key = 0; key < obj.length; key++)
        iterator.call(context, obj[key], key);
    } else {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key);
        }
      }
    }
  }
  return obj;
}

function sortedKeys(obj) {
  var keys = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys.sort();
}

function forEachSorted(obj, iterator, context) {
  var keys = sortedKeys(obj);
  for ( var i = 0; i < keys.length; i++) {
    iterator.call(context, obj[keys[i]], keys[i]);
  }
  return keys;
}

function reverseParams(iteratorFn) {
  return function(value, key) { iteratorFn(key, value) };
}

function extend(dst) {
  forEach(arguments, function(obj){
    if (obj !== dst) {
      forEach(obj, function(value, key){
        dst[key] = value;
      });
    }
  });
  return dst;
}

var START_SPACE = /^\s*/;
var END_SPACE = /\s*$/;
function stripWhitespace(str) {
  return isString(str) ? str.replace(START_SPACE, '').replace(END_SPACE, '') : str;
}

function isUndefined(value){return typeof value == 'undefined';}

function isDefined(value){return typeof value != 'undefined';}

function isObject(value){return value != null && typeof value == 'object';}

function isString(value){return typeof value == 'string';}

function isNumber(value){return typeof value == 'number';}

function isDate(value){
  return toString.apply(value) == '[object Date]';
}

function isArray(value) {
  return toString.apply(value) == '[object Array]';
}

function isFunction(value){return typeof value == 'function';}

function isWindow(obj) {
  return obj && obj.document && obj.location && obj.alert && obj.setInterval;
}

function isScope(obj) {
  return obj && obj.$evalAsync && obj.$watch;
}

function isFile(obj) {
  return toString.apply(obj) === '[object File]';
}

function isBoolean(value) {
  return typeof value == 'boolean';
}

function trim(value) {
  return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
}

function isElement(node) {
  return node &&
    (node.nodeName  // we are a direct element
    || (node.bind && node.find));  // we have a bind and find method part of jQuery API
}

/**
 * @param str 'key1,key2,...'
 * @returns {object} in the form of {key1:true, key2:true, ...}
 */
function makeMap(str){
  var obj = {}, items = str.split(","), i;
  for ( i = 0; i < items.length; i++ )
    obj[ items[i] ] = true;
  return obj;
}

if (msie < 9) {
  nodeName_ = function(element) {
    element = element.nodeName ? element : element[0];
    return (element.scopeName && element.scopeName != 'HTML')
      ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
  };
} else {
  nodeName_ = function(element) {
    return element.nodeName ? element.nodeName : element[0].nodeName;
  };
}

function map(obj, iterator, context) {
  var results = [];
  forEach(obj, function(value, index, list) {
    results.push(iterator.call(context, value, index, list));
  });
  return results;
}

//动态加载js文件
function loadScript(url,callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        }
    } else {
               script.onload = function(){
                   callback();
               }
    }
    
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild("script");
}

})(window, document);
