  var clientHeight = window.screen.height-50;
  var objectObj =  $(".con_gr");
  objectObj.css("height", clientHeight+'px');
  
  var MutationObserver = window.MutationObserver ||window.WebKitMutationObserver || window.MozMutationObserver;
  var mutationObserverSupport = !!MutationObserver; 
  
  window.onload=function(){
	  if (mutationObserverSupport){
	 	     var callback = function(records){
	 	    	 formula();
	 	   	};
	 		var mo = new MutationObserver(callback);
	 	   	var option = {
	 	   	    'childList': true, 
	 	   	    'subtree': true,
	 	   	};
	 	   	var addtocontent= document.getElementById('addtocontent');
	 	   	mo.observe(addtocontent, option); 
	 	 }
  }

function formula(){
      var conditions=$('#addtocontent').find('.sersureaddlabel_item ');
      var target=$('.sersureaddlabel_oversee_watch');
      target.children().remove();
      conditions.each(function(index1){
    	  var header_name=$(this).find('p').text();
    	  var header_id=$(this).find('p').attr('value');
    	  var relationship=$(this).find('select');
    	  var all=$('<div  class="overseeitem"></div>');
    	  var label_son=$('<label class="sersureaddlabel_oversee_text"></label>');
    	  label_son.attr('value',header_id);
    	  label_son.text(header_name);
    	  
    	  var content=$('<div  class="attributetext"></div>');
    	  var list= $(this).find('.hascontent span');
    	  list.each(function(index2){
    		  var content_son=$('<label class="sersureaddlabel_oversee_text"></label>');
    		  content_son.attr('value',$(this).attr('value'));
    		  if(0==list.length-1){
    			  content_son.text("("+$(this).text()+")"); 
    		  }else if(index2==0){
    			  content_son.text("("+$(this).text()); 
    		  }else if(index2==list.length-1){
    			  content_son.text($(this).text()+")"); 
    		  }else{
    			  content_son.text($(this).text()); 
    		  }
    		  content.append(content_son);
    	  });
    	  if(index1!=conditions.length-1){
    	  var p_son=$('<p class="sersureaddlabel_oversee_text"></p>');
    	  p_son.attr('value',relationship.val()).text(relationship.find("option:selected").text());
    	  }else{
    	  var p_son=$('');  
    	  }
    	  all.append(label_son,content,p_son);
    	  target.append(all);
      });
 }

//第一步至少要选一项的弹窗
function popwindow(){
    $.confirm({
        title: '提示信息',
        closeIcon: true,
        boxWidth: '30%',
        useBootstrap: false,
        type: 'red',
        typeAnimated: true,
        content: '对不起至少要选一项!',
        buttons: {
            somethingElse: {
                text: '确定',
                btnClass: 'btn-blue',
                keys: ['enter']
            }
        }
    });
}

function addfailed(message){
    $.confirm({
        title: '提示信息',
        closeIcon: true,
        boxWidth: '30%',
        useBootstrap: false,
        type: 'red',
        typeAnimated: true,
        content:message,
        buttons: {
            somethingElse: {
                text: '确定',
                btnClass: 'btn-blue',
                keys: ['enter']
            }
        }
    });
}

function addsuccess(){
	 $.confirm({
	        title: '信息提示',
	        content: '添加成功！',
	        buttons: {
	            formSubmit: {
	                text: '确定',
	                btnClass: 'btn-blue',
	                action: function () {
	                    window.location.href=basePath+'/userGroup/statistics';
	                }
	            },
	            cancel:{
	                text: '取消',
	                btnClass: 'btn btn-default',
	                action: function () {
	                    console.log("取消");
	                }
	            },
	        }
	    });
}

function timeerror(){
    $.confirm({
        title: '提示信息',
        closeIcon: true,
        boxWidth: '30%',
        useBootstrap: false,
        type: 'red',
        typeAnimated: true,
        content: '结束日期不能小于开始日期!',
        buttons: {
            somethingElse: {
                text: '确定',
                btnClass: 'btn-blue',
                keys: ['enter']
            }
        }
    });
}


 //点击第一步的下一步的判读必须有一个item
