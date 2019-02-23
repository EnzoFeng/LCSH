//判断是全量数据0，还是左侧一级菜单下面的局部数据1
var flag = 0;

//判断是标签列表下哪一种状态0已失败，1已暂停，2全部，3任务管理
var index = 0;

//入参对象
var req=new Object();

//datatable表格控制
var obj={
	       'bPaginate': true, //翻页功能
	        'bLengthChange':false , //改变每页显示数据数量
	        'bFilter': false, //过滤功能
	        'bSort': false, //排序功能
	        'bInfo': false,//页脚信息
	        'bAutoWidth': true,//自动宽度
	        'aLengthMenu':[[5], [5]],
	        "pagingType": "full_numbers",
	        "destroy": true,
	        
	        "oLanguage": {
	            "oPaginate": {
	                "sFirst": "首页",
	                "sPrevious": "前一页",
	                "sNext": "后一页",
	                "sLast": "尾页"
	            },
	            "sZeroRecords": "抱歉， 没有找到数据",
	            "sInfoEmpty":   "抱歉， 没有找到数据"
	        },
	    };


//状态转显示文本
function userGroupState(state){
		if(state == 1){
		 return	'已上线'	;
		}else if(state == 2){
		return	'申请中'	;
		}else if(state == 3){
		return	'已暂停' ;
		}else if(state == 4){
		return '已失败' ;
		}else{
		return '未定义' ;
		}		
}
//添加表记录   target：目标table的tbody  list TaskListResult的集合  index点击（失败，暂停，全部等）的数组下标 0，1，2，3
function addRecord(target,list,index){
	for(var i=0;i<list.length; i++){
		var current=list[i];
		var record=$('<tr></tr>');
	    var one=$('<td></td>').text(current.levelOneTagName);
	    var two=$('<td></td>').text(current.levelTwoTagName);
	    var three=$('<td></td>').text(current.levelThreeTagName);
	    var four=$('<td></td>').text(current.levelFourTagName);
	    var tagid=$('<td></td>').text(current.tagId);
	    var status=$('<td></td>').text(userGroupState(current.status));
	    var coverageNum=$('<td></td>').text(current.coverageNum);
	    var time=$('<td></td>').text(current.updateDate==null||current.updateDate==undefined?'1970-01-01':FormatDate(current.updateDate));   //时间格式修改
	    if(index==3){
	    	if(current.user == "admin"){
		    	var operation=$('<td class="td-manage">'+
		    			/*'<a data-toggle="modal" data-target="#userpopermodal" class="btn btn-xs uploadtask" title="上传">'+
		        '<i class="fa fa-list-ul bigger-120"></i>上传</a>'+*/
	    		        '<a title="暂停"  class="btn btn-xs pusetask" value="0"><i class="fa fa-check   bigger-120"></i>暂停</a>'+
	    		        '<a title="停用"  class="btn btn-xs failtask" value="0"><i class="fa fa-check   bigger-120"></i>停用</a></td>');
	    	}else{
	    		var operation=$('<td class="td-manage">'+
	    				/*'<a data-toggle="modal" data-target="#popermodal" class="btn btn-xs uploadtask" title="上传">'+
		        '<i class="fa fa-list-ul bigger-120"></i>上传</a>'+*/
	    		        '<a title="暂停"  class="btn btn-xs pusetask" value="0"><i class="fa fa-check   bigger-120"></i>暂停</a>'+
	    		        '<a title="启用"  class="btn btn-xs failtask" value="0"><i class="fa fa-check   bigger-120"></i>启用</a></td>');
	    	}
	    	if(current.status==4||current.status==1){
	    		operation.find('a').css('color','#000');
	    		operation.find('a').attr("disabled","disabled");
	    		operation.find('a').first().removeAttr("data-toggle").removeAttr("data-target");
	    	}
		    //增加if判断，确定可执行操作样式
		    record.append(one,two,three,four,tagid,status,coverageNum,time,operation);
	    }else{
	    	record.append(one,two,three,four,tagid,status,coverageNum,time);
	    }
	    target.append('<tbody class="taskmanage"></tbody>').append(record);
	}
}

