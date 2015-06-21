window.onload = function(){

	var requestAnimationFrame = window.requestAnimationFrame || 
								window.mozRequestAnimationFrame || 
								window.webkitRequestAnimationFrame || 
								window.msRequestAnimationFrame;
	// 返回顶部功能
	(function(){
		function toTop(){
			if(document.body.scrollTop){
				document.body.scrollTop -= 50;
				if(document.body.scrollTop > 0){
					requestAnimationFrame(toTop);
				}
			}
			else{
				document.documentElement.scrollTop -= 50;
				if(document.documentElement.scrollTop > 0){
					requestAnimationFrame(toTop);
				}
			}
		}
		document.getElementById("toTop").onclick = function(){
			requestAnimationFrame(toTop);
		}
	}())

	//显示大图片
	var imgMinArr = document.querySelectorAll("img.min");
	for(var item in imgMinArr){
		(function(){
			//for循环绑定点击事件
			imgMinArr[item].onclick = function(e){
				// 获取大图的src,并通过新建临时image对象来获取图片尺寸
				var maxImage = this.getAttribute("class").slice(0,-4)+".max";
				var tmpImage = new Image();
				tmpImage.src = document.querySelector("."+maxImage).getAttribute("src");

				//为使得大图在屏幕中居中显示
				var x = (document.documentElement.clientWidth-tmpImage.width)/2;
				var y = (document.documentElement.clientHeight-tmpImage.height)/2;

				document.querySelector("."+maxImage).style
										.cssText += "position:fixed;width:0;height:0;display:block;z-index:3";

				document.querySelector("."+maxImage).style.top = e.clientY+"px";
				document.querySelector("."+maxImage).style.left = e.clientX+"px";

				var progress = 0;
				function enlarge(){
					progress += 0.025;
					document.querySelector("."+maxImage).style.width = progress*tmpImage.width+"px";
					document.querySelector("."+maxImage).style.height = progress*tmpImage.height+"px";
					document.querySelector("."+maxImage).style.top = e.clientY-progress*(e.clientY-y)+"px";
					document.querySelector("."+maxImage).style.left = e.clientX-progress*(e.clientX-x)+"px";

					if(parseFloat(progress).toFixed(2)<1){
						requestAnimationFrame(enlarge);
					}else{
						//相当于enlarge()执行完之后的回调，显示灰色背景
						document.getElementById("shade").style.display = "block";
						document.getElementById("shade").style.width = document.body.scrollWidth+"px";
						document.getElementById("shade").style.height = document.body.scrollHeight+"px";
						progress = 0;
						function fadeIn(){
							progress += 0.02;
							document.getElementById("shade").style.opacity = Number(progress);
							if(progress<0.5){
								requestAnimationFrame(fadeIn);
							}
						}
						requestAnimationFrame(fadeIn);
					}
				}
				requestAnimationFrame(enlarge);
			}
		}())
	}

	//图片缩小
	var imgMaxArr = document.querySelectorAll("img.max");
	for(var item in imgMaxArr){
		(function(item){
			//for循环绑定点击事件
			imgMaxArr[item].onclick = function(e){
				var progress = 0;
				var top = parseFloat(imgMaxArr[item].style.top);
				var left = parseFloat(imgMaxArr[item].style.left);
				var width = parseFloat(imgMaxArr[item].style.width);
				var height = parseFloat(imgMaxArr[item].style.height);

				function shrink(){
					progress += 0.025;
					// 用toFixed将progress截取三位小数位，从而避免浮点数运算时产生的舍入误差的影响。
					imgMaxArr[item].style.width = (1-parseFloat(progress).toFixed(3))*width+"px";
					imgMaxArr[item].style.height = (1-parseFloat(progress).toFixed(3))*height+"px";
					imgMaxArr[item].style.top = top+(e.clientY-top)*progress+"px";
					imgMaxArr[item].style.left = left+(e.clientX-left)*progress+"px";

					if(parseFloat(progress).toFixed(3)<=1){
						requestAnimationFrame(shrink);
					}else{
						//相当于shrink()执行完之后的回调，撤去灰色背景
						progress = 0.5;
						function fadeOut(){
							progress -= 0.02;
							document.getElementById("shade").style.opacity = Number(progress);
							if(progress>=0){
								requestAnimationFrame(fadeOut);
							}else{
								document.getElementById("shade").style.display = "none";
							}
						}
						requestAnimationFrame(fadeOut);
					}
				}
				requestAnimationFrame(shrink);
			}
		}(item))
	}

	(function(){
		console.log("界面设计参考：https://www.behance.net/gallery/24416019/Selfpromotion-FREE_CV");
	}())
}