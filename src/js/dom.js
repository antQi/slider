function addClass(el, className) {
    if (hasClass(el, className)) { return }
    var classes = el.className.split(' ')
    classes.push(className)
    el.className = classes.join(' ')
}

function removeClass(el, className) {
    var reg = new RegExp(className, 'g')
    el.className = el.className.replace(reg, '')
}

function hasClass(el, className) {
    var ret = el.className.indexOf(className) !== -1
    return ret
}

function getStyle(el, styleName) {
    var styleObj, style

    if (el.currentStyle) {
        styleObj = el.currentStyle
        if (styleName.indexOf('-') > 0) {
            var temp = styleName.split('-')
            temp[1].charAt(0).toUpeercase() + substring(1)
            styleName = temp.join('')
        }
        style = styleObj.getAttribute(styleName)
    } else {
        styleObj = window.getComputedStyle(el, null)
        style = styleObj.getPropertyValue(styleName)
    }

    return style
}

module.exports = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    getStyle: getStyle
}