var dom = require('./dom')
var addClass = dom.addClass
var removeClass = dom.removeClass
var getStyle = dom.getStyle
var hasClass = dom.hasClass

/**
 * 
 * @param {Object} 
 * {
 *    container : contianerELe, 
 *    list : listEles, 
 *    dots : dotsEles 
 * } 
 */
function Slider(params) {
    var container = document.getElementsByClassName(params.list)[0]
    var list = container.children
    var dots = document.getElementsByClassName(params.dots)[0].children

    this.container = container
    this.list = list
    this.dots = dots

    this.timer
    this.animateTimer
    this.interval = 1000
    this.time = 400
    this.speed = 0
    this.animateInterval = 30
    this.currentIndex = 0
    this.dotActiveSign = 'active'

    this.loop = true
    this.offset = 0
    this.dotClick = false
}

Slider.prototype.init = function() {
    this.setStyle()
    this.speed = this.width / (this.time / this.animateInterval)

    this.loopPlay()
    this.dotPlay()
}

Slider.prototype.loopPlay = function() {
    var self = this
    if (self.loop) {
        self.timer = setTimeout(function() {
            self.offset = parseInt(getStyle(self.container, 'left').replace('px', '')) + -1 * self.width
            self.once()
        }, self.interval);
    }
}

Slider.prototype.setStyle = function() {
    this.width = parseInt(getStyle(this.list[0], 'width').replace('px', ''))
    this.len = this.list.length
    this.container.style.width = this.width * (this.len + 1) + 'px'

    var copyLast = this.list[0].cloneNode(true)
    this.container.appendChild(copyLast)
}



Slider.prototype.once = function() {
    var self = this
    if (!self.width || !self.speed) { return }

    var endX = self.offset

    function move() {
        var currentLeft = parseInt(getStyle(self.container, 'left').replace('px', ''))

        if (currentLeft > endX) {
            var moveX = currentLeft + -1 * self.speed
            self.container.style.left = (moveX <= endX ? endX : moveX) + 'px'
            animateTimer = setTimeout(function() {
                move()
            }, self.animateInterval);
        } else {
            clearTimeout(self.animateTimer)
            self.animateTimer = null
            self.container.style.left = endX + 'px'
            if (self.currentIndex + 1 >= self.len && !self.dotClick) {
                self.currentIndex = 0
                self.container.style.left = 0
            } else {
                self.currentIndex = self.dotClick ? self.currentIndex : self.currentIndex + 1
                self.dotClick = false
            }
            self.offset = parseInt(getStyle(self.container, 'left').replace('px', '')) + -1 * self.width

            self.toggleDot()
            if (self.loop) {
                self.loopPlay()
            }
        }
    }
    move()
}

Slider.prototype.clearInterval = function() {
    clearInterval(this.timer)
    this.timer = null
}

Slider.prototype.dotPlay = function(params) {
    var self = this

    for (var i = 0; i < this.len; i++) {
        self.dots[i].addEventListener('click', function() {

            self.dotClick = true
            var target = this
            if (self.animateTimer) {
                return
            }
            if (hasClass(target, this.dotActiveSign)) {
                return
            }
            self.clearInterval()
            var targetIndex = parseInt(target.getAttribute('index'))
            self.offset = -1 * self.width * (targetIndex - self.currentIndex - 1) + parseInt(getStyle(self.container, 'left').replace('px', ''))
            self.once()
            self.currentIndex = targetIndex !== 0 ? targetIndex - 1 : targetIndex
        })

    }
}

Slider.prototype.toggleDot = function() {
    var self = this
    for (var i = 0; i < this.len; i++) {
        var dot = self.dots[i];
        if (hasClass(dot, self.dotActiveSign)) {
            removeClass(dot, self.dotActiveSign)
        }
    }
    addClass(self.dots[self.currentIndex], self.dotActiveSign)
}

module.exports = Slider