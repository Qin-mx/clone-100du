$(function(){
/**
 * 切换搜索栏
 * 
 */
	(function(){
		var aLi = $('.menu li');
		var Intext = $('#search').find('.form .text');
		// 定义数组
		var arrList = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		// 定义初始值
		var inNum = 0;

		// 设置input的值
		Intext.val(arrList[inNum]);	
		// 点击事件
		$.each(aLi,function(i){
			$(this).click(function(){
				// 全部变为默认
				aLi.attr('class','gradient');
				// 当前的添加active
				$(this).attr('class','active');

				// 获取当前的index值
				inNum = i;
				// 设置当前input的值
				Intext.val(arrList[inNum]);
			})
		})

		// 获取焦点
		Intext.focus(function(){
			// 如果值等于默认  则清空
			if(Intext.val() == arrList[inNum]){
				Intext.val('');
			}
		})
		// 失去焦点
		Intext.blur(function(){
			// console.log(Intext.val())
			//如果失去焦点，则不请空
			if(Intext.val() !== ''){
				return
			} else{
				Intext.val(arrList[inNum])
			}
		})
	})();

/**
 * 文字滚动
 */
	 (function(){
	 	var wrap = $('.update');
		var ulBox = wrap.find('ul');
		var oBtnUp = $('#updateUpBtn');
		var oBtnDown = $('#updateDownBtn');
		// 定义数据
		var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间'},
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯'},
			{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦'},
			{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间'},
			{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间'},
			{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯'},
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦'},
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间'}
		];

		// 拼接字符串
		var str = '';

		for(var i = 0;i<arrData.length ;i++){
			str+='<li><a href="javascript:void(0)"> <strong>'+arrData[i].name+'</strong> <span>'+arrData[i].time+'分钟前</span> '+arrData[i].title+'</a></li>'
		}
		// 放入ul中
		ulBox.append(str);

		// 获取每个li的高度，然后动画
		var lH = ulBox.find('li').height();
		// var 定义初始值
		var inNum = 0;
		//定义动画
		var timer;

		function Move( num ){
			// 判断inNum的值
			inNum += num;
			if(Math.abs(inNum) > arrData.length){
				inNum = 0;
				ulBox.css('top',lH*inNum);
			}
			// 让值始终为负
			if(inNum > 0){
				inNum = -(arrData.length-1);
				ulBox.css('top',lH*inNum);
			}
			ulBox.stop().animate({'top':lH*inNum},1000);
		};
		// 自动播放
		function autoPlay(){
			timer = setInterval(function(){
				Move(-1);
			},2000)
		}
		autoPlay();

		// 点击事件
		oBtnUp.click(function (){
			Move(-1);
		});
		oBtnDown.click(function (){
			Move(1);
		});

		// 移入清除事件
		wrap.hover(function(){
			clearInterval(timer);
		},autoPlay);

	 })();
	 /**
	  *选项卡
	  */
	(function(){
	 	function fnTab( nav , con, sEvent){
	 		var aLi = nav.children();
	 		
	 		// 设置显示隐藏
	 		con.hide().eq(0).show();

	 		// 点击事件
	 		aLi.each(function(i){
	 			$(this).on(sEvent,function(){
	 				// 恢复默认样式
	 				aLi.removeClass('active').addClass('gradient');
	 				aLi.find('a').attr('class','triangle-down-gray');
	 				// 当前的添加active
	 				$(this).addClass('active');
	 				$(this).find('a').attr('class','triangle-down-red');

	 				//让当前点击的显示
	 				con.hide().eq(i).fadeIn(10);	
	 			})
	 		})
	 	} 
	 	fnTab($('.tabNav1'),$('.tabCon1'),'click');
	 	fnTab($('.tabNav2'),$('.tabCon2'),'click');
	 	fnTab($('.tabNav3'),$('.tabCon3'),'mouseover');
	 	fnTab($('.tabNav4'),$('.tabCon4'),'mouseover');
	 })();
	 /**
	  * 图片切换
	  */
	(function(){
		var pic = $('.pic');
		var ulBox = pic.find('ul');
		var olBox = pic.find('ol');
		var pBox = pic.find('p');
		var aLiU = ulBox.children();
		var aLiO = olBox.children();

		// console.log(pic,ulBox,olBox,aLiU,aliO)
		// 定义p标签显示内容
		var arrData = [
					'爸爸去哪儿啦~',
					'人像摄影中的光影感',
					'娇柔妩媚、美艳大方'
					];
		// 定义动画
		var timer;
		// 定义当前下表
		var inNum = 0;
		// 设置p的默认
		pBox.html(arrData[inNum]);
		aLiU.eq(inNum).fadeIn().css('zIndex',2).addClass('active');
		// 点击事件
		aLiO.click(function(){
			inNum = $(this).index();
			fade(inNum);
		})
		//设置图片动画
		function fade( inNum ){
			pBox.html(arrData[inNum]);
			// console.log(inNum)
			aLiU.hide().css('zIndex',1).removeClass('active');
			aLiU.eq(inNum).fadeIn().css('zIndex',2).addClass('active');

			aLiO.removeClass('active');
			aLiO.eq(inNum).addClass('active');
		}
		//自动播放
		function autoPlay(){
			timer = setInterval(function(){
				inNum ++ ;
				if( inNum > aLiU.length-1 ){
					inNum = 0;
				}
				fade(inNum);
			},2000);
		};
		autoPlay();
		// 移入移除清楚动画
		pic.hover(function(){
			clearInterval(timer);
		},autoPlay)
	})();
	/**
	 * 设置bbs
	 */
	 (function(){
	 	var bbsLi = $('.bbs ol li');
	 	bbsLi.mouseover(function(){
	 		bbsLi.removeClass('active');
	 		$(this).addClass('active');
	 	})
	 })();
	 	
	 /**
	  * 日历提示
	  */
	 (function(){
	 	var calendar = $('.calendar');
	 	var cSpan = $('.calendar h3 span');
	 	var aLiO = calendar.find('ol li');
	 	var Img = $('.calendar .img');
	 	var toImg = $('.today-info img');
	 	var toStr = $('.today-info .text h4 strong');
	 	var toText = $('.today-info .text p');

	 	// 事件
	 	Img.hover(function(){
	 		// 获取定位的位置
	 		var top = $(this).parent().position().top-30;
	 		var left = $(this).parent().position().left+50;
	 		var index = $(this).parent().index()%cSpan.length;
	 		// console.log(top,left)
	 		// 设置div的位置
	 		$('.today-info').show().css({'top':top,'left':left});
	 		//设置图片
	 		toImg.attr('src',$(this).attr('src'));
	 		//设置strong
	 		toStr.text(cSpan.eq(index).text());
	 		// 设置文字
	 		toText.text($(this).data('info'))

	 	},function(){
	 		$('.today-info').hide();
	 	})



	 })();

	 /**
	  * hot设置
	  */
	(function(){
	 	var hotBox = $('.hot-area');
	 	var aLi = hotBox.find('li');

	 	// 定义数据
	 	var arrData = [
	 		{name:'',region:'',pop:''},
	 		{name:'用户1',region:'朝阳',pop:'187'},
	 		{name:'性感宝贝',region:'朝阳CBD',pop:'4933387'},
	 		{name:'用户3',region:'朝阳',pop:'187'},
	 		{name:'用户4',region:'朝阳',pop:'1987'},
	 		{name:'用户5',region:'朝阳',pop:'1987'},
	 		{name:'用户6',region:'朝阳',pop:'1987'},
	 		{name:'用户7',region:'朝阳',pop:'1987'},
	 		{name:'用户8',region:'朝阳',pop:'1287'},
	 		{name:'用户9',region:'朝阳',pop:'1287'},
	 		{name:'用户10',region:'朝阳',pop:'1287'}
	 	];

	 	aLi.mouseover(function(){
	 		if($(this).index() == 0){
	 			return;
	 		}
	 		var i = $(this).index();
	 		hotBox.find('p').remove();
	 		// 定义p标签显示内容
	 		var str = '<p><span>用户名：<em>'+arrData[i].name+'</em></span><span>区域：<em>'+arrData[i].region+'</em></span><span>人气：<em>'+arrData[i].pop+'</em></span></p>';
	 		$(this).append(str)
	 	})
	 })();
	 
})