$(document).on('click',"tbody .td-manage .uploadtask",function(){
	if($(this).attr("disabled")!="disabled"){
		console.log($(this));
		var levelone = $(this).parent().parent().find("td").first().text();
		var leveltwo = $(this).parent().parent().find("td").eq(1).text();
		var levelthree = $(this).parent().parent().find("td").eq(2).text();
		var levelfour = $(this).parent().parent().find("td").eq(3).text();
		
		var id = $(this).parents('tr').find("td").eq(4).text();
		var tagType=1;
		if(levelone=="统计标签"){
			tagType=2;
		}else if(levelone=="挖掘标签"){
			tagType=3;
		}
		var data = {
				"tagId":parseInt(id),
				"type": parseInt(tagType)
		};
		$.ajax({
		    url:basePath+'/uploadJump',
		    type:'POST',
		    async:false,
		    data:JSON.stringify(data),
		    timeout:5000,    //超时时间
		    contentType:"application/json; charset=utf-8",
		    dataType:'json',
		    success:function(data){
		    	if(data.code==200&&data.data!=null){
		    		console.log(tagType+"0000000000");
		    		if(tagType==1){
		    			var meanings = data.data.meanings;
			    		var tagRules = data.data.tagRules;
			    		var tagId = data.data.ruleId;
			    		$("#meanings").val(meanings);
			    		$("#tagRules").val(tagRules);
		    		}else if(tagType==2 || tagType==3){
		    			var definiteconditions = data.data.definiteCondition;
		    			var groupMeaning = data.data.groupMeaning;
		    			var groupUSES = data.data.groupUSES;
		    			var validDate = data.data.validDate
			    		$("#definiteconditions").val(definiteconditions);
			    		$("#usermeanings").val(groupMeaning);
			    		$("#userpurpose").val(groupUSES);
			    		$("#validtime").val(validDate);
		    		}
		    	}else{
		    		popMessage(data.msg,'red');
		    	}
		    },
		    error:function(xhr){
		    	console.log('错误');
		    	popMessage('服务器错误','red');
		    }
		});
		if(tagType==1){
			$("#levelone").val(levelone);
			$("#leveltwo").val(leveltwo);
			$("#levelthree").val(levelthree);
			$("#levelfour").val(levelfour);
		} else if(tagType==2 || tagType ==3){
			$("#userlevelone").val(levelone);
			$("#userleveltwo").val(leveltwo);
		}
	}
});

//上传的执行
$(document).on('click',".execute",function(){
	
	 var formData = new FormData(document.getElementById("fileupload"));  
	 $.ajax({
		    url:basePath+'/upload4Task',
		    type:'POST',
		    async:false,
		    data:formData,
		    contentType: false,  
	        processData: false,  
		    success:function(data){
		    	if(data.code==200){
		    		popMessage(data.msg,'blue');
		    	}else{
		    		popMessage(data.msg,'red');
		    	}
		    },
		    error:function(xhr){
		    	console.log('错误');
		    	popMessage('服务器错误','red');
		    }
		});

});

