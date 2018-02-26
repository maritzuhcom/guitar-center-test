/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_app_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Header__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_AppBody__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Footer__ = __webpack_require__(21);





window.addEventListener('DOMContentLoaded', main, {
  once: true
});

function main() {
  const app = document.body;
  const headerIntance = __WEBPACK_IMPORTED_MODULE_1__components_Header__["a" /* default */].register('app-header');
  const appBodyInstance = __WEBPACK_IMPORTED_MODULE_2__components_AppBody__["a" /* default */].register('app-body');
  const footer = __WEBPACK_IMPORTED_MODULE_3__components_Footer__["a" /* default */].register('app-footer');
  document.body.appendChild(headerIntance);
  document.body.appendChild(appBodyInstance);
  document.body.appendChild(footer);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(4);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/index.js!./app.css", function() {
		var newContent = require("!!../node_modules/css-loader/index.js!./app.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".app {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 1em;\n  box-sizing: border-box;\n  font-family: sans-serif;\n  font-weight: 200;\n}\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__header_css__);


class Header extends HTMLElement {
  constructor() {
    super();

    this.closeSubMenu = () => {
      this.wrapper.removeChild(this.menu);
      this.menu = null;
    };

    this.openSubMenu = () => {
      if (this.menu instanceof HTMLElement) {
        return;
      }

      const menu = document.createElement('section');
      const electric = document.createElement('span');
      const acousticGuitars = document.createElement('span');
      const acousticElectric = document.createElement('span');
      const classical = document.createElement('span');

      electric.innerHTML = "Electric Guitars";
      acousticGuitars.innerHTML = "Acoustic Guitars";
      acousticElectric.innerHTML = "Acoustic-Electric Guitars";
      classical.innerHTML = "Classical Guitars";

      menu.appendChild(electric);
      menu.appendChild(acousticGuitars);
      menu.appendChild(acousticElectric);
      menu.appendChild(classical);

      menu.setAttribute('class', 'subMenu');

      this.wrapper.appendChild(menu);
      this.menu = menu;
      this.menu.addEventListener('mouseleave', this.closeSubMenu);
    };

    const shadow = this.attachShadow({ mode: 'open' });

    this.wrapper = document.createElement('main');
    this.wrapper.setAttribute('class', 'custom-header-wrapper');

    const style = document.createElement('style');

    this.subMenu = null;

    style.textContent = Style;

    // create the menu icons
    const menuItems = [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')];

    // add class for style
    menuItems.forEach(item => {
      item.setAttribute('class', 'menuItem');
    });

    // add the title text
    menuItems[0].innerHTML = "Guitars";
    menuItems[1].innerHTML = "Bass";
    menuItems[2].innerHTML = "Drums";
    menuItems[3].innerHTML = "Keyboards";
    menuItems[4].innerHTML = "DJ & Lighting";
    menuItems[5].innerHTML = "Used Gear";
    menuItems[6].innerHTML = "Clearance";

    // add style
    shadow.appendChild(style);

    // add items to shadow root of element
    menuItems.forEach(item => {
      this.wrapper.appendChild(item);
    });

    shadow.appendChild(this.wrapper);

    const guitar = menuItems[0];

    guitar.addEventListener('mouseover', this.openSubMenu);
  }

  static register(name) {
    customElements.define(name, Header);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-header');

    return element;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Header;


const Style = `
  .custom-header-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 3em;
    background-color: rgb(208,208,208);
    color: white;
    border: 1px solid black;
  }

  .menuItem {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 300ms;
    cursor: pointer;
  }

  .menuItem:hover {
    background-color: rgb(144,144,144);

  }

  .subMenu {
    position: absolute;
    top: 119%;
    left: 0;
    height: 10em;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1em;
    background-color: rgb(144,144,144);
    justify-content: space-evenly;
    z-index: 3;
  }

  .subMenu span {
    cursor: pointer;
  }
`;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(8);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./header.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./header.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".custom-header {\n  width: 100%;\n  height: 3em;\n  position: relative;\n  display: flex;\n}\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Accordion__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Ad__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Tabs__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TabContent__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appBody_css__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appBody_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__appBody_css__);






class AppBody extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');

    style.textContent = Style;

    const leftSide = document.createElement('section');
    const rightSide = document.createElement('section');

    leftSide.setAttribute('class', 'leftSide');
    rightSide.setAttribute('class', 'rightSide');

    const accordionInstance = __WEBPACK_IMPORTED_MODULE_0__Accordion__["a" /* default */].register('right-accordion');
    const adInstance = __WEBPACK_IMPORTED_MODULE_1__Ad__["a" /* default */].register('left-ad');
    const tabIntance = __WEBPACK_IMPORTED_MODULE_2__Tabs__["a" /* default */].register('bottom-tabs');
    const tabContentInstance = __WEBPACK_IMPORTED_MODULE_3__TabContent__["a" /* default */].register('bottom-tab-content');

    leftSide.appendChild(adInstance);
    leftSide.appendChild(tabIntance);
    leftSide.appendChild(tabContentInstance);
    rightSide.appendChild(accordionInstance);

    shadow.appendChild(style);
    shadow.appendChild(leftSide);
    shadow.appendChild(rightSide);
  }

  static register(name) {
    customElements.define(name, AppBody);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-app-body');

    return element;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AppBody;


const Style = `
  .rightSide {
    width: 20%;
    height: 100%;
    background-color: rgb(208,208,208);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 1em;
  }

  .leftSide {
    width: 80%;
    height 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-right: 1em;
  }

  .custom-accordion {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .custom-ad {
    width: 100%;
    height: 40%;
    position: realtive;
  }

  .custom-tabs {
    width: 100%;
    height: 7.5em;
    position: realtive;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 1em;
  }

  .custom-tabContent {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 1em;
    border: 1px solid rgb(120, 120, 120);
    box-sizing: border-box;
  }
`;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Accordion extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');

    style.textContent = Style;

    this.links = [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')];

    shadow.appendChild(style);

    this.links.forEach((link, i) => {
      link.setAttribute('class', 'link');
      const linkText = document.createElement('span');
      linkText.innerHTML = `Link ${i + 1}`;
      link.appendChild(linkText);
      link.addEventListener('click', () => {
        link.classList.add('linkOpen');
        const subLink = document.createElement('div');
        subLink.setAttribute('class', 'subLink');
        subLink.innerHTML = `
          <span>sub-link</span>
          <span>sub-link</span>
          <span>sub-link</span>
        `;
        link.appendChild(subLink);
      }, { once: true });
      shadow.appendChild(link);
    });
  }

  static register(name) {
    customElements.define(name, Accordion);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-accordion');

    return element;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Accordion;


const Style = `
  .link {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    margin-bottom: 2px;
    padding: .5em;
    box-sizing: border-box;
    font-weight: 400;
  }

  .link span{
    width: 100%;
  }

  .link .subLink {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    margin: .5em 0 0 3em;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
  }

  .link.linkOpen {
    background-color: rgb(140, 140, 140);
    color: rgb(255, 255, 255);
  }
`;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_main_jpg__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_main_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__images_main_jpg__);


class Ad extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    const image = document.createElement('section');
    const img = document.createElement('img');
    img.src = __WEBPACK_IMPORTED_MODULE_0__images_main_jpg___default.a;
    image.setAttribute('class', 'ad-image');
    image.appendChild(img);

    const description = document.createElement('section');
    const header = document.createElement('header');
    const adText = document.createElement('span');

    header.innerHTML = 'New Guitars';
    adText.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet elit non dignissim posuere. Donec ligula justo, sollicitudin quis ipsum sed, accumsan bibendum massa. Suspendisse varius mattis felis vitae malesuada.';

    description.setAttribute('class', 'ad-content');
    header.setAttribute('class', 'ad-header');
    adText.setAttribute('class', 'ad-text');

    description.appendChild(header);
    description.appendChild(adText);

    image.appendChild(description);

    style.textContent = Style;
    shadow.appendChild(style);
    shadow.appendChild(image);
  }

  static register(name) {
    customElements.define(name, Ad);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-ad');

    return element;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ad;


const Style = `
  .ad-image {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
    border: 2px solid rgb(192,192,192);
    border-radius: 8px;
    overflow: hidden;
    padding: 1em;
    box-sizing: border-box;
  }

  img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .ad-content {
    height: 100%;
    width: 17em;
    display: flex;
    flex-direction: column;
    background-color: rgb(165,165,165);
    border: 2px solid black;
    border-radius: 3px;
    z-index: 2;
  }

  .ad-header {
    color: white;
    width: 100%;
    text-align: center;
    font-size: 19px;
    border-bottom: 2px solid black;
    background-color: rgb(132, 132, 132);
  }

  .ad-text {
    font-weight: 400;
    padding: .4em;
    box-sizing: border-box;
  }
`;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "871e64d9c0220884ad4e67cbaa685c8f.jpg";

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tabs extends HTMLElement {
  constructor() {
    super();

    this.hashChangeHandler = e => {
      const newHash = e.newURL.split('#')[1];
      this.buttons[newHash].click();
    };

    this.clickHandler = e => {
      if (this.active) {
        this.active.classList.remove('active');
      }
      window.location.hash = e.target.dataset.hash;
      e.target.classList.add('active');
      this.active = e.target;
    };

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    const buttonWrapper = document.createElement('section');
    buttonWrapper.setAttribute('class', 'tabButtonWrapper');

    this.buttons = [document.createElement('div'), document.createElement('div'), document.createElement('div')];

    const labels = ['On Sale', 'New Arrivals', 'Sign Up'];

    this.buttons.forEach((button, i) => {
      button.setAttribute('class', 'tabButton');

      const text = document.createElement('span');
      text.innerHTML = labels[i];
      button.appendChild(text);
      button.dataset.hash = i;
      button.addEventListener('click', this.clickHandler);

      buttonWrapper.appendChild(button);
    });

    style.textContent = Style;
    shadow.appendChild(style);

    shadow.appendChild(buttonWrapper);
    this.active = this.buttons[0];
    window.addEventListener('hashchange', this.hashChangeHandler);
  }

  connectedCallback() {
    this.active.click();
  }

  static register(name) {
    customElements.define(name, Tabs);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-tabs');

    return element;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tabs;


const Style = `
  .tabButtonWrapper {
    display: flex
  }

  .tabButton {
    height: 4em;
    width: 12em;
    background: linear-gradient(rgb(255, 255, 255), rgb(150, 150, 150));
    border: 1px solid rgb(120, 120, 120);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tabButton.active {
    background: rgb(255, 255, 255);
    position: relative;
    border-bottom: 0;
  }

  .tabButton.active::after {
    content: " ";
    height: 1em;
    width: 100%;
    background-color: white;
    top: 100%;
    position: absolute;
  }

  .tabButton span {
    font-weight: 400;
    font-size: 17px;
    pointer-events: none;
  }

  div.tabButton:first-child {
    border-right: 0;
  }

  div.tabButton:last-child {
    border-left: 0;
  }
`;

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_product1_jpg__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_product1_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__images_product1_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_product2_jpg__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_product2_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__images_product2_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_product3_jpg__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_product3_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__images_product3_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__json_new_arrivals_json__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__json_new_arrivals_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__json_new_arrivals_json__);






class TabContent extends HTMLElement {
  constructor() {
    super();

    this.hashChangeHandler = e => {
      const newHash = e.newURL.split('#')[1];

      if (this.titles[newHash] !== undefined) {
        this.shadow.removeChild(this.titleElement);
        this.shadow.removeChild(this.tabElement);
        this.shadow.appendChild(this.titles[newHash]);
        this.shadow.appendChild(this.tabElement);
        this.titleElement = this.titles[newHash];
      }

      if (this.tabs[newHash] !== undefined) {
        this.shadow.removeChild(this.tabElement);
        this.shadow.appendChild(this.tabs[newHash]);
        this.tabElement = this.tabs[newHash];
      }
    };

    this.generateFirstTab = () => {
      const wrapper = document.createElement('section');
      wrapper.setAttribute('class', 'tabOne');

      const imageSources = [__WEBPACK_IMPORTED_MODULE_0__images_product1_jpg___default.a, __WEBPACK_IMPORTED_MODULE_1__images_product2_jpg___default.a, __WEBPACK_IMPORTED_MODULE_2__images_product3_jpg___default.a];

      const arr = [0, 1, 2];

      arr.forEach(num => {
        const contentWrapper = document.createElement('section');
        contentWrapper.setAttribute('class', 'tabOneContent');

        const imageWrapper = document.createElement('div');
        const img = document.createElement('img');

        imageWrapper.setAttribute('class', 'imageWrapper');

        img.src = imageSources[num];

        const title = document.createElement('span');
        const oldPrice = document.createElement('span');
        const newPrice = document.createElement('span');

        title.innerHTML = 'The Name of this Instrument';
        oldPrice.innerHTML = 'Was: 500.00';
        newPrice.innerHTML = 'Now: 295.00';

        title.setAttribute('class', 'priceTitle');
        oldPrice.setAttribute('class', 'oldPrice');
        newPrice.setAttribute('class', 'newPrice');

        wrapper.appendChild(contentWrapper);
        contentWrapper.appendChild(imageWrapper);
        imageWrapper.appendChild(img);
        contentWrapper.appendChild(imageWrapper);
        contentWrapper.appendChild(title);
        contentWrapper.appendChild(oldPrice);
        contentWrapper.appendChild(newPrice);
      });

      return wrapper;
    };

    this.generateSecondTab = () => {
      const contentWrapper = document.createElement('section');
      contentWrapper.setAttribute('class', 'tabTwoContent');

      const data = __WEBPACK_IMPORTED_MODULE_3__json_new_arrivals_json___default.a.newArrivals[0];

      console.log(data);

      const card = document.createElement('section');
      // decided to use string HTML instead of declarative because this is really static
      card.innerHTML = `
      <section class="cardWrapper">
        <div>
          <img src="${data.image}">
        </div>
        <div>
          <span class="tabTwoTitle">${data.title}</span>
          <span class="tabTwoContent">${data.description}</span>
          <a href=${data.url}><span>Link to somewhere</span></a>
        </div>
      </section>
    `;
      contentWrapper.appendChild(card);

      return contentWrapper;
    };

    this.generateThirdTab = () => {
      const textInputs = ['First Name:', 'Last Name:', 'Email Address:', 'Password:'];

      const contentWrapper = document.createElement('section');
      contentWrapper.setAttribute('class', 'tabThreeContent');

      // create all the similar ones
      textInputs.forEach(inputText => {
        const inputWrapper = document.createElement('section');
        inputWrapper.setAttribute('class', 'inputWrapper');

        const span = document.createElement('span');
        const input = document.createElement('input');

        span.innerHTML = inputText;
        inputWrapper.appendChild(span);
        inputWrapper.appendChild(input);

        contentWrapper.appendChild(inputWrapper);
      });

      // create first one off
      const inputWrapper = document.createElement('section');
      inputWrapper.setAttribute('class', 'inputWrapper');
      const option = document.createElement('select');
      const optionText = document.createElement('span');

      optionText.innerHTML = 'Communication Method:';

      inputWrapper.appendChild(optionText);
      inputWrapper.appendChild(option);

      contentWrapper.appendChild(inputWrapper);

      //create second one off
      const doubleInputWrapper = document.createElement('section');
      doubleInputWrapper.setAttribute('class', 'inputWrapper');
      const doubleOptionText = document.createElement('span');
      doubleOptionText.innerHTML = 'Birthday:';

      const optionWrapper = document.createElement('div');
      const month = document.createElement('select');
      const day = document.createElement('select');

      optionWrapper.appendChild(month);
      optionWrapper.appendChild(day);

      doubleInputWrapper.appendChild(doubleOptionText);
      doubleInputWrapper.appendChild(optionWrapper);

      contentWrapper.appendChild(doubleInputWrapper);

      // create submit button
      const buttonWrapper = document.createElement('section');
      buttonWrapper.setAttribute('class', 'inputWrapper');
      const buttonPlaceholder = document.createElement('div');
      const button = document.createElement('button');
      button.innerHTML = 'Create Account';

      buttonWrapper.appendChild(buttonPlaceholder);
      buttonWrapper.appendChild(button);

      contentWrapper.appendChild(buttonWrapper);

      return contentWrapper;
    };

    this.shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    this.tabs = [this.generateFirstTab(), this.generateSecondTab(), this.generateThirdTab()];

    this.titleText = ['HEADLINER DEALS', 'New Arrivals', 'New Account'];

    this.titles = [document.createElement('h1'), document.createElement('h1'), document.createElement('h1')];

    this.titles.forEach((titleEL, i) => {
      titleEL.setAttribute('class', 'tabContentTitle');
      titleEL.innerHTML = this.titleText[i];
    });

    const tabContainer = document.createElement('section');
    tabContainer.setAttribute('class', 'tabContainer');

    style.textContent = Style;
    this.shadow.appendChild(style);
    this.shadow.appendChild(this.titles[0]);
    this.shadow.appendChild(this.tabs[0]);
    this.tabElement = this.tabs[0];
    this.titleElement = this.titles[0];

    window.addEventListener('hashchange', this.hashChangeHandler);
  }

  static register(name) {
    customElements.define(name, TabContent);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-tabContent');

    return element;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TabContent;


const Style = `
  .tabContentTitle {
    color: rgb(200, 200, 200);
    font-size: 19px;
  }

  .tabContainer: {
    height: 100%;
    width: 100%;
  }

  .imageWrapper {
    position: relative;
    border: 1px solid rgb(120, 120, 120);
    height: 9em;
    width: 9em;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

  .imageWrapper img{
    width: 100%;
  }

  .priceTitle {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-weight: bold;
    width: 10em;
    overflow-wrap: break-word;
  }

  .oldPrice {
    color: red;
    text-decoration: line-through;
    text-decoration-color: black;
  }

  .tabOne {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-content: ceneter;
  }

  .tabOneContent,
  .tabThreeContent,
  .tabTwoContent {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .inputWrapper {
    width: 100%;
    display: flex;
    margin-bottom: .5em;
    box-sizing: border-box;
  }

  .inputWrapper span {
    width: 50%;
    text-align: end;
    font-weight: 400;
  }

  .inputWrapper input,
  .inputWrapper select {
    width: 50%;
    margin-left: 1em;
  }

  .inputWrapper div select:first-child {
    margin: 0;
  }

  .inputWrapper div {
    display: flex;
    width: 50%;
    margin-left: .5em;
  }

  .cardWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 1em;
    box-sizing: border-box;
    background: linear-gradient(rgb(255, 255, 255), rgb(220, 220, 220));
  }

  .tabTwoTitle {
    font-weight: bold;
    color: grey;
    width: 100%;
    display: flex;
    padding-left: 1em;
    box-sizing: border-box;
  }

  .tabTwoContent {
    width: 100%;
    display: flex;
    padding: 1em;
    box-sizing: border-box;
  }

  .cardWrapper a {
    padding: 1em;
  }

  .cardWrapper img {
    border: 1px solid black;
    box-sizing: border-box;
  }

  button {
    background: linear-gradient(rgb(255, 255, 255), rgb(150, 150, 150));
    font-size: 14px;
    width: 10em;
    height: 2em;
  }
`;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "91a4b4006ac7170330101bf50d8c418e.jpg";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "659ae5e656b90a9cb02a5e4950230d57.jpg";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b870521f6912e04e8f19a09f9ea68b0b.jpg";

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {"newArrivals":[{"image":"http://static.guitarcenter.com/static/gc/front-end-dev/code-assessment/new-arrival.jpg","title":"Gibson Les Paul","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet elit non dignissim posuere. Donec ligula justo, sollicitudin quis ipsum sed, accumsan bibendum massa. Suspendisse varius mattis felis vitae malesuada.","url":"http://www.guitarcenter.com"}]}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(20);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./appBody.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./appBody.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".custom-app-body {\n  height: 100%;\n  width: 100%;\n  margin: 1em 0;\n  position: relative;\n  display: flex;\n}\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__footer_css__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__footer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__footer_css__);


class Footer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const text = document.createElement('span');
    text.innerHTML = 'Copyright Guitar © Center, Inc.';
    shadow.appendChild(text);
  }

  static register(name) {
    customElements.define(name, Footer);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-footer');

    return element;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Footer;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(23);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./footer.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./footer.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".custom-footer {\n  width: 100%;\n  height: 3em;\n  position: relative;\n  display: flex;\n  align-items: center;\n  padding-left: 1em;\n  font-weight: 400;\n  box-sizing: border-box;\n  border: 1px solid black;\n  background-color: rgb(208,208,208);\n  color: black;\n\n}\n", ""]);

// exports


/***/ })
/******/ ]);