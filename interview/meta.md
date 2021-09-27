# meta
* meta标签可分为两大片段：http-equiv和name变量。
* http-equiv，相当于http的头文件功能，可以设置：`content-type`,`expires`,`cache-control`
* name用于描述网页, seo相关
* description, keywords, charset
* `<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover">`
* 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏`<meta name="apple-mobile-web-app-capable" content="yes"/>`
  - 参考：[移动端的头部标签和 meta](https://segmentfault.com/a/1190000002532413)

## 设备像素 / 物理像素
* 是指屏幕的【实际物理像素点】，比如 iPhone6 Plus 是 `1920*1080` 的像素分辨率，那么代表它纵向有 1920 个物理像素点。

## CSS 像素（css pixel） / 密度独立像素（density independent pixels - dip）
* CSS 像素是 web 编程中的概念，是抽象的，不是实际存在的。它是独立于设备用于逻辑上衡量像素的单位，所以又叫密度独立像素。

## 屏幕像素密度
* 指屏幕上每英寸可以显示的物理像素点的数量。

## 设备像素比
* 指物理像素和密度独立像素的比值。window.devicePixelRatio = 物理像素 / dip

## viewport
* device-width 是指这个设备最理想的 viewport 宽度。iPhone6 之前的 device-width 都是 320px ，iPhone6 是 375px ，iphone 8: 750。
* device-width 是和 CSS像素（也叫密度独立像素 dip）是相同的。也就是说，web 页面中的 CSS像素的值等于 device-width 时，对应到手机上就是占满全屏的宽度。
* initial-scale=1.0 是指初始化的时候缩放大小是1，也就是不缩放。
* user-scalable=0 是指禁止用户进行缩放。

# dns prefetch
* DNS Prefetch 是一种DNS 预解析技术，当你浏览网页时，浏览器会在加载网页时对网页中的域名进行解析缓存，这样在你单击当前网页中的连接时就无需进行DNS的解析，减少用户等待时间，提高用户体验。
* `<link rel="dns-prefetch" href="http://www.spreadfirefox.com/">`
* a标签的默认启动在HTTPS不起作用。需要如下设置开启: `<meta http-equiv="x-dns-prefetch-control" content="on">`