//失败任务
$(document).on('click',"tbody .td-manage .failtask",function(){
	
	if($(this).attr("disabled")!="disabled"){
	 $(this).attr("disabled","disabled");
     $(this).css("color","#000");
     $(this).prevAll().attr("disabled","disabled");
     $(this).prevAll().css("color","#000");
     $(this).prev().prev().removeAttr("data-toggle").removeAttr("data-target");
     var table= $(this).parent().parent().find("td").eq(5);
     
     //修改后台状态
     var id = $(this).parents('tr').find("td").eq(4).text();
     var levelone = $(this).parent().parent().find("td").first().text();
     var type = 1;
     if(levelone =="统计标签"){
    	 type = 2;
     }else if(levelone =="挖掘标签"){
    	 type = 3;
     }
     var data = {
    		 "tagId":parseInt(id),
    		 "status":4,
    		 "type":parseInt(type)
     }
     $.ajax({
		    url:basePath+'/updateStatus',
		    type:'POST',
		    async:false,
		    data:JSON.stringify(data),
		    timeout:5000,    //超时时间
		    contentType:"application/json; charset=utf-8",
		    dataType:'json',
		    success:function(data){
		    	if(data.code==200){
		    		popMessage(data.msg,'blue');
		    		table.text("已失败");
		    	}else{
		    		popMessage(data.msg,'red');
		    	}
		    },
		    error:function(xhr){
		    	console.log('错误');
		    	popMessage('服务器错误','red');
		    }
		});
     
     
	}
});
//暂停任务
$(document).on('click',"tbody .td-manage .pusetask",function(){
	if($(this).attr("disabled")!="disabled"){
	var token =$(this).attr("value");
	var current = $(this);
	var status = 0;
    if(token ==0){
        status = 3;
    }
    if(token ==1){
        status = 2;
    }
	
  //修改后台状态
    var id = $(this).parents('tr').find("td").eq(4).text();
    var levelone = $(this).parent().parent().find("td").first().text();
    var type = 1;
    if(levelone =="统计标签"){
   	 type = 2;
    }else if(levelone =="挖掘标签"){
   	 type = 3;
    }
    var data = {
   		 "tagId":parseInt(id),
   		 "status":parseInt(status),
   		 "type":parseInt(type)
    }
    $.ajax({
		    url:basePath+'/updateStatus',
		    type:'POST',
		    async:false,
		    data:JSON.stringify(data),
		    timeout:5000,    //超时时间
		    contentType:"application/json; charset=utf-8",
		    dataType:'json',
		    success:function(data){
		    	if(data.code==200){
		    		 if(token ==0){
		    		        current.text("开启");
		    		        current.attr("value","1");
		    		        var table= current.parent().parent().find("td").eq(5);
		    		        table.text("已暂停");
		    		    }
		    		    if(token ==1){
		    		    	current.text("暂停");
		    		    	current.attr("value","0");
		    		        var table= current.parent().parent().find("td").eq(5);
		    		        table.text("申请中");
		    		    }
		    		    popMessage(data.msg,'blue');
		    	}else{
		    		popMessage(data.msg,'red');
		    	}
		    },
		    error:function(xhr){
		    	console.log('错误');
		    	popMessage('服务器错误','red');
		    }
		});
	
	}
});


//$("tbody .taskmanage").each(function(){
//	var status = $(this).find("#status");
//	console.log(status);
//	if(status == 2 || status ==3){
//		$(document).on('click','.pusetask',function(){
//	        var token =$(this).attr("value");
//	        if(token ==0){
//	            $(this).text("开启");
//	            $(this).attr("value","1");
//	            var table= $(this).parent().parent().find("td").eq(5);
//	            table.text("已暂停");
//	        }
//	        if(token ==1){
//	            $(this).text("暂停");
//	            $(this).attr("value","0");
//	            var table= $(this).parent().parent().find("td").eq(5);
//	            table.text("已开启");
//	        }
//	    });
//		
////		$(document).on('click','.failtask',function(){
////	        $(this).attr("disabled","disabled");
////	        $(this).css("color","#000");
////	        var table= $(this).parent().parent().find("td").eq(5);
////	        table.text("已失败");
////	    });
//
//	}else if(status ==1 || status ==4){
//	
//	}
//	});

