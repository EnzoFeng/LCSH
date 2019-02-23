$("#createonetype").click(function(){
	var levelOneName = $("#levelOneName").val(),
	levelTwoName = $("#levelTwoName").val(),
	levelThreeName = $("#levelThreeName").val();
	name = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
	var tagArr = new Array();
	if(levelOneName != null){
		var tag = new Object();
		tag.level=1;
		tag.name=levelOneName;
		tagArr[0]=tag;
	}
	if(levelTwoName != null){
		var tag = new Object();
		tag.level=2;
		tag.name=levelTwoName;
		tagArr[0]=tag;
	}
	if(levelThreeName != null){
		var tag = new Object();
		tag.level=3;
		tag.name=levelThreeName;
		tagArr[0]=tag;
	}
	$.ajax({
      	type: "POST",
      	url: "",
      	dataType:"json",
      	data: JSON.stringify(tagArr),
      	contentType:"application/json",
     	success: function(data){
     		if(data.code=10001){
	     		bounced("添加成功！","blue");
			   	$("#oneModal").modal("hide");
	    	   	location.reload(); 
	    	   	$("#oneModal input[type='text']").val("");
	    	   	console.log($(".left_gr").last());
	    	   	console.log($(".firstGr").nextAll().last());
	    	   	$(".firstGr").nextAll().last().click();
     		} else {
     			bounced(data.msg,"red");
     			//alert(data.msg);
     		}
     	},
     	error: function(err){
     		bounced("系统错误！","red");
  			$("#oneModal input[type='text']").val("");
     	}
     });
//		var levelOneName = $("#levelOneName").val(),
//			levelTwoName = $("#levelTwoName").val(),
//			levelThreeName = $("#levelThreeName").val(),
//			name = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
//			data = {"oneName":levelOneName,"level":1,"sign":1};
//			console.log(levelOneName)
//		if(levelOneName == ""){
//			bounced("一级标签名称不能为空！","red");
//			$("#oneModal input[type='text']").val("");
//		}else{
//			if(levelTwoName == ""){
//				if(levelThreeName != ""){
//					bounced("二级标签名称不能为空！","red");
//					$("#oneModal input[type='text']").val("");
//				}
//			}
//			if(name.test(levelOneName)  && (name.test(levelTwoName) || levelTwoName == "") && (name.test(levelThreeName) || levelThreeName == "") ){
//				$.ajax({
//	              	type: "POST",
//	              	url: basePath+"/addMainBasicTag",
//	              	dataType:"json",
//	              	data: JSON.stringify(data,null,2),
//	              	contentType:"application/json",
//	             	success: function(data){
//	            	    if(data.code == 200){
//	            		   	bounced("添加成功！","blue");
//	            		   	$("#oneModal").modal("hide");
//	                	   	location.reload(); 
//	                	   	$("#oneModal input[type='text']").val("");
//	                	   	console.log($(".left_gr").last());
//	//                	   	console.log($(".firstGr").nextAll().last());
//	//                	   	$(".firstGr").nextAll().last().click();
//	            	    }else{
//	            		   	bounced(data.msg,"red");
//	            	   }
//	              	},
//			  	  	error: function(){
//			  			bounced("系统错误！","red");
//			  			$("#oneModal input[type='text']").val("");
//			  	  	}
//	           	});
//
//			}else{
//				bounced("标签名称为数字，字母，汉字，下划线，横杠！","red");
//				$("#oneModal input[type='text']").val("");
//			}				
//		}
		
	});
$(document).ready(function () {

	$("#createtwotype").click(function(){
		var levelTwoName = $("#levelTwoName").val();
		var dataTypeId = $("#dataTypeId").val();
		var pId = $(".label_cont_top_l").attr("value");
		var sign = $(".label_cont_top_l").next().text();
		var data = {"name":levelTwoName,"level":2,"sign":sign,"dataTypeId":dataTypeId,"pId":pId};
		if(levelTwoName == ""){
			bounced("标签名称不能为空！","red");
		}else if(dataTypeId == ""){
			bounced("数据类型不能为空！","red");
		}else{
		  $.ajax({
              type: "POST",
              url: basePath+"/addTag",
              dataType:"json",
              data: JSON.stringify(data,null,2),
              contentType:"application/json",
              success: function(data){
            	   if(data.code == 200){
            		   bounced("添加成功！","blue");
            		   $("#twoModal").modal("hide");
                	   location.reload(); 
            	   }else{
            		   bounced(data.msg,"red");
            	   }
            	  
              },
		  	  error: function(){
		  		bounced("系统错误！","red");
		  	  }
           });
		}
	})
	
	
	$("#createbasetype").click(function(){
		var levelThreeName = $("#levelThreeName").val();
		var meanings = $("#threeMeanings").val();
		var pId = $(".label_cont_buttom_conl_click").attr("value");
		var rules = $("#threeLabelRules").val();
		var data = {"name":levelThreeName,"level":3,"sign":1,"meanings":meanings,"pId":parseInt(pId),"tagRules":rules};
		console.log(data);
		if(levelThreeName == ""){
			bounced("标签名称不能为空","red");
		}else if(meanings == ""){
			bounced("业务含义不能为空","red");
		}else if(rules == ""){
			bounced("标签规则不能为空","red");
		}else{
			$.ajax({
	              type: "POST",
	              url: basePath+"/addTag",
	              dataType:"json",
	              data: JSON.stringify(data,null,2),
	              contentType:"application/json",
	              success: function(data){
	            	   if(data.code == 200){
	            		   bounced("添加成功","blue");
	            		   $("#baseModal").modal("hide");
		            	   location.reload(); 
	            	   }else{
	            		   bounced(data.msg,"red");
	            	   }
	            	  
	              },
			  	  error: function(){
			  		bounced("系统错误","red");
			  	  }
	           });
		}
	})
	
	
	
});

function  bounced(msg,color){
	 $.confirm({
         title: '提示信息',
         closeIcon: true,
         boxWidth: '30%',
         useBootstrap: false,
         type: color,
         typeAnimated: true,
         content: msg,
         buttons: {
             somethingElse: {
                 text: '确定',
                 btnClass: 'btn-blue',
                 keys: ['enter']
             }
         }
     });
}