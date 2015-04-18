$(function(){
	$("#toTop").click(function(){
		$("html,body").animate({scrollTop: '0px'}, 1000);
	});

//显示大图片
	$("img.min").click(function(e){
		// var maxClass = $(this).attr("class").slice(0,-4)+".max"
		// var maxWidth = $("."+maxClass).width();
		// console.log(maxWidth);
		// console.log(document.body.clientWidth);
		// console.log($(document).width());
		// console.log($(window).width());
		// console.log($(document).height());
		// console.log($(window).height());

		var maxImage = $(this).attr("class").slice(0,-4)+".max"; 

		var tmpImage = new Image();
		tmpImage.src = $("."+maxImage).attr("src");

		//ie,360为什么不能显示？？
		// if(window.innerHeight){
		// 	var x = (document.body.clientWidth-tmpImage.width)/2;
		// 	var y = (window.innerHeight-tmpImage.height)/2;
		// }else{
		// 	var x = (document.documentElement.clientWidth-tmpImage.width)/2;
		// 	var y = (document.documentElement.clientHeight-tmpImage.height)/2;
		// }
		var x = ($(window).width()-tmpImage.width)/2;
		var y = ($(window).height()-tmpImage.height)/2;

		$("."+maxImage).css({
			"position":"fixed",
			"top"	  :e.clientY,
			"left"    :e.clientX,
			"width"   :"0",
			"height"  :"0",
			"display" :"block",
			"z-index" :"3"})
			.animate({
				width :tmpImage.width,
				height:tmpImage.height,
				top   :y,
				left  :x }, 1000,function(){
					$("#shade").css({
						"position":"fixed",
						"width"   :$(document).width()+"px",
						"height"  :$(document).height()+"px"}).fadeTo('slow',0.5);
				});
	});
//隐藏大图片
	$("img.max").click(function(e){
		$(this).animate({
			"position":"fixed",
			"top"	  :e.clientY,
			"left"    :e.clientX,
			"width"   :"0",
			"height"  :"0",
			"display" :"block",
			"z-index" :"3"},500,function(){
				$(this).css("display","none");
				$("#shade").fadeOut('slow');
		});
	});
	
});