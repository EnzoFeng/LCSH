function addHistogram(result){
	$('#histogram_echarts').children().remove();
	for(var i=0;i<result.length;i++){
		var current=result[i];
		var title=current.name;
		var content=current.list;
		var moban=$('#left_echart').clone();
		moban.find('.echart_left_nav_text').text(title);
		$('#histogram_echarts').append(moban.html());
		histogramData($('#histogram_echarts').find('.histogram_content').get(i),title,content);
	}	
}

function histogramData(dom,title,content){
	 var mychart = echarts.init(dom);
	 var xContent=[];
	 var yValue=[];
	 for(var i=0;i<content.length;i++){
			if(content[i].name==null||typeof(content[i].name)=='undefined'){
				popMessage('数据异常');
				return false;
			} 
			if(content[i].userNum==null||typeof(content[i].userNum)=='undefined'){
				popMessage('数据异常');
				return false;
			} 
			xContent.push(content[i].name);
			yValue.push(content[i].userNum);
		 }
		    var option = {
		        tooltip: {
		            show: true
		        },
		        color:['#7cb6ec'],
		        legend: {
		        },
		        xAxis : [
		            {
		                type : 'category',
		                data : xContent
		            }
		        ],
		        yAxis : [
		            {
		                type : 'value'
		            }
		        ],
		        series : [
		            {
		                "name":title,
		                "type":"bar",
		                "barWidth":'30%',
		                "data":yValue
		            }
		        ]
		    };
		    mychart.setOption(option);
}

function popMessage(message){
    $.confirm({
        title: '提示信息',
        closeIcon: true,
        boxWidth: '30%',
        useBootstrap: false,
        type: 'red',
        typeAnimated: true,
        content: message,
        buttons: {
            somethingElse: {
                text: '确定',
                btnClass: 'btn-blue',
                keys: ['enter']
            }
        }
    });
}

