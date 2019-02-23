function popMessage(message,color){
    $.confirm({
        title: '提示信息',
        closeIcon: true,
        boxWidth: '30%',
        useBootstrap: false,
        type: color,
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

$(document).ready(function(){
  //列表中的环形图表
  var dom = document.getElementById("chart");
  var myChart = echarts.init(dom);
  var option = {
    color:["blue","#999"],
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['40%', '60%'],
            hoverAnimation:false,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:30, name:'邮件营销'}
            ]
        }
    ]
  };
  myChart.setOption(option);
  
  //
  if($(".drop_down").height() < 345){
    $(".drop_down").css("height","345px");
  }else{
    $(".drop_down").css("height","auto");
  }
  //点击搜索
  $(".Userl_radio6").on("click",function(){

  })
	 //点击左侧的三级标签，右侧页面显示四级标签和五级标签的内容
    var Ddrop_down = $('.drop_down');
    $(".left_gr").find("div").eq(0).attr("style","background:#435569!important");
    $(document).on('click', '.we .we_div', function () {
    	$(".firstGr").attr("style","background: #435569");
    	$(".secondGr").attr("style","background: #435569");
    	$(".we .we_div").attr("style","background: #435569");
      $(".four .four_div").attr("style","background: #435569");
    	$(this).attr("style","background:#2fa4ff!important");
      var onelabel = $(this).parents(".zi").prev(".firstGr").find("span").text();//一级标签的名称
      var ourid = $(this).find('span').text();//三级标签名称
      var twolabel =$(this).parents(".secondzi").prev().find('.second_img').text();//二级标签名称
      var twolabs = $(this).parents(".secondzi").siblings(".secondGr").find('.second_img');//其他二级标签名称
      var tagLevel1=$(this).parents('.left_gr');
      /*
    		  tagLevel1.children('span').text(),
    		  tagLevel1.find('.firstGr').find('span').attr('value'));*/
          var html = '<span class="label_cont_top_l label_cont_top_l1" value=${oneLevel[0].id} title=${oneLevel[0].name}>'
                    +onelabel+'</span><span class="label_nav_sp2">></span>'
                    +'<span class="label_cont_top_l label_cont_top_l2" value=${oneLevel[0].id} title=${oneLevel[0].name}>'
                    +twolabel+'</span><span class="label_nav_sp2">></span>'
                    +'<span class="label_cont_top_l label_cont_top_l3" value=${oneLevel[0].id} title=${oneLevel[0].name}>'
                    +ourid+'</span>';
      $(".nav_second").html(html);
      var wedis = $(this).parent().next().css('display')
      if(wedis == "block"){
        $(this).parent().next().hide();
        $(this).find(".we_div_span").css("background","url(../../image/u61.png) no-repeat 0 10px");
      }else{
        $(this).parent().next().show();
        $(this).find(".we_div_span").css("background","url(../../image/u62.png) no-repeat 0 10px");
      }
      //加载到右侧工作空间
	      //var labelHeader=$('.label_cont_buttom .label_cont_buttom_conl');
	      //清空已有信息
	      //$('.drop_downRight').children('.year').remove();

	      //labelHeader.children().not('[data-toggle]').remove();
	      /*$(twolabs).each(function(){
	    	  var a1=$('<a class="label_cont_buttom_a"></a>').text($(this).text()).attr("value",$(this).attr('value')).attr('title',$(this).text());
	    	  if($(this).attr('value')==twolable.attr('value')){
	    		  a1.addClass('label_cont_buttom_conl_click');
	    	  }
	    	  labelHeader.find("[data-toggle]").before(a1);
        });*/

        queryUGList(1,null);
	      /*var req=new Object();
	      req.pid=parseInt(twolable.attr('value'));
		  req.tagid=parseInt(ourid);
		  req.tagtype=parseInt($(this).parents(".left_gr").children("span:hidden").text());
		  req.includeSon=1;
		  var onlyValid= $('.label_radio .label_radio_j input').prop('checked');
		  req.onlyValid=onlyValid?1:2;
		  $.ajax({
			    url:basePath+'/tagAndSon',
			    type:'POST',
			    async:false,
			    data:JSON.stringify(req),
			    timeout:5000,    //超时时间
			    contentType:"application/json; charset=utf-8",
			    dataType:'json',
			    success:function(data){
			    	if(data.code==200&&data.data!=null){
			    		var result=data.data;
			    		if(result.tag!=null){
			    			var tags= new Array(1); 
			    			tags[0]=result.tag;
			    			tagman.addThree(tags);
				    		tagman.addFour(result.tlist,req.tagtype,ourid);
			    		}
			    	}
			    },
			    error:function(xhr){
			    	console.log('错误');
			    }
			});*/
		  
		  $("#five").css("display","none");
		  $("#four").css("display","block");

    });
    //分页
    function queryUGList(curpage,pageSize){
      var req=new Object();
        var state=$('.User_radio .User_radio_j input').prop('checked');
        req.state=state?1:0;
        req.curPage=curpage;
        pageSize=10;
        req.pageSize=pageSize;
        req.type=$('#tag_type').text();
        $.ajax({
          url:basePath+'/tagAndSon',
          type:'POST',
          async:false,
          data:JSON.stringify(req),
          timeout:5000,    //超时时间
          contentType:"application/json; charset=utf-8",
          dataType:'json',
          success:function(data){
            if(data.code==200&&data.data!=null){
              var result=data.data;
              if(result.tag!=null){
                var tags= new Array(1); 
                tags[0]=result.tag;
                tagman.addThree(tags);
                tagman.addFour(result.tlist,req.tagtype,ourid);
              }
            }
          },
          error:function(xhr){
            console.log('错误');
          }
      });
    }
    function vagueQueryUGList(curpage,pageSize){
      var req=new Object();
      var state=$('.User_radio .User_radio_j input').prop('checked');
        req.state=state?1:0;
        req.name =$('#query').val();
        req.curPage=curpage;
        pageSize=10;
        req.pageSize=pageSize;
        req.type=$('#tag_type').text();
        $.ajax({
          url:basePath+'/tagAndSon',
          type:'POST',
          async:false,
          data:JSON.stringify(req),
          timeout:5000,    //超时时间
          contentType:"application/json; charset=utf-8",
          dataType:'json',
          success:function(data){
            if(data.code==200&&data.data!=null){
              var result=data.data;
              if(result.tag!=null){
                var tags= new Array(1); 
                tags[0]=result.tag;
                tagman.addThree(tags);
                tagman.addFour(result.tlist,req.tagtype,ourid);
              }
              addPageInfo(result.pageBean)
            }
          },
          error:function(xhr){
            console.log('错误');
          }
      });
    }
    function addPageInfo(pageinfo){
        $('#curr').text(pageinfo.curPage);
        $('#reco').text(pageinfo.rowsCount);  
        $('#tota').text(pageinfo.pageCount);
        $('#size').text(pageinfo.pageSize);
        if(pageinfo.curPage==1){
          $('#sample-table_info').find('.up_page').css('cursor','Default').css('background','#ddd');
            $('#up_page').unbind();
        }else{
          $('#sample-table_info').find('.up_page').css('cursor','pointer').css('background','#fff');
          $('#up_page').bind("click",upPage);
        }
        if(pageinfo.curPage==pageinfo.pageCount){
          $('#sample-table_info').find('.next_page').css('cursor','Default').css('background','#ddd');
           $('#next_page').unbind();
        }else{
          $('#sample-table_info').find('.next_page').css('cursor','pointer').css('background','#fff');
          $('#next_page').bind("click",nextPage);
        }
      }
    function upPage(){
      var curPage=parseInt($('#curr').text());
      if(curPage>1){
        if(''==$('#query').val()){
          queryUGList(curPage-1,null);     
        }else{
          vagueQueryUGList(curPage-1,null);
        }
      } 
    }
 
    function nextPage(){
      var curPage=parseInt($('#curr').text());
      var tot=parseInt($('#tota').text());
      if(curPage<tot){
        if(''==$('#query').val()){
          queryUGList(curPage+1,null);    
        }else{
          vagueQueryUGList(curPage+1,null); 
        } 
      }
    }
   
    function searchPage(query){
      var reg = new RegExp("^[0-9]*$");
      if(!reg.test(query)){
        popMessage("请输入数字!");
        return false;
      }
      var tot=parseInt($('#tota').text());
      if(query>tot){
        query=tot;
      }
      if(''==$('#query').val()){
        queryUGList(query,null);
      }else{
        vagueQueryUGList(query,null);
      }
    }
   
   
    function vagueQuery(){
      if(''==$('#query').val()){
        queryUGList(1,null);
        return false;
      }
      vagueQueryUGList(1,null);
    }
    /**************************点击四级出现当前四级和五级标签************************************/
    $(document).on('click',".four .four_div",function() {
    	$(".firstGr").attr("style","background: #435569");
    	$(".secondGr").attr("style","background: #435569");
    	$(".we .we_div").attr("style","background: #435569");
      $(".four .four_div").attr("style","background: #435569");
    	$(this).attr("style","background:#2fa4ff!important");    	//得到当前4级的3级的display
    	var onelabel = $(this).parents(".zi").prev(".firstGr").find("span").text();//1级标签
      var twolabel = $(this).parents(".secondzi").prev().find('.second_img').text();//二级标签名称
      var fourlabel = $(this).find('span').text();//四级标签名称
      var threelabel = $(this).parent(".four").prev().find('span').text();//三级标签名称
      var html = '<span class="label_cont_top_l label_cont_top_l1" value=${oneLevel[0].id} title=${oneLevel[0].name}>'
                    +onelabel+'</span><span class="label_nav_sp2">></span>'
                    +'<span class="label_cont_top_l label_cont_top_l2" value=${oneLevel[0].id} title=${oneLevel[0].name}>'
                    +twolabel+'</span><span class="label_nav_sp2">></span>'
                    +'<span class="label_cont_top_l label_cont_top_l3" value=${oneLevel[0].id} title=${oneLevel[0].name}>'
                    +threelabel+'</span><span class="label_nav_sp2">></span>'
                    +'<span class="label_cont_top_l label_cont_top_l3" value=${oneLevel[0].id} title=${oneLevel[0].name}>'
                    +fourlabel+'</span>';
      $(".nav_second").html(html); 

          /*var current=$(this);
         var dis = current.next().css('display');
         var spanimg =current.find("span.second_img");
         //判断当前的3级是否是合并的状态
         if(dis =='none'){
        	 var tagLevel1=$(this).parents('.left_gr');
            		 tagLevel1.children('span').text(),
            		 tagLevel1.find('.firstGr').find('span').attr('value'));
        	 //关闭所有同级标签
        	 current.siblings(".we").css("display","none");
        	 current.siblings().find("span.second_img").css("background","url("+basePath+"/res/image/u61.png) no-repeat 0 4px");
             //打开当前标签
        	 current.next().css('display','block');
             spanimg.css("background","url("+basePath+"/res/image/u62.png) no-repeat 0 4px");
               //加载到右侧工作空间
		        var labelHeader=$('.label_cont_buttom .label_cont_buttom_conl');
		        //清空已有信息 操作主面板二级菜单导航
		        labelHeader.children().not('[data-toggle]').remove();
		        current.parent().find(".secondGr").each(function(){
		        	var a1=$('<a class="label_cont_buttom_a"></a>').text($(this).children("span").text())
		        	.attr("value",$(this).children("span").attr("value"))
		        	.attr("title",$(this).children("span").text());
		        	if($(this).html()==current.html()){
		        		a1.addClass("label_cont_buttom_conl_click");
		        	 }
		        	 labelHeader.find("[data-toggle]").before(a1);
				    });
		        var req=new Object();
    				req.tagid=parseInt(spanimg.attr("value"));
    				req.tagtype=parseInt(current.parents(".left_gr").children("span").text());
    				req.includefirst=0;
    				var onlyValid= $('.label_radio .label_radio_j input').prop('checked');
    				req.onlyValid=onlyValid?1:2;
    				var my= $('.label_radio .label_radio_my input').prop('checked');
    				req.my=my?1:2;*/
            queryUGList(1,null);
    				 //发送异步请求
    				/*$.ajax({
    				    url:basePath+'/tagList',
    				    type:'POST',
    				    async:false,
    				    data:JSON.stringify(req),
    				    timeout:5000,    //超时时间
    				    contentType:"application/json; charset=utf-8",
    				    dataType:'json',
    				    success:function(data){
    				    	if(data.code==200&&data.data!=null){
    				    		var result=data.data;
    					        	tagman.addThree(result.tlist);
    					        }
    				    	
    				    },
    				    error:function(xhr){
    				    	console.log('错误');
    				    }
    				});*/
    				$("#five").css("display","block");
    				$("#four").css("display","none");
		        
         /*}else{
             $(this).next().css('display','none');
             spanimg.css("background","url("+basePath+"/res/image/u61.png) no-repeat 0 4px");
         }*/
     });

 /**************************点击2级出现3级标签************************************/
    $(document).on('click',".secondGr",function() {
        $(".firstGr").attr("style","background: #435569");
        $(".secondGr").attr("style","background: #435569");
        $(".we .we_div").attr("style","background: #435569");
        $(".four .four_div").attr("style","background: #435569");
        $(this).attr("style","background:#2fa4ff!important");
           //得到当前2级的3级的display
         var current=$(this);
           var dis = current.next().css('display');
           var spanimg =current.find("span.second_img");
           console.log(dis)
           //判断当前的3级是否是合并的状态
           if(dis =='none'){
             var tagLevel1=$(this).parents('.left_gr');
             //关闭所有同级标签
             current.siblings(".secondzi").css("display","none");
             current.siblings(".secondzi").find(".we").css("display","none");
             current.siblings(".secondzi").find(".four").css("display","none");
             current.siblings(".secondzi").find(".we").eq(0).find(".we_div_span").css("background","url(../../image/u61.png) no-repeat 0 10px");
               //打开当前标签
              current.next().css('display','block');
              current.next().find(".we").css('display','block');
              spanimg.css("background","url(../../image/u62.png) no-repeat 0 10px");
              /*var req=new Object();
              req.tagid=parseInt(spanimg.attr("value"));
              req.tagtype=parseInt(current.parents(".left_gr").children("span").text());
              req.includefirst=0;
               //发送异步请求
              $.ajax({
                  url:basePath+'/tagList',
                  type:'POST',
                  async:false,
                  data:JSON.stringify(req),
                  timeout:5000,    //超时时间
                  contentType:"application/json; charset=utf-8",
                  dataType:'json',
                  success:function(data){
                    if(data.code==200&&data.data!=null){
                      var result=data.data;
                    }
                    
                  },
                  error:function(xhr){
                    console.log('错误');
                  }
              });*/
           }else{
               $(this).next().css('display','none');
               spanimg.css("background","url(../../image/u61.png) no-repeat 0 10px");
           }
       });
	
 /**************************列表************************************/
  
    //右侧合并展开
  //右侧的第一个三级标签下拉效果
    $(document).on('click','.drop_downRight .year0',function () {
        var shu_name =$(this).find(".shu_name");
        var tagtype =$(".label_cont_top").find(".label_cont_top_l").siblings('span').text();
        //展开4级
         if ($(this).parent().find(".gender_in").css("display") == "none" ) {
             $(this).parent().find(".gender_in").slideDown(500);
         }else if($(this).parent().find(".gender_in").css("display") == "block" ){
             $(this).parent().find(".gender_in").slideUp(500);
         }else{
         	    var req=new Object();
       				req.tagid=parseInt(shu_name.attr("value"));
       				req.tagtype=parseInt(tagtype);
       				req.includefirst=0;
       				var onlyValid= $('.label_radio .label_radio_j input').prop('checked');
      				req.onlyValid=onlyValid?1:2;
      				var my= $('.label_radio .label_radio_my input').prop('checked');
      				req.my=my?1:2;
       				 //发送异步请求
       				$.ajax({
       				    url:basePath+'/tagList',
       				    type:'POST',
       				    async:false,
       				    data:JSON.stringify(req),
       				    timeout:5000,    //超时时间
       				    contentType:"application/json; charset=utf-8",
       				    dataType:'json',
       				    success:function(data){
       				    	if(data.code==200&&data.data!=null){
       				    		var result=data.data;
       					        if(result!=null){
       					        	tagman.addFour(result.tlist,tagtype,shu_name.attr('value'));
       					        } 
       				    	}
       				    },
       				    error:function(xhr){
       				    	console.log('错误');
       				    }
       				});
       				
         }
     });
    //右侧合并展开
    //右侧的第四个标签出现第5个
 
    $(document).on('click',".drop_downRight .gender4_on2_1",function () {
        var shu_name_img =$(this).find(".shu_name_img");
        if(shu_name_img.attr('visibility')!='hidden'){
        	var fifth=$(this).parents('.gender_in').find(".gender_in_fifth");
        	var four=$(this).parents('.gender4').next();
        	 if(fifth==null||fifth.css('display') =='none'){
        		var req=new Object();
         				req.tagid=parseInt($(this).find('.shu_name').attr("value"));
         				var ttype=$('.label_cont_top .label_cont_top_l').next().text();
         				req.tagtype=parseInt(ttype);
         				req.includefirst=0;
         				var onlyValid= $('.label_radio .label_radio_j input').prop('checked');
        				req.onlyValid=onlyValid?1:2;
         				 //发送异步请求
         				$.ajax({
         				    url:basePath+'/tagList',
         				    type:'POST',
         				    async:false,
         				    data:JSON.stringify(req),
         				    timeout:5000,    //超时时间
         				    contentType:"application/json; charset=utf-8",
         				    dataType:'json',
         				    success:function(data){
         				    	if(data.code==200&&data.data!=null){
         				    		var result=data.data;
         					        if(result!=null&&result.tlist.length!=0){
         					        	tagman.addFive(result.tlist,four);
         					        } 
         				    	}
         				    },
         				    error:function(xhr){
         				    	console.log('错误');
         				    }
         				});
                shu_name_img.css("background","url('"+basePath+"/image/labelsystem/open.png') no-repeat");
                shu_name_img.css("marginTop","15px");
                fifth.css('display','block');
              }else{
                 shu_name_img.css("marginTop","10px");
                 shu_name_img.css("background","url('"+basePath+"/image/labelsystem/hebing.png') no-repeat");
                 fifth.css('display','none');
              }
        }
    }); 
    //删除
  $(document).on("click",".commondel",function(){
   	var current=$(this);
   	var level=$(this).attr('level');
   	var tagtype=$('.label_cont_top .label_cont_top_l').next().text();
   	if(level=='1'){
      /*var cid=$(this).parents('.year').find('.year0 span').attr('value');
      var pid=$('.label_cont_buttom_conl_click').attr('value');*/
    }else if(level=='2'){
      /*var cid=$(this).parents('.year').find('.year0 span').attr('value');
      var pid=$('.label_cont_buttom_conl_click').attr('value');*/
    }else if(level=='3'){
   		var cid=$(this).parents('.year').find('.year0 span').attr('value');
   		var pid=$('.label_cont_buttom_conl_click').attr('value');
   	}else if(level=='4'){
   		var cid=$(this).parents('.gender4_on2').find('.gender4_on2_1 .shu_name').attr('value');
   		var pid=$(this).parents('.year').find('.year0 span').attr('value');
   	}else if(level=='5'){
   		var cid=$(this).parents('.gender4_on2').find('.gender4_on2_1 .shu_name').attr('value');
   		var pid=$(this).parents('.gender_in_fifth').prev('.gender4').find('.gender4_on2_1 .shu_name').attr('value');
   	}
   	$.confirm({
           title: '提示信息',
           content: '是否删除？',
           buttons: {
               formSubmit: {
                   text: '删除',
                   btnClass: 'btn-blue',
                   action: function () {
                   	var req=new Object();
            				req.pid=parseInt(pid);
            				req.cid=parseInt(cid);
            				req.tagtype=parseInt(tagtype);
            				 //发送异步请求
            				$.ajax({
            				    url:basePath+'/deltag',
            				    type:'POST',
            				    async:false,
            				    data:JSON.stringify(req),
            				    timeout:5000,    //超时时间
            				    contentType:"application/json; charset=utf-8",
            				    dataType:'json',
            				    success:function(data){
            				    if(data.code==200){	
            				    	if(level=='1'){
                            current.parents('.tr').remove();
                          }else if(level=='2'){
                            current.parents('.tr').remove();
                          }else if(level=='3'){
            				    		current.parents('.year').remove();
            				    	}else if(level=='4'){
            				    		current.parents('.gender_in').remove();
            				    	}else if(level=='5'){
            				    		current.parents('.gender4').remove();
            				    	}		
            					 }
            				    popMessage(data.msg);
            				    },
            				    error:function(xhr){
            				    	console.log('错误');
            				    }
            				});  
                   }
               },
               cancel: {
                   text: '取消',
                   btnClass: 'btn-gray',
                   action: function () {
                   	console.log("已取消");
                   }
   			}
           }
       });
   });
	 
	  /**************************点击1级出现2级标签************************************/
    $(document).on('click',".firstGr",function() {
			 //背景
			$(".firstGr").attr("style","background: #435569");
    	$(".secondGr").attr({"style":"display:block"},{"style":"background:#435569"});
    	$(this).attr("style","background:#2fa4ff!important");
			var NOB = $(this).siblings(".zi");
			if(NOB.css("display") === "none") {
        $(this).siblings(".zi").show();
        $(this).siblings(".zi").find(".secondzi").hide();
        $(this).siblings(".zi").find(".we").hide();
        $(this).siblings(".zi").find(".four").hide();
        $(this).siblings(".zi").find(".secondGr").eq(0).find(".second_img").css("background","url(../../image/u61.png) no-repeat 0 10px");
				/*var tagType = $(this).nextAll().last();  //获取目标tagType
        console.log(tagType)
				var tag= $(this).children().last();*/
				//NOB.html("");
				/*var req=new Object();
				req.tagid=parseInt(tag.attr('value'));
				req.tagtype=parseInt(tagType.text());
				req.includefirst=1;
				var onlyValid= $('.label_radio .label_radio_j input').prop('checked');
				req.onlyValid=onlyValid?1:2;*/
			    //发送异步请求
				/*$.ajax({
				    url:basePath+'/tagList',
				    type:'POST',
				    async:false,
				    data:JSON.stringify(req),
				    timeout:5000,    //超时时间
				    contentType:"application/json; charset=utf-8",
				    dataType:'json',
				    success:function(data){
				    	if(data.code==200&&data.data!=null){
				    		var result=data.data;
				    		if(result.tlist!=null){
					    		if(result.firstChildernList!=null){
					    			tagman.addThree(result.firstChildernList);
					    		}else{
					    			$('.drop_downRight').children('.year').remove();
					    		}
				    		}
				    		NOB.find('.we').first().attr("style","display:block");
				            NOB.find(".secondGr").first().find("span").attr("style","background:url("+basePath+"/res/image/u62.png) no-repeat 0 4px !important;"); 
				    	}
				    },
				    error:function(xhr){
				    	console.log('错误');	
				    }
				});*/
			    NOB.slideDown(500);
          NOB.find(".secondGr").attr("style","background: #435569");
			}else{
				//关闭2级标签
	        NOB.slideUp(500);
          NOB.find(".secondGr").attr("style","background: #435569");
			}
		});
    
    
	 /**点击LabelContButtom事件**/
	/*$(document).on('click','.label_cont_buttom_conl a[value]',function(){
	    	var current=$(this);
	    	//修改样式
	    	current.siblings().removeClass('label_cont_buttom_conl_click')
	    	current.addClass('label_cont_buttom_conl_click');
	    	//打开对应树标签
	    	var onelevelid=$(".label_cont_top").find(".label_cont_top_l").attr('value');
	    	var tagtype=$(".label_cont_top").find(".label_cont_top_l").siblings('span').text();
	    	var onelevel=$('.firstGr span[value='+onelevelid+']').parents('.left_gr');
	    	onelevel.find('.zi').attr('style','display:block;');
	    	var twolevel=onelevel.find('.zi .second_img[value='+current.attr('value')+']');
	    	
	    	twolevel.parent('.secondGr').siblings('.we').attr('style',"display:none;");
	    	twolevel.parents('.zi').find('.second_img').attr('style',"background:url("+basePath+"/res/image/u61.png) no-repeat 0 4px !important;")
	    	
	    	twolevel.attr('style',"background:url("+basePath+"/res/image/u62.png) no-repeat 0 4px !important;");
	    	var threelevel=twolevel.parent('.secondGr').next();
	    	threelevel.attr('style',"display:block;");
	    	var req=new Object();
  			req.tagid=parseInt(current.attr('value'));
  			req.tagtype=parseInt(tagtype);
  			req.includefirst=0;
  			var onlyValid= $('.label_radio .label_radio_j input').prop('checked');
  			req.onlyValid=onlyValid?1:2;
  			var my= $('.label_radio .label_radio_my input').prop('checked');
  			req.my=my?1:2;
  		    //发送异步请求
  			$.ajax({
  			    url:basePath+'/tagList',
  			    type:'POST',
  			    async:false,
  			    data:JSON.stringify(req),
  			    timeout:5000,    //超时时间
  			    contentType:"application/json; charset=utf-8",
  			    dataType:'json',
  			    success:function(data){
  			    	if(data.code==200&&data.data!=null){
  			    		var result=data.data;
  			    		if(result.tlist!=null){
  			    			tagman.addThree(result.tlist);	
  			    		}
  			    	}
  			    },
  			    error:function(xhr){
  			    	console.log('错误');	
  			    }
  			});
			
  			$("#three").css("display","block");
  			  $("#four").css("display","none");
  	    });
  	    
  	    $('.label_radio input').change(function(){
  	    	var onlyValid=$('.label_radio .label_radio_j input').prop('checked');
  	    	var my=$('.label_radio .label_radio_my input').prop('checked');
  	    	QueryByCondition(onlyValid?1:2,my?1:2);
  	    });*/
	    
	    /**点击新建三级标签事件**/
	    $('#three .add_tab_n2').click(function(){
		    $('#oneLevelTag').children().remove();
//		   $('#oneLevelTag').prev().text("请选择");
		  
		    var req=new Object();
		    req.onlyValid=1;
		    req.my=1;
		    $.ajax({
			    url:basePath+'/queryMyOneBasicTag',
			    type:'POST',
			    async:false,
			    data:JSON.stringify(req),
			    timeout:5000,    //超时时间
			    contentType:"application/json; charset=utf-8",
			    dataType:'json',
			    success:function(data){
			    	var tlist=data.data;
			    	for(var i=0;i<tlist.length;i++){
			    		var ul_li1=$('<li></li>');
			    		var li_a=$('<a href="#" class="base_dropdown-menu_ul_a"></a>');
			    		li_a.attr('value',tlist[i].id).attr('title',tlist[i].name);
			    		li_a.text(tlist[i].name);
			    		ul_li1.append(li_a);
			    		var ul_li2=$('<li role="separator" class="divider"></li>');
			    		$('#oneLevelTag').append(ul_li1,ul_li2);
			    	}   
			    },
			    error:function(xhr){
			    	console.log('错误');	
			    }
			  });
	   });
	    
	    
	    var clientHeight = window.screen.height-190;
	    var objectObj =  $(".con_gr");
	    objectObj.css("height", clientHeight+'px');
});

