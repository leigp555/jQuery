window$ = jQuery = function (selectorOrArray) {
  let element;
  if (typeof selectorOrArray === "string") {
    element = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    element = selectorOrArray;
  }

  const api = Object.create(jQuery.prototype);
  Object.assign(api, {
    oldApi: selectorOrArray.oldApi,
    element: element,
  });
  return api;
};
jQuery.prototype = {
  constructor: jQuery,
  addClass(className) {
    for (let i = 0; i < this.element.length; i++) {
      this.element[i].classList += className;
    }

    return this;
  },
  find(selector) {
    let result = [];
    for (let i = 0; i < this.element.length; i++) {
      let element2 = this.element[i].querySelectorAll(selector);
      result = result.concat(Array.from(element2));
    }
    result.oldApi = this;
    return jQuery(result);
  },
  back() {
    return this.oldApi;
  },
  each(fn) {
    for (let i = 0; i < this.element.length; i++) {
      fn(this.element[i], i);
    }
    return this;
  },
  parent() {
    const arr = [];
    this.each((node) => {
      if (arr.indexOf(node.parentNode) === -1) {
        arr.push(node.parentNode);
      }
    });
    return jQuery(arr);
  },
  print() {
    console.log(this.element);
    return this;
  },
  children() {
    let arr = [];
    this.each((node) => {
      arr.push(...node.children);
    });
    return jQuery(arr);
  },
};