$(document).ready(function() {
	
	  var clientHeight = window.screen.height-50;
	  var objectObj =  $(".con_gr");
	  objectObj.css("height", clientHeight+'px');
	  
	  
	  var init=$('.secondGr .second_img[value="'+current_id+'"]');
      init.parents('.zi').attr('style','display:block;');
      $('.usergroupportrait_content').children('.usergroupportrait_choose').remove();
      $('#ugType').attr('value',init.parents('.left_gr').find('.firstGr span').attr('value'));
        init.parents('.secondGr').next().find('span').each(function(){
        	 var choose_div=$('<div class="usergroupportrait_choose"></div>');
        	 var span_div=$(' <span class="usergroupportrait_text"></span>');
        	 span_div.text($(this).text()).attr('value',$(this).attr('value'));
        	 choose_div.append(span_div);
        	 $('.usergroupportrait_content .sergroupportrait_addbtn').before(choose_div);
        });
	
	 //隐藏标签选择
    $(".usergroupportrait_inner_wrap_chose").bind('click',function(){
        var spantext =$(this).text();
        if(spantext=="隐藏标签选择"){
            $(this).text("打开标签选择");
            $(".usergroupportrait_content").slideUp(500);
        }else{
            $(this).text("隐藏标签选择");
            $(".usergroupportrait_content").slideDown(500);

        }
    });
  //标签选择的点击的事件，如果未选择则选择，再点击不选择
    $(document).on('click','.usergroupportrait_content .usergroupportrait_choose',function(){
    	 var flag =false;
    	 //解决border在不同浏览器中的问题
         if((baseMethod.whatBrowser() == "Safari"&&!flag) ||(baseMethod.whatBrowser() == "FF"&&!flag) || (baseMethod.isIE()&&!flag) || (baseMethod.whatBrowser() == "Chrome"&&!flag)){
             if($(this).css("borderLeftColor") == 'rgb(255, 255, 255)') {
                 $(this).css('border-top-width', '1px');
                 $(this).css('border-top-color', 'rgb(244,132,0)');
                 $(this).css('border-right-color', 'rgb(244,132,0)');
                 $(this).css('border-bottom-color', 'rgb(244,132,0)');
                 $(this).css('border-left-color', 'rgb(244,132,0)');
                 $(this).append('<span class="usergroupportrait_text_img"></span>');
                 flag =true;
             }
         }else{
                 $(this).css('border-top-width', '1px');
                 $(this).css('border-top-color', 'rgb(255, 255, 255)');
                 $(this).css('border-right-color', 'rgb(255, 255, 255)');
                 $(this).css('border-bottom-color', 'rgb(255, 255, 255)');
                 $(this).css('border-left-color', 'rgb(255, 255, 255)');
                 $(this).children().remove(".usergroupportrait_text_img");
                 flag =false;
         }

    });
   /* $(".usergroupportrait_content div").each(function(){
        var flag =false;
        $(this).on('click',function(){
        	
            //解决border在不同浏览器中的问题
            if((baseMethod.whatBrowser() == "Safari"&&!flag) ||(baseMethod.whatBrowser() == "FF"&&!flag) || (baseMethod.isIE()&&!flag) || (baseMethod.whatBrowser() == "Chrome"&&!flag)){
                if($(this).css("borderLeftColor") == 'rgb(255, 255, 255)') {
                    $(this).css('border-top-width', '1px');
                    $(this).css('border-top-color', 'rgb(244,132,0)');
                    $(this).css('border-right-color', 'rgb(244,132,0)');
                    $(this).css('border-bottom-color', 'rgb(244,132,0)');
                    $(this).css('border-left-color', 'rgb(244,132,0)');
                    $(this).append('<span class="usergroupportrait_text_img"></span>');
                    flag =true;
                }
            }else{
                    $(this).css('border-top-width', '1px');
                    $(this).css('border-top-color', 'rgb(255, 255, 255)');
                    $(this).css('border-right-color', 'rgb(255, 255, 255)');
                    $(this).css('border-bottom-color', 'rgb(255, 255, 255)');
                    $(this).css('border-left-color', 'rgb(255, 255, 255)');
                    $(this).children().remove(".usergroupportrait_text_img");
                    flag =false;
            }


        });
    });*/

    
    /**************************点击2级出现3级标签************************************/
    $(".secondGr").click(function() {
    	$(".firstGr").attr("style","background: rgb(245, 247, 250)");
    	$(".secondGr").attr("style","background: rgb(245, 247, 250)");
    	$(this).attr("style","background:#d0e2fa!important");
    	
       $('.usergroupportrait_content').children('.usergroupportrait_choose').remove();
        $(this).next().find('span').each(function(){
        	 var choose_div=$('<div class="usergroupportrait_choose"></div>');
        	 var span_div=$(' <span class="usergroupportrait_text"></span>');
        	 span_div.text($(this).text()).attr('value',$(this).attr('value'));
        	 choose_div.append(span_div);
        	 $('.usergroupportrait_content .sergroupportrait_addbtn').before(choose_div);
        });
        var req=$(this).find('.second_img').attr('value');
        $('#ugType').attr('value',$(this).parents('.left_gr').find('.firstGr span').attr('value'));
        $.ajax({
			    url:basePath+'/userGroup/userGroupCoverageRate',
			    type:'POST',
			    async:false,
			    data:JSON.stringify(req),
			    timeout:5000,    //超时时间
			    contentType:"application/json; charset=utf-8",
			    dataType:'json',
			    success:function(data){
			    var result=data.data;
			    $('#usergroup_id').text(result.name).attr('value',result.id);
			    $('#usergroup_id').next().text(result.coverageRage+'%');
			    $('#usergroup_id').next().next().text(result.userNum+'人');
			    },
			    error:function(xhr){
			    	popMessage("服务器错误");
			    	console.log('错误');	
			    }
			});
    });

    /**************************点击2级出现3级标签************************************/
    
    /**************************点击1级出现2级标签************************************/
    $(".firstGr").click(function() {
        //得到当前2级的3级的display
    	$(".firstGr").attr("style","background: rgb(245, 247, 250)");
    	$(".secondGr").attr("style","background: rgb(245, 247, 250)");
    	$(this).attr("style","background:#d0e2fa!important");
        var dis = $(this).next().css('display');
        if(dis =='none'){  
            $(this).next().slideDown(500);
        }else{
            $(this).next().slideUp(500);
        }

    });
    /**************************点击1级出现2级标签************************************/
    
    /**************************点击添加************************************/
    $('.sergroupportrait_addbtn').click(function(){
        //获得选中的标签
    	var choose_img=$('.usergroupportrait_content').find('.usergroupportrait_text_img');
    	if(choose_img.length==0){
    		popMessage('请至少选择一项');
    	}else{
    		//获得当前用户群id
    		var ugid=$('#usergroup_id').attr('value');
    		var tagids=[];
    		choose_img.each(function(){
    			tagids.push($(this).prev().attr('value'));
    		});
    		var req=new Object();
    		req.userGroupId=ugid;
    		req.tagIds=tagids;
    		req.type=$('#ugType').attr('value');
    		 $.ajax({
 			    url:basePath+'/userGroup/histogramPortrait',
 			    type:'POST',
 			    async:false,
 			    data:JSON.stringify(req),
 			    timeout:5000,    //超时时间
 			    contentType:"application/json; charset=utf-8",
 			    dataType:'json',
 			    success:function(data){
 			    	if(data.code==200){
 			    		var result=data.data;
 			    		addHistogram(result);
 			    	}
 			    },
 			    error:function(xhr){
 			    	popMessage("失败了");
 			    	console.log('错误');	
 			    }
 			});
    	}
    });
    
    $(document).on('click','.portrait-list',function(){
    	window.location.href=basePath+'/userGroup/userPortrait';
       });
});