function musthasitemerror(){
    $.confirm({
        title: '提示信息',
        closeIcon: true,
        boxWidth: '30%',
        useBootstrap: false,
        type: 'red',
        typeAnimated: true,
        content: '请填写或者选择完整的信息!',
        buttons: {
            somethingElse: {
                text: '确定',
                btnClass: 'btn-blue',
                keys: ['enter']
            }
        }
    });
}

//第二步的表单的弹窗
function mustinputerror(){
    $.confirm({
        title: '提示信息',
        closeIcon: true,
        boxWidth: '30%',
        useBootstrap: false,
        type: 'red',
        typeAnimated: true,
        content: '请填写完整的信息!',
        buttons: {
            somethingElse: {
                text: '确定',
                btnClass: 'btn-blue',
                keys: ['enter']
            }
        }
    });
}
function searchStr() {
	   var searchval = $("#searchval").val();
	      $(".usersureaddlabel_content div.usersureaddlabel_choose_search").each(function fun(){
	          var str  =  $(this).find("span").text();
	          substr = searchval;
	          if(isContains(str, substr)){
				  $(this).css("display","inline-block");
			  }else{
	              $(this).css("display","none");
			  }
		  });
}

function isContains(str, substr) {
    return new RegExp(substr).test(str);
}
$(document).ready(function() {
	
	$(".left_gr").find("div").eq(0).attr("style","background:#435569!important");
	$("#searchbtn").bind("click",searchStr);
	$("#searchval").blur(searchStr);
   
	/**************************添加用户群************************************/
       $('#addusergroup').click(function(){
    	   var req=new Object();
    	   req.name=$('#threeusergroupname').text();
    	   req.description=$('#threeusergroupdescription').text();
    	   req.purpose=$('#threeusergroupdeuse').text();
    	   req.validStart= $("#starttime").val();
    	   req.validEnd=$("#endtime").val();
    	   req.tagId=$("#threeuseraddlabel_id").text();
    	   req.relation=$('#threeuseraddlabel_text').text();
    	   req.type=1;
    	   $.ajax({
			    url:basePath+'/userGroup/addUserGroup',
			    type:'POST',
			    async:false,
			    data:JSON.stringify(req),
			    timeout:5000,    //超时时间
			    contentType:"application/json; charset=utf-8",
			    dataType:'json',
			    success:function(data){
			    	if(data.code==200){
			    		addsuccess();
			    	}else{
			    		addfailed(data.msg);
			    	}
			    },
			    error:function(xhr){
			    	addfailed('添加失败');
			    	console.log('错误');	
			    }
			});
       });
	
	/**************************点击第一步的条件删除************************************/
	   $(document).on('click',"#addtocontent .sersureaddlabel_rec_delimg",function() {
		   $(this).parents('.sersureaddlabel_item').remove(); 
	  });

	  /**************************点击1级出现2级标签************************************/
		$(document).on('click',".firstGr",function() {
			$(".firstGr").attr("style","background: #435569");
	    	$(".secondGr").attr("style","background: #435569");
	    	$(".we .we_div").attr("style","background: #435569");
	    	$(this).attr("style","background:#2fa4ff!important");
			var NOB = $(this).siblings(".zi");
			if(NOB.css("display") === "none") {
		        $(this).siblings(".zi").show();
		        $(this).siblings(".zi").find(".secondzi").hide();
		        $(this).siblings(".zi").find(".we").hide();
		        $(this).siblings(".zi").find(".four").hide();
		        $(this).siblings(".zi").find(".secondGr").eq(0).find(".second_img").css("background","url(../../image/u61.png) no-repeat 0 10px");
				/*var tagType = $(this).nextAll().last();  //获取目标tagType
				var tag= $(this).children().last();
				NOB.html("");
				var req=new Object();
				req.tagid=parseInt(tag.attr('value'));
				req.tagtype=parseInt(tagType.text());
				req.includefirst=1;
				console.log(JSON.stringify(req));
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
				    			createug.addTreeForTwo(result.tlist,NOB);
					    		if(result.firstChildernList!=null){
					    			createug.addTreeForThree(result.firstChildernList,NOB.find('.we').first());
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
 /**************************点击4级出现右侧动态标签************************************/
$(document).on('click',".four .four_div",function() {
	$(".firstGr").attr("style","background: #435569");
	$(".secondGr").attr("style","background: #435569");
	$(".we .we_div").attr("style","background: #435569");
    $(".four .four_div").attr("style","background: #435569");
	$(this).attr("style","background:#2fa4ff!important");    	//得到当前4级的3级的display	 
	/*var tagname = $(this).find('span').text();
    var tagid = $(this).find('span').attr('value');
    $('.first_text').text(tagname).attr('value',tagid);
    var req=new Object();
    req.tagid=parseInt(tagid);
	req.tagtype=parseInt( $(this).parents(".left_gr").children("span").text());
	req.includefirst=0;
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
	    		createug.addCheckBox(result.tlist);
		        }
	    },
	    error:function(xhr){
	    	console.log('错误');
	    }
	});*/
})	 
	 
/**************************点击3级出现4级标签************************************/
	 $(document).on('click', '.we .we_div', function () {
		$(".firstGr").attr("style","background: #435569");
    	$(".secondGr").attr("style","background: #435569");
    	$(".we .we_div").attr("style","background: #435569");
        $(".four .four_div").attr("style","background: #435569");
    	$(this).attr("style","background:#2fa4ff!important");
    	var wedis = $(this).parent().next().css('display')
      	if(wedis == "block"){
	        $(this).parent().next().hide();
	        $(this).find(".we_div_span").css("background","url(../../image/u61.png) no-repeat 0 10px");
      	}else{

        	$(this).parent().next().show();
        	$(this).find(".we_div_span").css("background","url(../../image/u62.png) no-repeat 0 10px");
      		/* var req=new Object();
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
					    		createug.addTreeForThree(result.tlist,current.next());
						        }
					    	
					    },
					    error:function(xhr){
					    	console.log('错误');
					    }
					});*/
      	}
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
			    /* var req=new Object();
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
					    		createug.addTreeForThree(result.tlist,current.next());
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

	 /**************************点击2级出现3级标签************************************/

	    
	  //点击第一步的下一步
	  // 1. 第一个面板隐藏，第二个展示 2.把值传递给第三个界面
	  $("#one_next").on('click',function(){
		    //必须选择才能够传值到下一步循环遍历每一个item，除掉第一个
			var flagone= false;
			if($("#addtocontent section").length>=1){
	          flagone= true;
			}
			if(!flagone){
	            musthasitemerror();
	        }else{
	            //第一个隐藏
	            var createusergroupcount_wrap = $(".createusergroupcount_wrap");
	            var btngroup_wrap = $(".btngroup_wrap");
	            var guide_line_active =$(".guide_line_active");
	            var guide_one_img =  $(".guide_one_img");
	            createusergroupcount_wrap.css("display","none");
	            btngroup_wrap.css("display","none");
	            guide_line_active.attr("class","guide_line");
	            guide_one_img.css("background","url("+basePath+"/res/image/circle.png) no-repeat");
	            //第二步显示
	            var createusergroupcount_twowrap = $(".createusergroupcount_twowrap");
	            var btngroup_twowrap = $(".btngroup_twowrap");
	            var guide_two_line = $(".guide_two_line");
	            var guide_two_img =  $(".guide_two_img");
	            createusergroupcount_twowrap.css("display","block");
	            btngroup_twowrap.css("display","block");
	            guide_two_line.attr("class","guide_two_line_active");
	            guide_two_img.css("background","url("+basePath+"/res/image/circle_active.png) no-repeat");

			}

		});
	    //点击第二步的上一步
	    var two_pro_btn = $(".two_pro_btn");
	    two_pro_btn.on("click",function(){
	        //第二个面板隐藏
	        var createusergroupcount_twowrap = $(".createusergroupcount_twowrap");
	        var guide_two_line = $(".guide_two_line_active");
	        var guide_two_img =  $(".guide_two_img");
	        var btngroup_twowrap = $(".btngroup_twowrap");
	        createusergroupcount_twowrap.css("display","none");
	        guide_two_line.attr("class","guide_two_line");
	        guide_two_img.css("background","url("+basePath+"/res/image/circle.png) no-repeat");
	        //第一个面板出现
	        var createusergroupcount_wrap = $(".createusergroupcount_wrap");
	        createusergroupcount_wrap.css("display","block");
	        //第一步按钮组出现
	        var btngroup_wrap = $(".btngroup_wrap");
	        btngroup_wrap.css("display","block");
	        var guide_line =$(".guide_line");
	        guide_line.attr("class","guide_line_active");
	        var guide_one_img =  $(".guide_one_img");
	        guide_one_img.css("background","url("+basePath+"/res/image/circle_active.png) no-repeat");
	    });
		//点击第二步下一步
		// 1. 第二步的面板的隐藏第三个面板的出现 2. 传值给第三个面板
		var two_next_btn = $("#two_next_btn");
		two_next_btn.on('click',function(){
			/*第一步的条件*/
			var formula='';
			var formula_id='';
			console.log(formula);
			$('.sersureaddlabel_oversee_watch').find('.overseeitem').each(function(){
				var threelabel=$(this).children().first().text();
				formula=formula+threelabel+" ";
				var attribute= $(this).children('.attributetext').find('.sersureaddlabel_oversee_text');
				attribute.each(function(index){
					formula=formula+$(this).text()+" ";
					if(index==0){
						formula_id=formula_id+'( ';
					}
					formula_id=formula_id+$(this).attr('value')+" ";
					if(index==attribute.length-1){
						formula_id=formula_id+') ';
					}else{
						formula_id=formula_id+'or ';
					}
				});
				var relationship=$(this).children('p');
				formula=formula+relationship.text()+" ";
				formula_id=formula_id+(typeof(relationship.attr('value'))=='undefined'?"":relationship.attr('value')+" ");
			});
			/*第二步的表单*/
	        var usergroupname =$("#usergroupname");//组合名称
	        var usergroupmean = $("#usergroupmean");//组合含义
	        var usergroupdeuse = $("#usergroupdeuse");//组合用途
	        var starttime = $("#starttime");
	        var endtime = $("#endtime");
			//空值的判断
	        if(usergroupname.val() == ""|| usergroupmean.val() =="" ||usergroupdeuse.val()=="" || starttime.val() =="" ||endtime.val() ==""  ){
	            mustinputerror();
			}else{
	            //日期的判断
	            if(!checkdate()){
				}else{
	                //隐藏第二个面板的信息
	                var createusergroupcount_twowrap = $(".createusergroupcount_twowrap");
	                var guide_two_line = $(".guide_two_line_active");
	                var guide_two_img =  $(".guide_two_img");
	                createusergroupcount_twowrap.css("display","none");
	                guide_two_line.attr("class","guide_two_line");
	                guide_two_img.css("background","url("+basePath+"/res/image/circle.png) no-repeat");
	                // 展示第三个面板的信息
	                var createusergroupcount_threewrap = $(".createusergroupcount_threewrap");
	                var guide_three_line = $(".guide_three_line");
	                var guide_three_img =$(".guide_three_img");
	                createusergroupcount_threewrap.css("display","block");
	                guide_three_line.attr("class","guide_three_line_active");
	                guide_three_img.css("background","url("+basePath+"/res/image/circle_active.png) no-repeat");
	                //给第三个面板赋值
	                var threeusergroupname =$("#threeusergroupname");
	                threeusergroupname.html(usergroupname.val());
	                var threeusergroupdescription = $("#threeusergroupdescription");
	                threeusergroupdescription.html(usergroupdescription.val());
	                var threeusergroupdeuse = $("#threeusergroupdeuse");
	                threeusergroupdeuse.html(usergroupdeuse.val())
	                $("#threeuseraddlabel_text").text(formula);
	                $("#threeuseraddlabel_id").text(formula_id);
	                console.log();
	                var time = $("#time");
	                time.html(starttime.val() +"至" + endtime.val());
	                var compeople = $("#compeople");
	                $("#threecompeople").html('');
	                var coverpeople = $("#coverpeople");
	                $("#threecoverpeople").html('');
				}
			}
		});

	
	    //点击第三步的上一步
		var three_pro_btn =$("#three_pro_btn");
	    three_pro_btn.on("click",function(){
	      //首先第三个面板隐藏
	      var createusergroupcount_threewrap = $(".createusergroupcount_threewrap");
	      createusergroupcount_threewrap.css("display","none");
	      //第三个面板线条置灰
	      var guide_three_line = $(".guide_three_line_active");
	      guide_three_line.attr("class","guide_three_line");
	      //第三个面板图片置灰
	      var guide_three_img =$(".guide_three_img");
	      guide_three_img.css("background","url("+basePath+"/res/image/circle.png) no-repeat");
	      //第二个面板出现
	      var createusergroupcount_twowrap = $(".createusergroupcount_twowrap");
	      createusergroupcount_twowrap.css("display","block")
	      var guide_two_line = $(".guide_two_line");
	      var guide_two_img =  $(".guide_two_img");
	      guide_two_line.attr("class","guide_two_line_active");
	      guide_two_img.css("background","url("+basePath+"/res/image/circle_active.png) no-repeat");
		});
	    
	    
	    function checkdate(){
	        //开始日期
	        var s1 = document.getElementById("starttime").value;
	        //结束日期
	        var s2 = document.getElementById("endtime").value;
	        var sDate = new Date(s1.replace(/\-/g,'/'));
	        var eDate = new Date(s2.replace(/\-/g,'/'));
	        if(sDate > eDate){
	            timeerror();
	            eDate='';
	            return false;
	        }
	        return true;
	    }

	    //点击添加按钮操作1.出现在列表中2.出现在公式预览中
	    $(".userlabel_addbtn").bind("click",function(){
            //判断至少选择一个属性
		   var SelectFalse = false; //用于判断是否被选择条件
		   $("input[name='item']").each(function(){
		   if($(this).prop('checked')== true){
		      SelectFalse = true;
		     }
		   });
		   if(!SelectFalse){
		     popwindow();
		     return false;
		   }
		   if(SelectFalse){
			   var useraddlabel_nav_text = $(".first_text").text();   //三级标签name
			   var useraddlabel_nav_text_id = $(".first_text").attr('value');  //三级标签id
			   $("input[name='item']").each(function(){
				   if($(this).prop('checked')){
					   var choseId = $(this).next().attr("value");
					   var choseContent = $(this).next().text();
					   var index=$('#addtocontent').children().length+1;
					   createug.addCondition(useraddlabel_nav_text,useraddlabel_nav_text_id,choseContent,choseId,index);
				   }
				});
		     }
	    });
 });
 
 var createug={
		 addTreeForThree : function(tagThrees,target) {
				target.html("");
				for (var i = 0; i < tagThrees.length; i++) {
					var current = tagThrees[i];
					var moban = $('#addTreeForThree').clone();
					moban.find('span').attr("value", current.id).attr("title",current.name).text(current.name);
					target.append(moban.html());
				}
			},
			addTreeForTwo : function(tagTwos, target) {
				for (var i = 0; i < tagTwos.length; i++) {
					var current = tagTwos[i];
					var moban = $('#addTreeForTwo').clone();
					moban.find('span').attr("value", current.id).attr("title",current.name).text(current.name);
					target.append(moban.html());
				}
			},
			addCheckBox:function(tagFour){
				var target=$('.createusergroupcount_wrap .useraddlabel_wrap .usersureaddlabel_content');
				target.children().remove();
				for(var i=0;i<tagFour.length;i++){
				var current=tagFour[i];
				var choose=$('<div class="usersureaddlabel_choose usersureaddlabel_choose_search"><input name="item"  class="usersureaddlabel_checkbox" type="checkbox"/></div>');
				var usersureaddlabel_text_span=$('<span class="usersureaddlabel_text"></span>');
				usersureaddlabel_text_span.text(current.name);
				usersureaddlabel_text_span.attr('value',current.id);
				choose.append(usersureaddlabel_text_span);
				target.append(choose);
				}
			},
			addCondition:function(name3,id3,name4,id4,index){
				var inspect=true;
				$('.sersureaddlabel_item div.sersureaddlabel_rec').each(function(){
					if($(this).find('p').attr('value')==id3){
						inspect=false;
						var include=true;
						$(this).find('.hascontent span').each(function(){
							if($(this).attr('value')==id4){
								include=false;
							};
						});
						if(include){
							var addspan=$('<span class="sersureaddlabel_rec_instruction"></span>');
							addspan.text(name4).attr('value',id4);
							$(this).find('.hascontent').append(addspan);
						}
					}
				});
				if(inspect){
					var moban = $('#condition').clone();
					moban.find('.sersureaddlabel_rec_num').text(index);
					moban.find('p').text(name3).attr('value',id3);
					moban.find('.hascontent span').text(name4).attr('value',id4);
					$(".addtocontent").append(moban.html());
				}
			}
 }