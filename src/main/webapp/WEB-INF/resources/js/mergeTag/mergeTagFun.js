    var objectObj =  document.getElementById("User_centerIN");
	objectObj.style.marginBottom = "20px";
	 //格式化日期
    function FormatDate (strTime) {
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

var usergroup = {
	addPageInfo:function(pageinfo){
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
	},
	addTableRecord : function(records) {
		var tablebody = $('.cover_style .table-text-center').find('tbody');
		tablebody.children().remove();
		// 加载table数据
		for (var i = 0; i < records.length; i++) {
			var current = records[i];
		    var record=$('<tr></tr>').attr('value',current.id);
		    var name=$('<td></td>').text(current.name);
		    var status=$('<td></td>').text(usergroup.userGroupState(current.status));
		    var number=$('<td></td>').text(current.userNum==null||current.userNum==undefined?0:current.userNum);
		    var department=$('<td></td>').text(current.department==null||current.department==undefined?'保密':current.department);
		    var founder=$('<td></td>').text(current.originator==null||current.originator==undefined?'保密':current.originator);
		    var time=$('<td></td>').text(current.gmtCreate==null||current.gmtCreate==undefined?'1970-01-01 00:00:00':FormatDate(current.gmtCreate));   //时间格式修改
		    var operation=$('<td class="td-manage">'
		    		//TODO 画像列表部分入口
		    		        +'<span class="openStop"><img src="../../image/user_open.png" alt="" style="width: 20px;height: 11px;margin-right: 5px;margin-left: 10px;"></span>'
                            +'<span class="combinEdit"><img src="../../image/user_edit.png" alt=""></span>'
                            +'<span class="btn btn-xs del"><img src="../../image/55.png" alt=""></span>'
		    		        +'</td>');
		    if(current.status!=1){
		    	del.addClass('delete_ug');
		    }else{
		    	del.attr('disabled',"disabled");
		    	del.css('color','#000');
		    }
		    operation.append(dele);/**/
		    record.append(name,status,number,department,founder,time,operation);
			tablebody.append(record);
		}
	},
	
	userGroupState:function(state){
		if(state == 1){
		 return	'已上线'	;
		}else if(state == 2){
		return	'申请中'	;
		}else if(state == 3){
		return	'开发完成' ;
		}else if(state == 4){
		return '已下线' ;
		}else{
		return '未定义' ;
		}		
	}
}