$(function(){
	// $("#menu ul li:first").addClass("menuColor");

	// 为什么出错？？？
		// $("#menuHome","#menuAbout","#menuContact").each(function(index){
		// 	$(this).click(function(){
		// 		$(this).addClass("menuColor");
		// 	});
	 //    });

	$("#menu ul li").click(function(){
		index = $("#menu ul li").index(this);
		$("#container").find(".blogPage").hide();
		$("#container").find(".page").hide().eq(index).fadeIn(1000);
		$("#menu").find("ul li").removeClass("menuColor").eq(index).addClass("menuColor");
	}).eq(0).click();

	$(".readMore").click(function(){
		index = $("#homeBlogs .readMore").index(this);
		$("#menu").find("ul li").removeClass("menuColor");
		$("#container").find(".page").hide();
		$("#container").find(".blogPage").eq(index).fadeIn();
		
	});

	(function slider(){
		var imageBox = $("#blog2 .blogImg").find("ul"),
			icoArr = $("#icoBox").find("span"),
			activeID = 0,
			nextID = 0;

		var rotate = function(clickID){
			if (clickID) {
				nextID = clickID-1;
			}else{
				nextID = (activeID <3 ? activeID+1 : 0);
			}
			
			$(icoArr[activeID]).removeClass("active");
            $(icoArr[nextID]).addClass("active");

			imageBox.animate({left: "-" + nextID*720+"px"}, 1000);
			activeID = nextID;
		}
		setIntervalID = setInterval(rotate,4000);

		$(icoArr).click(function(){
			clearInterval(setIntervalID);
            var clickID = parseInt($(this).attr("rel"));
            rotate(clickID);
            setIntervalID = setInterval(rotate,4000);
		})

	})();

	(function(){
		console.log("界面设计参考wix.com。。");
		console.log("因为还没系统的学习后端语言,所以页面不涉及交互。。预计会学习python或者nodejs吧。。=_=");
	})()

})