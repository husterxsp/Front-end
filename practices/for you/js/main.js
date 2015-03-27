$(function(){

	$("#audio_btn").click(function(){
		Media = document.getElementById("media");
		if(Media.paused){
			Media.play();
			$("#yinfu").removeClass("off").addClass("rotate");
			$("#audio_btn").addClass("play_yinfu");
		}else{
			Media.pause();
			$("#yinfu").removeClass("rotate").addClass("off");
			$("#audio_btn").removeClass("play_yinfu");
		}
	});

	var currentPage = 1;
	var nextPage = 2;

	$("#arrow_bottom").click(pageSlider);
	// 错误
	// window.addEventListener("onmousewheel",function(event){
	// 	if(event.wheelDelta){
	// 		pageSlider();
	// 	}
	// },false);

		// chrome
        // document.addEventListener("mousewheel",function(event){
        //     if(event.wheelDelta){
        //     	pageSlider();
        // 	}
        // });

		// 没有延时
		// $("html").bind('mousewheel',function(event, delta){
		// 		pageSlider();
		// });

		$("html").bind('mousewheel', function(event, delta) {
		    var $this = $(this),
		        timeoutId = $this.data('timeoutId');
		    if (timeoutId) {
		        clearTimeout(timeoutId);
		    }
		    $this.data('timeoutId', setTimeout(function() {
		        //do something
		        if(delta<0){
		        	pageSlider();
		        }
		        $this.removeData('timeoutId');
		        $this = null
		    }, 100));
		    return false;
		});
	function pageSlider(){
		if($(".page"+currentPage).hasClass("next")){
			$(".page"+currentPage).removeClass("next");
		}
		$(".page"+currentPage).addClass("current");
		$(".page"+nextPage).addClass("next");

		$(".page"+currentPage).find("p").animate({left:"-50%"},1000);
		$(".page"+currentPage).animate({top:'-486px'},1000,function(){
			$(".page"+currentPage).find("p").animate({left:"50%"},1000);
			$(this).removeClass("current").css("top","0");

		});

		currentPage = nextPage;
		nextPage++;
		if(nextPage>3){
			nextPage = 1;
		}
	}

	(function(){
		console.log("界面设计参考eqxiu.com。。");
	})();

});