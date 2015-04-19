#前端组任务分享
####任务：仿照 [https://www.behance.net/gallery/24416019/Selfpromotion-FREE_CV](https://www.behance.net/gallery/24416019/Selfpromotion-FREE_CV "简历模板") 写一个自己的简历页面

<h4 style="text-indent: 2em;">1. 首先看到这个页面时，，就觉着这个页面的布局怎么感觉有点乱啊。。。完全都不知道div该怎么放好了。。。看了好久然后还是把整个页面切成了几个大的部分。。然后一些小的东西都是用position+left+top...一点点调整到合适的位置的。。

----------

<h4 style="text-indent: 2em;">2. 然后为了获取图中的一些图片，装上了photoshop ，从那个页面抠图，抠得的图片边缘处理不是很好。

----------

<h4 style="text-indent: 2em;">3.页面的下方有一个图片倾斜放置的，在网上搜 CSS的3D倾斜效果，找到了张鑫旭的很好的一篇博文 [CSS3 3D transform变换](http://www.zhangxinxu.com/wordpress/?p=2592)，就看了这篇文章，再一点点调整自己图片的方向。

----------

<h4 style="text-indent: 2em;">4.接下来是图片的点击放大效果，一开始在网上也是找到了张鑫旭的另一篇博文 [jQuery-单击文字或图片内容放大显示效果](http://www.zhangxinxu.com/wordpress/?p=80) ，效果挺好的，下了源代码，可是看着他的js的代码写的好多啊，，，然后想着干脆自己实现好了，然后就两个动画就搞定了。。。<br />
一开始参考上面的文章我是这样写的：
<br />
![](http://i.imgur.com/gRFYci8.png)
<br />
<h4 style="text-indent: 2em;">将a标签的href和要放大的图片的id设为相同。。可是这样的话，动画的时候就会出现点击a标签的时候页面先跳转到a标签的href位置然后再动画，，，所以很乱。。而且这样写好像还不怎么方便设置放大的图片的大小。。。<br />
然后，就干脆直接用img:
<br />
![](http://i.imgur.com/IY5Ob1i.png)
<br />
<h4 style="text-indent: 2em;">代码简洁了许多，而且之后直接获取将要放大的图片的原始大小，会方便很多
<h4 style="text-indent: 2em;">然后为了获取图片大小：
<br />
![](http://i.imgur.com/zoBqUYq.png)
<br />
<h4 style="text-indent: 2em;">一开始这样直接获取，可是获取的width完全不知道是什么东西？？？
<br />
问题解决，原因如下：<br />
$("."+maxClass)是jQuery对象，如果想这样获取宽度，应该这样写$("."+maxClass).width()。或者转化为dom对象：$("."+maxClass)[0].width或者$("."+maxClass).get(0).width。下面新建的Image是一个dom对象。注意区分jQuery对象和dom对象就是了。
<br />
在网上查了，说是要这样：
<br />
![](http://i.imgur.com/bEOUgRR.png)
<br />
<h4 style="text-indent: 2em;">也就是新建一个临时的Image对象，用这个来获取原图的宽和高
<br />
<h4 style="text-indent: 2em;">然后是图片的在屏幕居中显示的问题：
一开始我用到window.innerHeight和window.innerWidth,但是，window.innerWidth包括了滚动条的宽度，所以会影响到图片的居中效果，然后改用document.body.clientWidth，实现了图片的完美居中~ 但是这个好像有兼容性的问题。。IE和360为什么没起作用。。。？？？

<h4 style="text-indent: 2em;">问题解决，原因如下：
<br >
![](http://i.imgur.com/cJGjxkd.png)
![](http://i.imgur.com/u8z4984.png)
因为浏览器限制了脚本的运行，解决办法：工具->Internet选项->高级->在设置里选择 允许活动内容在我的电脑显示

----------
<h4 style="text-indent: 2em;">5.最后是一个关于icon的问题：<br />
开始ul列表里我是用list-style-image将小图标一个个加进去的，后来想到有雪碧图，就用了一下，
在网上看到有用 i 标签来加载小图标icon。。。附上一个 在线生成雪碧图的网址[http://spritepad.wearekiss.com/](http://spritepad.wearekiss.com/)

----------

<h4 style="text-indent: 2em;">6.写完以上之后我又发现。。动态获取图片高度和宽度是可以直接用image.width()和image.height()的而不是image.width...还有那个获取屏幕宽度与高度除了以上原生js的方法,也可以用jquery写法如下：$(window).width()，或者$(document).width(),另外$(window).height()获取的是当前屏幕的高度，而$(documen).height()获取的是整个文档的高度。

----------

<h4 style="text-indent: 2em;">7.然后又发现图片放大的效果还是使用新建一个image对象的方法比较好，也就是每次都通过新建image对象再通过src获取原图的大小，如果直接使用image.width(),虽然第一次可以放大，但是，经过图片再缩小后，image.width()就变成了0，，就不能再接着动画了。。

----------