function QueryByCondition(onlyValid,my){
   window.location.href=basePath+'/mge?onlyValid='+onlyValid+'&my='+my;
}


function CreateCompositeLabel(){
		var form = $('#form');
	    var namevalue="";
	    var pathvalue="";
	    var pIdvalue="";
	    var cIdvalue="";
	    var pLevelvalue="";
		$(".dian_name").each(function(index){
			namevalue = $(this).text();
			pLevelvalue = $(this).children("div").text();
			if( pLevelvalue == 3){
				pIdvalue = $(this).attr("value");
				cIdvalue=0;
			}
			if( pLevelvalue == 4){
				cIdvalue = $(this).attr("value");
				pIdvalue =$(this).children("span").text();
			}
			var spanvalue = "";
			$(this).parent().children("div").children("span").each(function(){
				spanvalue = spanvalue + "/" +$(this).text();
			})
			pathvalue = spanvalue;
			var name = $('<input type="text" name="tagCombination['+index+'].name" value="'+namevalue+'"/>');
			var path = $('<input type="text" name="tagCombination['+index+'].path" value="'+pathvalue+'"/>');
			var pId =  $('<input type="text" name="tagCombination['+index+'].pId"  value="'+pIdvalue+'"/>');
			var cId =  $('<input type="text" name="tagCombination['+index+'].cId"  value="'+cIdvalue+'"/>');
			var pLevel = $('<input type="text" name="tagCombination['+index+'].pLevel"  value="'+pLevelvalue+'"/>');
		 	form.append(name);
			form.append(path);
			form.append(pId);
			form.append(cId);
			form.append(pLevel);
		
		});		
		
		form.submit();
		return false;
	
	}

