let doc = document
let getEles = (selector, context) => {
  return Array.from(((context && context) || doc).querySelectorAll(selector))
}
let isUndefined = (obj) => {
  return obj === void 0
}

class Vquery {
  constructor (selector, context) {
    this.elements = getEles(selector, context)
  }

  optimizeCb (callback) {
    this.elements.forEach(callback)
  }

  get (index) {
    return this.elements[index < 0 ? 0 : index]
  }

  html (sHtml) {
    if (isUndefined(sHtml)) {
      return this.get(0).innerHTML
    }

    this.optimizeCb((ele) => {
      ele.innerHTML = sHtml
    })

    return this
  }

  addClass (iClass) {
    this.optimizeCb((ele) => {
      if (ele.className.split(' ').indexOf(iClass) === -1) {
        ele.className += ` ${iClass}`
      }
    })

    return this
  }

  css (styles) {
    if (typeof styles === 'object') {
      this.optimizeCb((ele) => {
        for (let key in styles) {
          ele.style[key] = styles[key]
        }
      })
    }

    return this
  }

  height (h) {
    if (isUndefined(h)) {
      return this.get(0).offsetHeight
    }

    this.optimizeCb((ele) => {
      ele.style.height = h
    })
  }

  scrollTop (top) {
    if (isUndefined(top)) {
      return this.get(0).scrollTop
    }

    this.optimizeCb((ele) => {
      ele.scrollTop = top
    })
  }
}

export default (selector, context) => {
  return new Vquery(selector, context)
}
