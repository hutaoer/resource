# http状态码
* 404页面不存在，500服务器错误，301重定向，302临时重定向，200ok，401未授权啥的。
* 301和302有什么区别？分别适用于什么场景？你还会只去记一个是永久重定向，一个是临时重定向吗？

## 301 vs 302
### 301：
* 永久重定向；搜索引擎在抓取新的内容的同时也将旧的网址替换为了重定向之后的网址。资源永久移动到新的位置，并且这个响应默认情况下会被缓存，只有在第一次的时候，才会去真正的发起第一个请求，后面的都会被缓存起来，直接跳转到 redirect 的请求
* 常用的例如域名跳转：http:**** => https:****
* 场景：之前的网站永久移除。不会降低搜索排名。更换域名。

### 302：
* 临时重定向；搜索引擎会抓取新的内容而保留旧的地址，因为服务器返回302，所以，搜索搜索引擎认为新的网址是暂时的。临时跳转请求，默认情况下不会缓存。
* 需要向服务端请求是否过期，过期返回新数据，没过期返回状态吗302，然后客户端重定向，期间差别主要在于数据包的大小（没有过期的情况下，不需要再在数据包中附加数据返回，从而加速网络传输，提升速度）
* 旧的地址还存在，重定向知识临时从旧地址跳转到新的地址，搜索引擎会抓取新的内容而保存旧的地址。场景，做大促的时候，首页临时跳转到某个会场页面。