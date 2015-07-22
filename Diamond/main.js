Object.prototype.myAnimate = function(attribute, duration, timing, callback){
    /*
     * t: current time（当前时间）
     * b: beginning value（初始值）
     * c: change in value（变化量）
     * d: duration（持续时间）
    */
    var Tween = {
        Linear: function(t, b, c, d) { return c*t/d + b; },
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
            return c / 2*((t -= 2) * t * t + 2) + b;
        }
    }
    var that = this;
    var timing = timing || "Linear";
    var tweenFunc = Tween[timing];
    var callback = callback || new Function();
    for(var attr in attribute){
        if(!attribute.hasOwnProperty(attr)){
            continue;
        }
        var attrStyle = window.getComputedStyle(that)[attr];
        var b = parseFloat(attrStyle);
        var c = parseFloat(attribute[attr]) - b;
        var d = duration; 
        var t = 0;
        var flag = 0;
        //进度条
        if(/sliderImg/.exec(this.className)){
            var progress = document.getElementById("progress");
        }
        (function(attr,b,c,d,t){
            var unit;       //单位
            if(/[\d\.]+(\w+)/.exec(attrStyle)){
                unit = /[\d\.]+(\w+)/.exec(attrStyle)[1];
            }else {
                unit = "";
            }
            var Run = function(){
                that.style[attr] = tweenFunc(t,b,c,d) +unit;
                if( t<d ){ 
                    t += 10; 
                    setTimeout(Run, 10);
                }else {
                    if(!flag){
                        callback();
                        flag = 1;
                    }
                }
                if(progress){
                    progress.style.width = (t/d)*100 +"%";
                }
            }
            Run();  
        }(attr,b,c,d,t))
    }
};

Object.prototype.countUp = function(start, end, duration){
    var easeOutExpo = function(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    };
    var duration = duration* 1000 || 2000;
    var that = this;
    var unit = "";      //单位
    if(/\d+(\+)/.exec(end)){
        unit = /\d+(\+)/.exec(end)[1];
    }
    var end = parseInt(end);
    var startTime = +(new Date());
    var count = function() {
        var nowTime = +(new Date());
        var progress = nowTime - startTime;
        that.innerHTML = parseInt(easeOutExpo(progress, start, end - start, duration)) + unit;
        if (progress < duration) {
           requestAnimationFrame(count);
        } 
    };
    if(!this.hasIncrease){
        requestAnimationFrame(count);
        this.hasIncrease = true;
    }
};

