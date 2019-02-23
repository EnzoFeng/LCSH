if($(".table_wrap").height() < 330){
	$(".table_wrap").css("height","330px");
}
  function queryUGList(curpage,pageSize){
    	 var req=new Object();
    	 var state=$('.User_radio .User_radio_j input').prop('checked');
         req.state=state?1:0;
         req.curPage=curpage;
         pageSize=10;
         req.pageSize=pageSize;
         $.ajax({
			    url:basePath+'/userGroup/queryList',
			    type:'POST',
			    async:false,
			    data:JSON.stringify(req),
			    timeout:5000,    //超时时间
			    contentType:"application/json; charset=utf-8",
			    dataType:'json',
			    success:function(data){
			    	if(data.code==200&&data.data!=null){
			    		var result=data.data;
			    		usergroup.addTableRecord(result.userGroupBeanList);
			    		usergroup.addPageInfo(result.pageBean);
			    		
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
      $.ajax({
		    url:basePath+'/userGroup/fuzzyQueryByPage',
		    type:'POST',
		    async:false,
		    data:JSON.stringify(req),
		    timeout:5000,    //超时时间
		    contentType:"application/json; charset=utf-8",
		    dataType:'json',
		    success:function(data){
		    	if(data.code==200&&data.data!=null){
		    		var result=data.data;
		    		usergroup.addTableRecord(result.userGroupBeanList);
		    		usergroup.addPageInfo(result.pageBean);
		    	}else{
		    		popMessage(data.msg);
		    	}
		    },
		    error:function(xhr){
		    	popMessage('服务器错误')
		    	console.log('错误');
		    }
		});
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
  
  function isDel(ug_id){
	   	$.confirm({
	           title: '提示信息',
	           content: '是否删除？',
	           buttons: {
	               formSubmit: {
	                   text: '删除',
	                   btnClass: 'btn-blue',
	                   action: function () {
	                       	var req=new Object();
	                        req.userGroupId=ug_id.attr("value");
	                       	$.ajax({
	                		    url:basePath+'/userGroup/delUserGroup',
	                		    type:'POST',
	                		    async:false,
	                		    data:JSON.stringify(req),
	                		    timeout:5000,    //超时时间
	                		    contentType:"application/json; charset=utf-8",
	                		    dataType:'json',
	                		    success:function(data){
	                             if(data.code==200){
	                            	 ug_id.remove();
	                		      }
	                		    	popMessage(data.msg);
	                		    },
	                		    error:function(xhr){
	                		    	popMessage('服务器错误');
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

    /**导航切换**/
    $(document).ready(function() {
      //列表
          //queryUGList(1,null);
         /**首页**/
        $('#home_page').click(function(){
        	if(''==$('#query').val()){
        		 queryUGList(1,null);  
  		   }else{
  			   vagueQueryUGList(1,null);
  		   }
        });
        
        /**尾页**/
        $('#end_page').click(function(){
        	var tot=parseInt($('#tota').text());
        	if(''==$('#query').val()){
       		 queryUGList(tot,null);  
 		   }else{
 			 vagueQueryUGList(tot,null);
 		   }
        });
        /**跳页**/
        $('#search_page').click(function(){
        	var sear=$('#sample-table_info').find('input').val();
        	searchPage(sear);
        });
        /**是否有效**/
        $(".User_radio .User_radio1").change(function (){
        	queryUGList(1,null);
        });
        /**组合标签模糊搜索**/
        $('.User_radio_sosuo .Userl_radio6').click(function(){
        	vagueQuery();
        });
        
        /**组合标签模糊搜索**/
        $('#query').blur(function(){
        	vagueQuery();
        });
       
        
     
        /**组合标签数据删除**/
        $(document).on('click','.delete_ug',function(){
        	var ug_id=$(this).parents('tr');
        	isDel(ug_id);
       });
        //列表数据编辑
        $(document).on('click','.combinEdit',function(){
        	window.location.href=basePath+'/userGroup/createStatisticsUserGroup';
        })
        /**组合标签数据启用禁用**/
        $(document).on('click','.openStop',function(){
        	popMessage("执行成功！");
       });
    });