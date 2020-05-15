# js

## encodeURI, encodeURIComponent
* escape unescape 已经废弃，应当避免使用。
* escape可以达到类似URL Encode的效果，但是它对于非ASCII字符使用了一种非标准的的实现，例如汉字“编码”会被escape成%u7F16%u7801这种%uxxxx奇怪的表示，
* encodeURI和encodeURIComponent的区别在于前者被设计来用于对完整URL进行URL Encode，于是URL中的功能字符，比如&, ?, /, =等等这些并不会被转义；而后者被设计来对一个URL中的值进行转义，会把这些功能字符也进行转义。应用场景最常见的一个是手工拼URL的时候，对每对KV用encodeURIComponent进行转义。