//图片淡入淡出
(function(){
    var sliderImg = document.querySelectorAll(".sliderImg");
    var icoArr = document.querySelectorAll("#icoBox1 span");
    var pre = document.getElementById("pre");
    var next = document.getElementById("next");

    var activeID = 0;
    var nextID = 0;

    function slider(clickID){
        if (clickID) {
            nextID = clickID-1;
        }else{
            nextID = (activeID+1)%3;
        }
        icoArr[activeID].className = "";
        icoArr[nextID].className = "active";
        sliderImg[nextID].style.zIndex = 1;
        sliderImg[activeID].myAnimate({opacity: 0}, 3000, "easeOut", call);
        function call(){
            sliderImg[activeID].style.zIndex = 0;
            sliderImg[activeID].style.opacity = 1;
            sliderImg[nextID].style.zIndex = 2;
            activeID = nextID;
            clear();
            switch (activeID) {
                case 0:
                    slide1();
                    break;
                case 1:
                    slide2();
                    break;
                case 2:
                    slide3();
                    break;
                default:
                    break;
            }

        }
    }
    slide1();
    imgIntervalID = setInterval(slider,9000);
    var clickID;
    for(var ico in icoArr){
        (function(){
            icoArr[ico].onclick = function(){
                clearInterval(imgIntervalID);
                clickID = parseInt(this.getAttribute("rel"));
                slider(clickID);
                imgIntervalID = setInterval(slider,9000);
            }
        }())
    }
    document.getElementById("pre").onclick = function(){
        var icoNum = document.querySelector("#icoBox1 span.active").getAttribute("rel")-1;
        icoNum == 0 ? icoNum += 2 : icoNum--;
        document.querySelectorAll("#icoBox1 span")[icoNum].click();
    };
    document.getElementById("next").onclick = function(){
        var icoNum = document.querySelector("#icoBox1 span.active").getAttribute("rel")-1;
        icoNum == 2 ? icoNum = 0 : icoNum++;
        document.querySelectorAll("#icoBox1 span")[icoNum].click();

    };
    function slide1(){
        var slideArr = document.querySelectorAll(".slide-1 img");
        for(var i=0;i<slideArr.length;i++){
            slideArr[i].style.opacity = 1;
        }
        var t1 = document.querySelector(".slide-1.t1");
        var t2 = document.querySelector(".slide-1.t2");
        var t3 = document.querySelector(".slide-1.t3");
        t1.style.opacity = 1;
        t1.style.top = "35%";
        t2.style.opacity = 1;
        if(window.innerWidth<940){
            t2.style.left = 0;
        }else {
            t2.style.left = "16%";
        }
        t3.style.opacity = 1;
        t3.style.top = "75%";
    }
    function slide2(){
        var slideArr = document.querySelectorAll(".slide-2 img");
        slideArr[0].style.top = "70%"; 
        slideArr[1].style.top = "70%"; 
        slideArr[2].style.top = "50%"; 
        slideArr[3].style.top = "40%"; 
        slideArr[4].style.top = "40%"; 
        slideArr[5].style.top = "40%";
        var t1 = document.querySelector(".slide-2.t1");
        var t2 = document.querySelector(".slide-2.t2");
        t1.style.opacity = 1;
        t1.style.top = "17%";
        t2.style.opacity = 1;
        t2.style.left = "0";
    }
    function slide3(){
        var slideArr = document.querySelectorAll(".slide-3 img");
        slideArr[0].style.bottom = 0;
        for(var i=1;i<6;i++){
            slideArr[i].style.opacity = 1;
        }
        var t1 = document.querySelector(".slide-3.t1");
        var t2 = document.querySelector(".slide-3.t2");
        var t3 = document.querySelector(".slide-3.t3");
        var t4 = document.querySelector(".slide-3.t4");
        var t5 = document.querySelector(".slide-3.t5");
        var t6 = document.querySelector(".slide-3.t6");
        t1.style.opacity = 1;
        t1.style.top = "35%";
        t2.style.opacity = 1;
        t2.style.top = "43%";
        t3.style.opacity = 1;
        t3.style.top = "51%";
        t4.style.opacity = 1;
        t4.style.top = "59%";
        t5.style.opacity = 1;
        t5.style.top = "67%";
        t6.style.opacity = 1;
        t6.style.top = "78%";
    }
    function clear(){
        var slideArr = document.querySelectorAll(".sliderImg img");
        for(var i=0;i<slideArr.length;i++){
            slideArr[i].style.cssText = "";
        }
        var textArr = document.querySelectorAll(".sliderImg .text");
        for(var i=0;i<textArr.length;i++){
            textArr[i].style.cssText = "";
        }
    }
}());

//滑动轮播
(function(){
    var smallSlider = document.querySelector("#smallSlider ul");
    var ulWidth = parseFloat(window.getComputedStyle(smallSlider).width);
    var icoArr = document.querySelectorAll("#icoBox2 span");

    var activeID = 0;
    var nextID = 0;

    var slider = function(clickID){
        if (clickID) {
            nextID = clickID-1;
        }else{
            nextID = (activeID+1)%3;
        }
        icoArr[activeID].className = "";
        icoArr[nextID].className = "active";

        smallSlider.myAnimate({left: "-" + parseFloat(0.33*nextID*ulWidth)}, 1000);
        activeID = nextID;
    }
    sliderIntervalID = setInterval(slider,3000);
    for(var ico in icoArr){
        (function(){
            icoArr[ico].onclick = function(){
                clearInterval(sliderIntervalID);
                var clickID = parseInt(this.getAttribute("rel"));
                slider(clickID);
            }
        }())
    }
}());

window.onscroll = function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//菜单栏固定
    var menuBar = document.getElementById("menuBar");
    if(scrollTop <= menuBar.offsetTop){
        document.getElementById("headerTop").style.marginBottom = "";
        menuBar.className = '';
    }else{
        document.getElementById("headerTop").style.marginBottom = "93px";
        menuBar.className = 'fixed';
    }

//数字增加效果
    var numList = document.querySelectorAll(".numValue");
    for(var i in numList){
        if(numList[i].offsetTop-scrollTop < window.innerHeight){
            var dataValue = numList[i].getAttribute("data-value");
            numList[i].countUp(0,dataValue,5);
        }
    }
}

//响应式菜单
document.getElementById("menuIcon").onclick = function(){
    var menu = document.querySelector("#menu ul");
    if(menu.style.height != "260px"){
        menu.myAnimate({height: 260}, 300);
    }else {
        menu.myAnimate({height: 0}, 300);
    }
}