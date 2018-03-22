var mySwiper=new Swiper('.swiper-container',{
	loop:false,
	direction:'vertical',
	onInit:function(swiper){
		swiperAnimateCache(swiper);//隐藏动画元素
		swiperAnimate(swiper);//初始化完成开始动画
	},
	onSlideChangeEnd:function(swiper){
		swiperAnimate(swiper);//每个slide切换结束时也运行当前slide动画
	}
})
//判断输入是否合法
var input=document.getElementsByClassName("input")[0];
var value=document.getElementsByClassName("value")[0];
var D_value=document.getElementsByClassName("D_value")[0];
var finish_btn=document.getElementsByClassName("finish_btn")[0];
var slide4=document.getElementById("slide4");
finish_btn.onclick=function(){
	value.innerHTML=input.value;
	if(isNaN(input.value)){
		alert("请输入小于40的数字！");
		input.value='';
	}else if(!input.value||input.value>40){
		alert("请输入小于40的数字！");
	}else{
		D_value.innerHTML=42-input.value;
		slide4.className="swiper-slide";
		mySwiper.slideNext();
	}	
}
//点击向下箭头翻页
var arrow=document.getElementsByClassName("arrow");
for(var i=0;i<arrow.length;i++){
	arrow[i].onclick=function(){
		mySwiper.slideNext();
	}
}

//音频在移动端不会自动播放
// JavaScript Document
var bg_music= document.getElementById("bg_music");
// 方法1: 现在微信官方已经推出了微信JS-SDK, 最好还是不要使用"野生"方式, 因为不知道什么时候就可以不能用了!
// http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
// 通过config接口注入权限验证配置后, 在 ready 中 play 一下 audio
function autoPlayAudio1() {
    wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    wx.ready(function() {
        //msg_music.pause();
        bg_music.play();
        //$("#audio_btn").addClass("rotate");
    });
}

// 方法2: "野生"方法, 借用原来老的 WeixinJSBridge
function autoPlayAudio2() {
    window.onload = function() {
        // alert(typeof WeixinJSBridge);
        WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
            // 在这里拿到 e.err_msg, 这里面就包含了所有的网络类型
            // alert(e.err_msg);
            bg_music.play();
        });
    };
}

// 大家或多或少都知道 iOS Safari 不允许自动播放 audio, 可能已经被坑过了,
// 但微信内嵌的浏览器应该是做了一些定制化, 允许自动播放 audio.
// 测试了以下机型在微信内嵌浏览器中仅需设置 audio autoplay 即可自动播放(audio)音乐, 无需特殊处理.
// * iPhone5     iOS 7.0.6 WeChat 6.2
// * iPhone5s    iOS 8.1.2 WeChat 6.3.7
// * iPhone6Plus iOS 8.1.3 WeChat 6.3.7
// * MI1S    Android 4.1.2 WeChat 6.3.7
//
// 但是当手机是 iPhone6s iOS 9.1 WeChat 6.3.7 时, 必须做如下特殊处理才能在微信中自动播放(audio)音乐,
// 我可以推测是 iOS 9 的兼容性问题么?
//
autoPlayAudio1(); // 推荐使用方法1
// autoPlayAudio2(); // 也可以试一试方法2
//音乐暂停播放
var bg_music= document.getElementById("bg_music");
var audio_btn= document.getElementById("audio_btn");
audio_btn.onclick=function(){	
	if(bg_music!==null){
		//检测播放是否已暂停。bg_music.paused 在播放器播放时返回false.
		if(!bg_music.paused){
			audio_btn.className="";
	        bg_music.pause();//暂停
	    }
	    else{
	        audio_btn.className='rotate';
	        bg_music.play();//播放
	    }
	}
	
}