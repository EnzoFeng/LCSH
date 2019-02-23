	$(document).ready(function(){
		
		$("#navbar").load(basePath+"/model/header.html",'',function(){
			$('#labelsystem').addClass('active');
		});
		 //发送异步请求
		$.ajax({
		    url:'/tag/querymerge',
		    type:'POST',
		    async:false,
		    data:{},
		    timeout:5000,    //超时时间
		    contentType:"application/json; charset=utf-8",
		    dataType:'json',
		    success:function(data){
		    	if(data.code==200&&data.data!=null){
		    		var result=data.data;
		    			for(var i=0; i<result.length;i++){
		    				$("#tagId").append("<option value="+result[i].id+">"+result[i].name+"</option>");
		    			}
			        	
			        }
		    	
		    },
		    error:function(xhr){
		    	console.log('错误');
		    }
		});
		
		
//		$("#tagId").change(function () {
//			
//			var options = $("#test option:selected");
//			$("#tagId").val();
//			
//			});
//		})
		
		
		
		
	});

	//添加组合标签
	function createbtn(){
        var labelName = $("#labelName");
        var meanings = $("#meanings");
        if(labelName.val()=="" || meanings.val()==""){
        	reminder("信息填写不完整!");
        }else{
        	var name = $("#labelName").val();
        	var pId = $("#tagId").val();
    		var tagIds = $("#form").text();
    		
    		var tagIdArray = new Array();
    		
    		for(var i=0; i<tagIds;i++){
    			var tag = new Object();
    			tag.pId = $("body").find(".pId").eq(i).text();
    			tag.cId = $("body").find(".cId").eq(i).text();
    			tag.pLevel = $("body").find(".pLevel").eq(i).text();
    			
    			tagIdArray[i]=tag;
    		}
    		
    		
    		var meanings = $("#meanings").val();
    		var data = {"name":name,"level":3,"sign":2,"meanings":meanings,"pId":parseInt(pId),"tagIds":tagIdArray};
    		console.log(data);
    		$.ajax({
                  type: "POST",
                  url: basePath+"/addTag",
                  dataType:"json",
                  data: JSON.stringify(data,null,2),
                  contentType:"application/json",
                  success: function(data){
                	   if(data.code == 200){
                		   reminder("添加成功！");
                           window.location.href = basePath+"/mge";
                	   }else{
                		   reminder(data.msg);
                	   }
                	   
                  },
                  error: function() {
                	  alert("系统错误");
                	    }

               });
		}  
       
	}
	
	
	function reminder(msg){
		
		$.confirm({
            title: '提示信息',
            closeIcon: true,
            boxWidth: '30%',
            useBootstrap: false,
            type: 'blue',
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

