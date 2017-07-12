var http = require('http')
var fs = require('fs')
var path = require('path')
var port = 8999
var contentType = 'text/plain'

http.createServer(function(req, res) {
    var content, statusCode = 200
    var filePath = req.url
    var extname = path.extname(filePath)
    contentType = getContentType(extname)
    try {
        if (contentType) {
            content = fs.readFileSync(filePath.substring(1))
        } else {
            statusCode = 404
            content = 'not found'
            contentType = 'text/plain'
        }
    } catch (error) {
        console.log(error)
    }

    res.writeHead(statusCode, { 'Content-Type': contentType })
    res.end(content, 'uft-8')

}).listen(port)

console.log('\x1b[33m%s\x1b[0m', 'demo run at : http://localhost:' + port + '/dist/demo.html')

function getContentType(extname) {
    if (!extname) { return }
    extname = extname.substring(1)
    var contentType = {
        'html': 'text/html',
        'js': 'text/javascript',
        'css': 'text/css'
    }
    return contentType[extname]
}