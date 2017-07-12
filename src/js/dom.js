function toggleClass(el, className) {
    if (hasClass(el, className)) {
        var reg = new RegExp(className, 'g')
        el.className = el.className.replace(reg, '')
    } else {
        var classes = el.className.split(' ')
        classes.push(className)
        el.className = classes.join(' ')
    }
}

function hasClass(el, className) {
    return el.className.indexOf(className) === -1
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
    toggleClass: toggleClass,
    hasClass: hasClass,
    getStyle: getStyle
}