/**时间格式**/    //long转string
function  FormatDate(strTime) {
        var date = new Date(strTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    }

/**yes_no 提醒**/  //提示框     确定/取消   执行func函数   id 函数入参  可改成多个
function remindMessage(message,func,id){
    $.confirm({
        title: '提示信息!',
        content:message,
        buttons: {
            sure: {
                text: '确认',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function(){
                	func(id);
                }
            },
            cancel: {
                text: '取消',
                keys: ['enter', 'shift'],
                action: function(){
                    console.log('取消');
                }
            },
        }
    });
}
/**消息提醒**/
//结果提醒窗  color为提示窗颜色
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
/***初始化，数据总览***/  //页面加载过程，显示图内容
/*function overview(){
	 $.ajax({
		    url:basePath+'/taskAnalyzeAll',
		    type:'POST',
		    async:false,
		    data:null,
		    timeout:5000,    //超时时间
		    contentType:"application/json; charset=utf-8",
		    dataType:'json',
		    success:function(data){
		    	if(data.code==200&&data.data!=null){
		    		initTaskInfo(data.data);
		    	}else{
		    		popMessage(data.msg,'red');
		    	}
		    },
		    error:function(xhr){
		    	console.log('错误');
		    	popMessage('服务器错误','red');
		    }
		});
}*/

/***点击左侧目录***/    //点击一级标签加载右侧图内容
/*function queryChartByfirst(req){
	 $.ajax({
		    url:basePath+'/taskAnalyze',
		    type:'POST',
		    async:true,
		    data:JSON.stringify(req),
		    contentType:"application/json; charset=utf-8",
		    dataType:'json',
		    success:function(data){
		    	if(data.code==200&&data.data!=null){
		    		initTaskInfo(data.data);
		    	}else{
		    		popMessage(data.msg,'red');
		    	}
		    },
		    error:function(xhr){
		    	$.fn.jqLoading("destroy");
		    	popMessage('服务器错误','red');
		    }
		});
}*/
//点击一级标签加载右侧表内容
function queryListByfirst(req,index){
	 var target=$('#User_centerIN').children('.current_table');
	 $.ajax({
		    url:basePath+'/taskList',
		    type:'POST',
		    async:true,
		    data:JSON.stringify(req),
		    contentType:"application/json; charset=utf-8",
		    dataType:'json',
		    success:function(data){
		    	if(data.code==200&&data.data!=null){
		    		//清空table
		    		target.find('tbody').remove();
		    		addRecord(target.find('table'),data.data,index);
		    		if(index == 0){
		    			$("#failtable").DataTable(obj);
		    		}else if(index == 1){
		    			$("#pusuetable").DataTable(obj);
		    		}else if(index == 2){
		    			$("#alltasktable").DataTable(obj);
		    		}else if(index == 3){
		    			$("#taskmanagetable").DataTable(obj);
		    		}
		    	}else{
		    		popMessage(data.msg,'red');
		    	}
		    	$.fn.jqLoading("destroy");
		    },
		    error:function(xhr){
		    	$.fn.jqLoading("destroy");
		    	popMessage('服务器错误','red');
		    }
		});
}
//获取所有任务列表
function queryAllList(req,index){
	 var target=$('#User_centerIN').children('.current_table');
	 $.ajax({
		    url:basePath+'/taskListAll',
		    type:'POST',
		    async:true,
		    data:JSON.stringify(req),
		    contentType:"application/json; charset=utf-8",
		    dataType:'json',
		    success:function(data){
		    	//$.fn.jqLoading("destroy");
		    	if(data.code==200&&data.data!=null){
		    		target.find('tbody').remove();
		    		addRecord(target.find('table'),data.data,index);
		    		if(index == 0){
		    			$("#failtable").DataTable(obj);
		    		}else if(index == 1){
		    			$("#pusuetable").DataTable(obj);
		    		}else if(index == 2){
		    			$("#alltasktable").DataTable(obj);
		    		}else if(index == 3){
		    			$("#taskmanagetable").DataTable(obj);
		    		}
		    	}else{
		    		popMessage(data.msg,'red');
		    	}
		    },
		    error:function(xhr){
		    	$.fn.jqLoading("destroy");
		    	popMessage('服务器错误','red');
		    }
		});
}

//加载数据 显示右侧图内容
/*function initTaskInfo(taskAnalyzeResult){
    /***************************上面的图表************************************/
	//初始化失败数据
	/*var fail =$('.label_wrap_left_failnum'); 
	fail.find('.fialnum_data_top .fialnum_data').text(taskAnalyzeResult.failureNum);
	fail.find('.fialnum_data_bottom .fialnum_data').text('时间:'+FormatDate(taskAnalyzeResult.date));  	
	//初始化暂停数据
	var pause=$('.label_wrap_left_pusuenum');
	pause.find('.fialnum_data_top .fialnum_data').text(taskAnalyzeResult.stopNum);
	pause.find('.fialnum_data_bottom .fialnum_data').text('时间:'+FormatDate(taskAnalyzeResult.date));  	
	//初始化右侧百分比图
	var myChart_buy = echarts.init(document.getElementById('mychart_left'));
	var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'right',
            y : 'center',
            data:['失败','暂停','申请中','已上线']
        },
        calculable : true,
        series : [
            {
                name:'所占比例',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {
                        value:taskAnalyzeResult.failureNum,
                        name:'失败',
                        itemStyle:{
                            normal:{
                                color:'#0068b5'
                            }
                        }
                    },
                    {
                        value:taskAnalyzeResult.stopNum,
                        name:'暂停',
                        itemStyle:{
                            normal:{
                                color:'#46be8a'
                            }
                        }
                    },
                    {
                        value:taskAnalyzeResult.applyNum,
                        name:'申请中',
                        itemStyle:{
                            normal:{
                                color:'#f48400'
                            }
                        }
                    },
                    {
                        value:taskAnalyzeResult.onlineNum,
                        name:'已上线',
                        itemStyle:{
                            normal:{
                                color:'#fd7375'
                            }
                        }
                    }
                ]
            }
        ]
    };
    myChart_buy.setOption(option);
}*/

/*******************************************************方法区**************************************/

/****页面初始化****/
$(document).ready( function(){
	var clientHeight = window.screen.height-190;
    var objectObj =  $(".con_gr");
    objectObj.css("height", clientHeight+'px');
	/*标签的文件上传*初始化fileinput控件（第一次初始化）*/
	$('#file-Portrait').fileinput({
	    language: 'zh', //设置语言
	    uploadUrl: "", //上传的地址
	    allowedFileExtensions : ['jar'],//接收的文件后缀
	    maxFileCount: 1,//文件的最大数目
	    enctype: 'multipart/form-data',
	    showCaption: true,//是否显示文本框
	    showUpload : false,//是否显示上传按钮
	    showRemove : true,//是否显示删除按钮
	    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",//文件的数量以及最大数值
	});
	/*群体的文件上传*初始化fileinput控件（第一次初始化）*/
	$('#userfile-Portrait').fileinput({
	    language: 'zh', //设置语言
	    uploadUrl: "", //上传的地址
	    allowedFileExtensions : ['jar'],//接收的文件后缀
	    maxFileCount: 1,//文件的最大数目
	    enctype: 'multipart/form-data',
	    showCaption: true,//是否显示文本框
	    showUpload : false,//是否显示上传按钮
	    showRemove : true,//是否显示删除按钮
	    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",//文件的数量以及最大数值
	});

    
    
    //Safari浏览器兼容
    if(baseMethod.whatBrowser()=="Safari"){
        console.log("Safari");
        var failnum  = $(".failnum_wrap_content_left_img");
        var pusuenum = $(".pusuenum_wrap_content_left_img");
        failnum.attr('class','failnum_wrap_content_left_img safari_failnum_wrap_content_left_img');
        pusuenum.attr('class','pusuenum_wrap_content_left_img safari_failnum_wrap_content_left_img');
        var fialnum_data_top = $(".fialnum_data");
        var safari_fialnum_data_top = $(".safari_fialnum_data_top");
        fialnum_data_top.attr("class","safari_fialnum_data_top fialnum_data");
        safari_fialnum_data_top.attr("class","safari_fialnum_data_top fialnum_data");
      }
    
    
    //刷新标签统计数据量
	//overview();
	//刷新标签列表内容
	var req=new Object();
    req.status = 4;
    var span_all=$('#User_centerIN .User_centerIN_top span');
    var current =$('#User_centerIN .current');
    var index=span_all.index(current);
    //$.fn.jqLoading({ height: 85, width: 240, text: "正在加载中，请耐心等待...." });
	//queryAllList(req,index);
});


//失败  暂停 全部 。。 导航点击事件
$('#User_centerIN .User_centerIN_top span').click(function(){
	$(this).addClass('current').css("color", "#000").css("border-bottom", "2px solid #f48400");
	$(this).siblings().removeClass('current').css("border-bottom", "1px solid rgb(211,211,211)").css("color", "gray");
	var index=$('#User_centerIN .User_centerIN_top span').index($(this));
	var show_all=$('#User_centerIN').children('div').not('.User_centerIN_top');
	show_all.eq(index).find('tbody').children().remove();   //index 为点击数组下标 0~3  清除表内数据
	//根据index判断，然后填充数据   
	/**
	 * 
	 * 
	 * 
	 * 
	 */
	show_all.eq(index).addClass('current_table').show();
	show_all.not(show_all.eq(index)).removeClass('current_table').hide();
});

//点击左侧树事件
/**************************点击4级出现5级标签************************************/
$(document).on('click',".four .four_div",function() {
    $(".firstGr").attr("style","background: #435569");
    $(".secondGr").attr("style","background: #435569");
    $(".we .we_div").attr("style","background: #435569");
    $(".four .four_div").attr("style","background: #435569");
    $(this).attr("style","background:#2fa4ff!important");    	//得到当前4级的3级的display
    
});
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
    }
      
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
/**************************点击1级出现2级标签************************************/
$(document).on('click',".firstGr",function(){
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
		NOB.slideDown(500);
        NOB.find(".secondGr").attr("style","background: #435569");
	}else{
				//关闭2级标签
	    NOB.slideUp(500);
        NOB.find(".secondGr").attr("style","background: #435569");
	}
	//$.fn.jqLoading({ height: 85, width: 240, text: "正在加载中，请耐心等待...." });
	//flag = 1;
    //背景
    //$(this).attr("style","background:#435569!important").parent().siblings().find(".firstGr").attr("style","background: #363d42");
    //文字
    //$(this).find("span").eq(1).attr('style','color:rgb(0, 104, 181)');
    //$(".left_gr .firstGr").not($(this)).find('span').attr('style','color:#666');
    //图片
    //$(this).find('img').attr('src',basePath+'/res/image/systemlabel_active.png');
    //$(".left_gr .firstGr").not($(this)).find('img').attr('src',basePath+'/res/image/nav/nav_labelsystem.png');
    //req.tagtype=$(this).next().text();
    //req.tagName=$(this).find('span[title]').text();
    //req.tagId=$(this).find('span[title]').attr('value');
    //setReqAndIndex();
    //queryChartByfirst(req);
    //queryListByfirst(req,index);
});


//点击任务标签列表
$(document).on('click',".status",function(){
	//$.fn.jqLoading({ height: 85, width: 240, text: "正在加载中，请耐心等待...." });
	if(flag == 0){
		setReqAndIndex();
	    queryAllList(req,index);
	}else if(flag == 1){
		setReqAndIndex();
	    queryListByfirst(req,index);
	}
	
});

function setReqAndIndex(){
	var span_all=$('#User_centerIN .User_centerIN_top span');
	var current =$('#User_centerIN .current');
	index=span_all.index(current);
	if(index==0){
	  req.status=4;
	}else if(index==1){
	  req.status=3;
	}else{
	  req.status=0;
	}
}