//点击列表四级，五级标签的启用禁用
$(".open_stop").on("click",function(){
  $.ajax({
    type: "POST",
    url: basePath+"/addTag",
    dataType:"json",
    data: JSON.stringify(data,null,2),
    contentType:"application/json",
    success: function(data){
      if(data.code == 200){
        bounced("执行成功!","blue");
        location.reload(); 
      }else{
        bounced(data.msg,"red");
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      bounced("系统错误","red");
    }
 });
})

//点击列表四级标签的编辑
$(".fourEdit").on("click",function(){
  $("#childrenModal label.error").text("");
  //标签名称验证
  $.validator.addMethod("isUser", function(value, element) {
      var length = value.length;
      var user = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
      return this.optional(element) || user.test(value);
  }, "请正确填写标签名称");

  $(".childrenfourModal").validate({
    rules: {
        addfourName: {
            required: true,
            isUser: true
        },
        fourLabelRules: {
          required: true
        },
        fourMeanings : {
            required: true
        },
        algorithmType: {
            required: true
        },
        algorithmName: {
            required: true
        }
    },
    messages: {
        addfourName: {
            required: "请输入标签名称",
            isUser : "请正确填写标签名"
        },
        fourLabelRules: {
            required: "请输入标签规则"
        },
        fourMeanings: {
            required: "请输入业务含义"
        },
        algorithmType: {
            required: "请输入算法类型"
        },
        algorithmName : {
            required : "请输入算法名称"
        }
    }
  })
  $("#createchildrentype").on('click', function (e) {
    var flag = $(".childrenfourModal").valid();
    console.log(flag)
    if (!flag) {
        //没有通过验证
        return;
    }
    var levelFourName = $("#levelFourName").val(),//标签名称
        fourMeanings = $("#fourMeanings").val(),//标签含义
        fourLabelRules = $("#fourLabelRules").val(),//标签规则
        algorithmType = $("#algorithmType").val(),//算法类型
        algorithmName = $("#algorithmName").val();//算法名称

    /*var meanings = $("#fourMeanings").val();
    var pId = $(".shu_name").attr("value");
    var rules = $("#fourLabelRules").val();
    var data = {"name":levelFourName,"level":4,"sign":1,"meanings":meanings,"pId":parseInt(pId),"tagRules":rules};*/
    
    $.ajax({
            type: "POST",
            url: basePath+"/addTag",
            dataType:"json",
            data: JSON.stringify(data,null,2),
            contentType:"application/json",
            success: function(data){
                if(data.code == 200){
                  bounced("添加成功!","blue");
                  $("#childrenModal").modal("hide");
                   location.reload(); 
                   
                }else{
                  bounced(data.msg,"red");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              bounced("系统错误","red");
                }
         });
    $("#childrenModal").modal("hide");
    
  })
})
//点击列表五级标签的编辑
$(".fiveEdit").on("click",function(){
  $("#smallchildrenModal label.error").text("");
  //标签名称验证
  $.validator.addMethod("isUser", function(value, element) {
      var length = value.length;
      var user = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
      return this.optional(element) || user.test(value);
  }, "请正确填写标签名称");

  $(".smallchildrenModalLabel").validate({
    rules: {
        addfourName: {
            required: true,
            isUser: true
        },
        fourLabelRules: {
          required: true
        },
        fourMeanings : {
            required: true
        }
    },
    messages: {
        addfourName: {
            required: "请输入标签名称",
            isUser : "请正确填写标签名"
        },
        fourLabelRules: {
            required: "请输入标签规则"
        },
        fourMeanings: {
            required: "请输入业务含义"
        }
    }
  })
  $("#createsmallchildrentype").on('click', function (e) {
    var flag = $(".smallchildrenModalLabel").valid();
    if (!flag) {
        //没有通过验证
        return;
    }
    var levelFourName = $("#levelFourName").val(),//标签名称
        fourMeanings = $("#fourMeanings").val(),//标签含义
        fourLabelRules = $("#fourLabelRules").val();//标签规则

    /*var meanings = $("#fourMeanings").val();
    var pId = $(".shu_name").attr("value");
    var rules = $("#fourLabelRules").val();
    var data = {"name":levelFourName,"level":4,"sign":1,"meanings":meanings,"pId":parseInt(pId),"tagRules":rules};*/
    
    $.ajax({
            type: "POST",
            url: basePath+"/addTag",
            dataType:"json",
            data: JSON.stringify(data,null,2),
            contentType:"application/json",
            success: function(data){
                if(data.code == 200){
                  bounced("添加成功!","blue");
                  $("#smallchildrenModal").modal("hide");
                   location.reload(); 
                   
                }else{
                  bounced(data.msg,"red");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              bounced("系统错误","red");
                }
         });
    $("#createsmallchildrentype").modal("hide");
    
  })
})

//点击一二三级标签的启用禁用
$(".main_openStop").on("click",function(){
  $.ajax({
    type: "POST",
    url: basePath+"/addTag",
    dataType:"json",
    data: JSON.stringify(data,null,2),
    contentType:"application/json",
    success: function(data){
      if(data.code == 200){
        bounced("执行成功!","blue");
        location.reload(); 
      }else{
        bounced(data.msg,"red");
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      bounced("系统错误","red");
    }
 });
})
//点击一级二级三级的编辑
$("#sureeditlabel").click(function(){
    var mainName = $("#labelName").val(),
      name = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
      data = {"oneName":mainName,"level":1,"sign":1};
    if(mainName == ""){
      bounced("标签名称不能为空！","red");
    }else{
      if(name.test(mainName)){
        $.ajax({
              type: "POST",
              url: basePath+"/addTag",
              dataType:"json",
              data: JSON.stringify(data,null,2),
              contentType:"application/json",
              success: function(data){
                  if(data.code == 200){
                    bounced("添加成功！","blue");
                    $("#sureeditlabel").modal("hide");
                      location.reload(); 
                      console.log($(".left_gr").last());
//                      console.log($(".firstGr").nextAll().last());
//                      $(".firstGr").nextAll().last().click();
                  }else{
                    bounced(data.msg,"red");
                 }
              },
              error: function(){
                bounced("系统错误！","red");
              }
            });

      }else{
        bounced("标签名称为数字，字母，汉字，下划线，横杠！","red");
      }

        
    }
    
    
    
  });

