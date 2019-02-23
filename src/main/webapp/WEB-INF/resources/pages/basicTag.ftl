<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!--S logo-->
    <link rel="icon" href="${basePath}/res/imgs/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="${basePath}/res/imgs/favicon.ico" type="image/x-icon">
    <!--E logo-->
    <title>标签管理系统</title>
    <meta name="keywords" content="大数据，用户标签管理系统">
    <meta name="description" content="">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <!--优先使用 IE 最新版本和 Chrome -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <!--忽略数字自动识别为电话号码 -->
    <meta name="format-detection" content="telephone=no"/>
    <!--忽略识别邮箱 -->
    <meta name="format-detection" content="email=no"/>
    <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
    <meta name="HandheldFriendly" content="true"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/res/lib/bootstrap3/css/bootstrap.css"/>
    <link href="${basePath}/res/lib/bootstrap3/css/bootstrap-table.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" type="text/css" href="${basePath}/res/commons/css/base.css"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/res/css/basicTag.css"/>
    <link rel="stylesheet" href="${basePath}/res/lib/jquery-confirm.min.css">
    <script src="${basePath}/res/lib/jquery1/jquery.min.js"></script>
    <script type="text/javascript" src="${basePath}/res/lib/jquery.validate.js"></script>
    <script src="${basePath}/res/lib/localization/messages_zh.js" charset="utf-8"></script>
    <script type="text/javascript" src="${basePath}/res/lib/echarts/echarts.min.js"></script>
    <script src="${basePath}/res/lib/bootstrap3/js/bootstrap-table.js" type="text/javascript"></script>
    <script src="${basePath}/res/lib/bootstrap3/js/bootstrap-table-zh-CN.js" charset="UTF-8" type="text/javascript"></script>
<style>
.Userl_radio6{
    background: #fff url(${basePath}/res/imgs/search.png) no-repeat center center;
}
</style>
<style>
.shu_name_img{
    background: url('${basePath}/res/imgs/hebing.png') no-repeat;
}
</style>
<style>
.outlogin{
    background: url('${basePath}/res/imgs/outlogin.png') no-repeat 20px center;
}

</style>
<style>
.gender2 {
    background: #f5f5f5 url(${basePath}/res/imgs/samllsj.png) no-repeat 0px;
}
</style>
</head>
<body>
<div class="container">
	
    <%-- <nav class="navbar navbar-default navbar-fixed-top g_row">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    <img src="${basePath}/res/imgs/logo.png" style="width:32px;margin-top:-6px;"/>
                    <span style="display:inline-block;">标签管理系统</span>
                </a>
            </div>
           <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav nav_b_text">
                   <li ${(navigation??&&navigation='tagmanager')?string("class=active","")} class="active"><a href="${basePath}/mge">基础标签</a></li>
                   <li ${(navigation??&&navigation='statisticstag ')?string("class=active","")}><a href="${basePath}/mergeTag/queryMergeTag">组合标签</a></li>
                   <li ${(navigation??&&navigation='microportrait')?string("class=active","")}><a href="${basePath}/micro">微观画像</a></li>
                   <li ${(navigation??&&navigation='tagquery')?string("class=active","")}><a href="${basePath}/tagquery">标签查询</a></li>
                   <li ${(navigation??&&navigation='appmanagement')?string("class=active","")}><a href="${basePath}/appmanage">审核管理</a></li>
                   <li ${(navigation??&&navigation='labeltask')?string("class=active","")}><a href="${basePath}/task/">标签任务</a></li>
                   <li ${(navigation??&&navigation='system')?string("class=active","")}><a href="${basePath}/systemSet">系统设置</a></li>
                   <li class="outlogin" >
                    <a class="outlogin_a" href="${basePath}/quit">
                        <span class="outlogin_exit">退出</span>
                    </a>
                   </li>
               </ul>
           </div>
       </div>
    </nav>  --%>
    <#include "./model/header.ftl"/>  
    <div class="centent clearfix">
        <div class="cont_left_label">
            <!--S 左侧的一级标签-->
            <!--S 新增一级分类-->
            <div class="leftNav">
                <!--S 左侧的动态的添加的树状列表-->
                <div class="con_gr">
                  <div id="leftList" class="left_gr" >
                        <span class="set" data-toggle="modal" data-target="#setModal"><img src="${basePath}/res/imgs/set.png" alt="" style="width: 16px;height: 16px;margin-right: 5px;margin-left: 10px;margin-top: 0px;position: absolute;right: 12px;top:10px;display: block;"></span>
                        <#list basicTagList as levelOne>
	                        <div class="firstGr" style="transition: 0.5s;position: relative;">
	                            <img src="${basePath}/res/imgs/nav_labelsystem.png">
	                            <span value=${levelOne.id} title=${levelOne.name}>${levelOne.name}</span>
	                        </div>
	                        <#list levelOne.subTags as levelTwo>
	                        <div style="display:block;" class="zi">
		                        <div class="secondGr" style="background: #435569;"><span class="second_img active" style="background:url(${basePath}/res/imgs/u62.png) no-repeat 0 10px !important;" value=${levelTwo.id} title=${levelTwo.name}>${levelTwo.name}</span>
		                        </div>
	                            <div style="display:block;" class="secondzi">
	                             <#list levelTwo.subTags as levelThree>
	                              <div  style="display:block;" class="we">
	                                <div class="we_div" style="background: #2fa4ff;"><span
	                                        class="we_div_span" value="${levelThree.id}" title=${levelThree.name} style="background:url(${basePath}/res/imgs/u62.png) no-repeat 0 10px !important;">${levelThree.name}</span></div>
	                              </div>
		                             <#list levelThree.subTags as levelFourth>
		                              <div style="display:block;" class="four">
		                                <div class="four_div" style="background: #435569;"><span class="four_div_span" value=${levelFourth.id} title=${levelFourth.name}>${levelFourth.name}</span></div>
		                              </div>
		                              </#list>
	                              </#list>
	                            </div>
	                            <div  style="display:block;" class="we"></div> 
	                         </div>
	                         </#list>
                         </#list>
                        <span hidden="">${var1.tagType}</span>
                  </div>
                  <div style="display:block;" class="zi"></div>
                  <span hidden="">${var1.tagType}</span>
                </div>
                <div class="add_tab" data-toggle="modal" data-target="#oneModal">
                    <div class="add_tab_n"><img src="${basePath}/res/imgs/addlabel.png"><span>新建主分类标签</span></div>
                </div>
            </div>
                <!--E 左侧的动态的添加的树状列表-->
            <script>
            //加载左侧列表
            $(document).ready(function () {
            	//获取左侧列表
            	function getLeftList(){
            		var result = {
            				data:[
            					{
            						id:"1",
            						name:"A",
            						subTags:[
            							{
            								id:"2",
                    						name:"A-1",
                    						subTags:[
                    							{
                    								id:"3",
                        							name:"A-1-1"
                        						}
                    						]
            							},{
            								id:"4",
                    						name:"A-2",
                    						subTags:[
                    							{
	                    							id:"5",
	                        						name:"A-2-1"
                    							}
                    						]
            							}
            						]
            					}
            				]
            		};
            		/* $.ajax({  
                        type:'get',  
                        url:"${basePath}/basicTag/queryBasicTagForPid",
                        dataType:"json",  
                        async: false,
                        success:function(data){
                        	result = data;
                        }  
                	}); */
            		return result;
            	}
            	
            	
            	/* 
            	<div class="secondGr" style="background: #435569;"><span class="second_img active" style="background:url(${basePath}/res/imgs/u62.png) no-repeat 0 10px !important;" value=${var2.id} title=${var2.name}>中信银行</span>
                </div>
                <div style="display:block;" class="secondzi">
                  <div  style="display:block;" class="we">
                    <div class="we_div" style="background: #2fa4ff;"><span
                            class="we_div_span" value="${var3.id}" title=${var3.name} style="background:url(${basePath}/res/imgs/u62.png) no-repeat 0 10px !important;">社保数据</span></div>
                  </div>
                  <div style="display:block;" class="four">
                    <div class="four_div" style="background: #435569;"><span class="four_div_span" value=${var2.id} title=${var2.name}>近1-3个月社保</span></div>
                    <div class="four_div" style="background: #435569;"><span class="four_div_span" value=${var2.id} title=${var2.name}>近4-5个月社保</span></div>
                  </div>
                </div> */
            	
            	
            	var leftHtml = '';
            	var leftList = getLeftList();
            	var levelOneList = leftList.data;
            	for(var i = 0; i < levelOneList.length; i++) {
            		var levelOne = levelOneList[i];
            		var levelOneId = levelOne.id;
            		var levelOneName = levelOne.name;
            		leftHtml += '<div class="secondGr" style="background: #435569;"><span class="second_img active" style="background:url(${basePath}/res/imgs/u62.png) no-repeat 0 10px !important;" value='+levelOneId+' title= '+levelOneName+'>'+levelOneName+'</span></div>';
            		var levelTwoList = levelOne.subTags;
            		
            		if(null != levelTwoList) {
            			for(var j = 0; j < levelTwoList.length; j++) {
            				leftHtml += '<div style="display:block;" class="secondzi">';
                			leftHtml += '<div  style="display:block;" class="we">';
                			var levelTwo = levelTwoList[j];
                			var levelTwoId = levelTwo.id;
                			var levelTwoName = levelTwo.name;
                			leftHtml += '<div class="we_div" style="background: #2fa4ff;"><span class="we_div_span" value='+levelTwoId+' title= '+levelTwoName+' style="background:url(${basePath}/res/imgs/u62.png) no-repeat 0 10px !important;">'+levelTwoName+'</span></div>';
                			var levelThreeList = levelTwo.subTags;
                			
                			if(null != levelThreeList) {
            					leftHtml += '<div style="display:block;" class="four">';
                				for(var k = 0; k < levelThreeList.length; k++) {
                    				var levelThree = levelThreeList[k];
                        			var levelThreeId = levelThree.id;
                        			var levelThreeName = levelThree.name;
                        			leftHtml+='<div class="four_div" style="background: #435569;"><span class="four_div_span" value='+levelThreeId+' title='+levelThreeName+'>'+levelThreeName+'</span></div>';
                    			}
                				leftHtml += '</div>';
                			}
                			
                			leftHtml += '</div>';
                			leftHtml += '</div>';
                		}
            		}
            		
            		leftHtml += '</div>';
            	}
            	//console.log(leftHtml);
            	//document.getElementById('leftList').insertAdjacentHTML('afterBegin',leftHtml);
            });
            </script>
        </div>
               <section><!-- 模态框（Modal） -->
              <div class="modal fade" id="setModal" tabindex="-1" role="dialog"
                   aria-labelledby="setModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                  ×
                              </button>
                              <h4 class="modal-title" id="twoModalLabel">
                                  操作主分类标签
                              </h4>
                          </div>
                          <div class="modal-body" style="height:430px;overflow:auto;">
                            <table class="table table-striped table-bordered table-hover table-text-center" id="tb_powerset">
                                
                            </table>
                          </div>

                          <div class="modal-footer" style="text-align:center;">
                              <button type="button" class="btn btn-default" data-dismiss="modal">
                                  关闭
                              </button>
                              
                          </div>
                      </div><!-- /.modal-content -->
                  </div><!-- /.modal -->
                  <script>
                      $(document).ready(function () {
                        $('#tb_powerset').treegridData({
                            id: 'Id',
                            parentColumn: 'ParentId',
                            type: "POST", //请求数据的ajax类型
                            url: '../../data.json',   //请求数据的ajax的url
                            ajaxParams: {}, //请求数据的ajax的data属性
                            expandColumn: null,//在哪一列上面显示展开按钮
                            striped: true,   //是否各行渐变色
                            bordered: true,  //是否显示边框
                            expandAll: false,  //是否全部展开
                            columns: [
                                {
                                    title: '标签名称',
                                    field: 'Name'
                                },
                                {
                                    title: '操作',
                                    field: ''
                                }
                            ]
                        });
                    });
                  </script>
              </div>
            </section>
            <!--E 左侧的一级标签-->
        <section><!-- 模态框（Modal） -->
              <div class="modal fade" id="maineditModal" tabindex="-1" role="dialog"
                   aria-labelledby="editModalLabel" aria-hidden="true" style="z-index: 1053;">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                  ×
                              </button>
                              <h4 class="modal-title" id="twoModalLabel">
                                  编辑主分类标签
                              </h4>
                          </div>
                          <div class="modal-body">
                            <span class="typename_span">标签名称：</span>
                            <input type="text" maxlength="10"  id="labelName" placeholder="最多可输入10个字符" class="form-control typename_input">
                          </div>

                          <div class="modal-footer" style="text-align:center;">
                            <button id="sureeditlabel" type="button" class="btn btn-primary">
                              确定
                            </button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">
                              关闭
                            </button>
                              
                          </div>
                      </div><!-- /.modal-content -->
                  </div><!-- /.modal -->
                  <script>
                      $("#sureeditlabel").on('click', function (e) {
                          $("#maineditModal").modal("hide");
                      });
                  </script>
              </div>
            </section>
        <!--S cont_right_label-->
        <div class="cont_right_label" style="margin-left: 195px; width: 85%; ">
            <!--S 导航-->
            <div class="label_nav">
                <img src="${basePath}/res/imgs/home.png" style="margin-left:12px;margin-top: -5px;"/>
                <span class="label_nav_sp2">您当前的位置：</span>
                <a href="javacript:void(0);" class="label_nav_sp1">首页</a>
                <span class="label_nav_sp2">></span>
                <a href="javascript:void(0);" class="label_nav_sp3">基础标签</a>
            </div>
            <!--E 导航-->
            <div class="small_nav">
              <div class="label_radio clearfix">
                  <div class="label_radio_j">
                      <input class="label_radio1" type="checkbox" checked="checked">
                      <span class="label_radio2">仅显有效</span>
                  </div>
                  <div class="User_radio_sosuo">
                    <input class="User_input" type="text" name="" id="query" value="" placeholder="请输入关键词检索"/>
                    <span class="Userl_radio6"></span>
                </div>
              </div>
            </div>

            <div class="label_cont">
                <div class="label_cont_top clearfix">
                    <!--S 导航的二级标签-->
                    <div class="nav_second" style="float: left;">
                      <span class="label_cont_top_l label_cont_top_l1" value=${oneLevel[0].id} title=${oneLevel[0].name}>金融行业</span>
                      <span class="label_nav_sp2">></span>
                      <span class="label_cont_top_l label_cont_top_l2" value=${oneLevel[0].id} title=${oneLevel[0].name}>中信银行</span>
                      <span class="label_nav_sp2">></span>
                      <span class="label_cont_top_l label_cont_top_l3" value=${oneLevel[0].id} title=${oneLevel[0].name}>社保数据</span>
                    </div>
                      
                    <!--E 导航的二级标签-->
                    <div class="label_cont_top_r">
                        <div  id="four" style="display:block;float: left;"  class="add_tab_n2a">
                              <span class="add_tab_n2a_span">
                                      <img class="name_dele" src="${basePath}/res/imgs/addlabel.png">
                              </span>
                              <span class="add_tab_n2" data-toggle="modal" data-target="#childrenModal">新建业务标签</span>
                        </div>
                        <div  id="five" style="display:none;float: left;"  class="add_tab_n2a">
	                          <span class="add_tab_n2a_span">
	                                  <img class="name_dele" src="${basePath}/res/imgs/addlabel.png"> 
	                          </span>
	                          <span class="add_tab_n2" data-toggle="modal" data-target="#smallchildrenModal">新建属性标签</span>
                        </div>
                    <!-- <input readonly type="text" id="" value="已选择0基础标签"> -->
                    </div>
                </div>
                <div>
                    <!--S 新建二级分类-->
                    <div class="label_cont_buttomadd">
                        <!--S 标签-->
                        <div class="drop_down clearfix">
                            <div class="drop_downRight">
                              <div style="display:inline-block" class="year clearfix">
                                <!--S 3级标签-->
                                <div class="year0"><span class="shu_name" value=${var5.id} title=${var5.name}>近1-3个月社保</span></div>
                                <div class="gender2"></div>
                                <div class="gender3 clearfix">
                                    <div class="gender3_1">
                                        <div style="display:none;" class="gender3_1top shu_name"></div>
                                        <div class="gender3_1buttom"><span class="shangxian">已上线
                                        </span><span><img
                                                src="${basePath}/res/imgs/refesh.png"></span> <span>每月更新</span></div>
                                    </div>
                                    <div class="gender3_2"><span><img
                                            src="${basePath}/res/imgs/worn.png"></span><span>每年零时更新......</span></div>
                                    <div class="gender3_3">
                                        <span><!-- <img src="../../image/labelsystem/huan.png"> --><div id="chart" style="width: 40px;height: 40px;display: inline-block;"></div><span style="display: inline-block;width: 128px;">&nbsp;&nbsp;统计：84.09%</span></span>
                                    </div>
                                    <div class="gender3_4">
                                      <span class="open_stop"
                                            style="cursor:pointer;" level="3"><img src="${basePath}/res/imgs/user_open.png" style="width: 17px;"></span>
                                      <span class="fourEdit"
                                            style="cursor:pointer;" level="3"><img src="${basePath}/res/imgs/user_edit.png" style="width: 14px;" data-toggle="modal" data-target="#childrenModal"></span>
                                      <span class="commondel"
                                            style="cursor:pointer;" level="3"><img src="${basePath}/res/imgs/55.png"></span></div>
                                </div>
                                <div class="gender_in" style="display:block">
                                  <div class="gender4">
                                    <div class="gender2_right">
                                      <div class="gender4_on2">

                                        <div class="gender4_on2_1">
                                          <span class="shu_name_img" style="visibility:hidden;"></span> <span style="color: #3385ff; padding: 0px 20px;" class="shu_name" value="180" title="女">女</span>
                                        </div>
                                        <div class="gender4_on2_2">
                                          <span><img src="http://192.168.1.238:8089/ittime-tags/res/image/labelsystem/worn.png"></span><span style="margin-left: 5px;">暂无标签规则</span>
                                        </div>
                                        <div class="gender4_on2_3">
                                          <div class="gender4_on2_3T">
                                            <div class="progress">
                                              <span class="blue" style="width: 83px; height: 7px;"></span>
                                            </div>
                                            <span style="margin-left: 15px !important;">309.00</span><span>用户拥有该标签</span>
                                          </div>
                                          <div class="gender4_on2_3B"></div>
                                        </div>
                                        <div class="gender4_on2_4">
                                          <span class="commondel"
                                            style="cursor:pointer;" level="3"><img src="${basePath}/res/imgs/user_open.png" style="width: 17px;"></span>
                                          <span class="fiveEdit"
                                            style="cursor:pointer;" level="3"><img src="${basePath}/res/imgs/user_edit.png" style="width: 14px;" data-toggle="modal" data-target="#smallchildrenModal"></span>
                                          <span class="commondel" style="cursor: pointer;" level="4"><img src="http://192.168.1.238:8089/ittime-tags/res/image/55.png"></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div style="display:none" class="gender_in_fifth"></div>
                                </div>
                              </div>
                              <div style="display:inline-block" class="year clearfix">
                                <!--S 3级标签-->
                                <div class="year0"><span class="shu_name" value=${var5.id} title=${var5.name}>近1-3个月社保</span></div>
                                <div class="gender2"></div>
                                <div class="gender3 clearfix">
                                    <div class="gender3_1">
                                        <div style="display:none;" class="gender3_1top shu_name"></div>
                                        <div class="gender3_1buttom"><span class="shangxian">已上线
                                        </span><span><img
                                                src="${basePath}/res/imgs/refesh.png"></span> <span>每月更新</span></div>
                                    </div>
                                    <div class="gender3_2"><span><img
                                            src="${basePath}/res/imgs/worn.png"></span><span>每年零时更新......</span></div>
                                    <div class="gender3_3">
                                        <span><img src="${basePath}/res/imgs/huan.png">&nbsp;&nbsp;统计：84.09%</span>
                                    </div>
                                    <div class="gender3_4">
                                      <span class="commondel"
                                            style="cursor:pointer;" level="3"><img src="${basePath}/res/imgs/55.png"></span></div>
                                </div>
                                <div class="gender_in" style="display:none;">
                                  <div class="gender4">
                                    <div class="gender2_right">
                                      <div class="gender4_on2">

                                        <div class="gender4_on2_1">
                                          <span class="shu_name_img" style="visibility:hidden;"></span> <span style="color: #3385ff; padding: 0px 20px;" class="shu_name" value="180" title="女">女</span>
                                        </div>
                                        <div class="gender4_on2_2">
                                          <span><img src="http://192.168.1.238:8089/ittime-tags/res/image/labelsystem/worn.png"></span><span style="margin-left: 5px;">暂无标签规则</span>
                                        </div>
                                        <div class="gender4_on2_3">
                                          <div class="gender4_on2_3T">
                                            <div class="progress">
                                              <span class="blue" style="width: 83px; height: 7px;"></span>
                                            </div>
                                            <span style="margin-left: 15px !important;">309.00</span><span>用户拥有该标签</span>
                                          </div>
                                          <div class="gender4_on2_3B"></div>
                                        </div>
                                        <div class="gender4_on2_4">
                                      <!--    <span class="commonadd" style="cursor: pointer;" level="4">
                                          <img src="http://192.168.1.238:8089/ittime-tags/res/image/labelsystem/addicon.png"></span> -->
                                          <span class="commondel" style="cursor: pointer;" level="4">
                                          <img src="http://192.168.1.238:8089/ittime-tags/res/image/55.png"></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div style="display:none" class="gender_in_fifth"></div>
                                </div>
                              </div>
                                <!-- <div id="three" style="display:block" class="add_tab_n2a"><span class="add_tab_n2a_span">
                                <img class="name_dele" src="../../image/labelsystem/addlabel.png"> </span><span class="add_tab_n2" data-toggle="modal" data-target="#baseModal">新建三级标签</span></div> -->
                            </div>
                             
                            
                            <!-- <div style="height: 40px;float: right;margin-right: 91px;">
                              <div id="num">
                                  <select name="" id="" style="vertical-align: bottom;">
                                      <option value="5">5</option>
                                      <option value="10">10</option>
                                      <option value="15">15</option>
                                  </select>
                              </div>
                              <div id="Pagination" class="pagination fr"></div>
                            </div> -->
                        </div>
                        <section class="pages">
                          <div class="col-sm-6">
                            <div class="dataTables_info page-num"  role="status" aria-live="polite">
                              当前第<span id='curr'>1</span>/<span id='tota'>50</span>页，每页<span id='size'>10</span>条，共<span id='reco'>1</span>条记录
                            </div>
                          </div>
                          <!--上一頁，下一頁-->
                          <div class="col-sm-6">
                            <div class="dataTables_info page-num page_num_right" id="sample-table_info" role="status" aria-live="polite">
                              <span class="home_page" id='home_page'>首页</span>
                              <span class="up_page" id='up_page'>上一页</span>
                              <span class="next_page" id='next_page'>下一页</span>
                              <input class="search_page_num" onkeyup="this.value=this.value.replace(/[^\d]/g,'');"></input>
                              <span class="home_page" id='end_page'>尾页</span>
                              <span class="search_page" id='search_page'>跳页</span>
                            </div>
                          </div>
                        </section>
                <!--S 创建一级分类-->
                 <section id="labelsystem_dataTypeId"><!-- 模态框（Modal） -->
                    <!-- 模态框（Modal） -->
                    <div class="modal fade" id="oneModal" tabindex="-1" role="dialog"
                         aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close"
                                            data-dismiss="modal" aria-hidden="true">
                                        &times;
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        创建分类标签
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <div class="modalbox first" style="position: relative;height:40px;">
                                        <span  class="typename_span">一级标签名称：</span>
                                        <input type="text" name="makeupCo" maxlength="10" required = "true"  placeholder="最多可输入10个字符" id = "levelOneName" class="form-control typename_input makeup" onfocus="setfocus(this)" oninput="setinput(this);"  onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
                                        <select name="makeupCoSe" id="typenum1" onchange="changeF(this)" class="makeupCoSe" size="10" style="display:none;">  
                                           
                                        </select>  

                                        <span style="display:none;" class="typename_worn">最多可输入10个字符</span>
                                    </div>
                                    <div class="modalbox second" style="position: relative;height:40px;">
                                        <span  class="typename_span">二级标签名称：</span>
                                        <input type="text" name="makeupCo" maxlength="10" required = "true"  placeholder="最多可输入10个字符" id = "levelTwoName" class="form-control typename_input makeup" onfocus="setfocus(this)" oninput="setinput(this);"  onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
                                        <select name="makeupCoSe" id="typenum2" onchange="changeF(this)" class="makeupCoSe" size="10" style="display:none;">  
                                            
                                        </select>  

                                        <span style="display:none;" class="typename_worn">最多可输入10个字符</span>
                                    </div>
                                    <div class="modalbox third" style="position: relative;height:40px;">
                                        <span  class="typename_span">三级标签名称：</span>
                                        <input type="text" name="makeupCo" maxlength="10" required = "true"  placeholder="最多可输入10个字符" id = "levelThreeName" class="form-control typename_input makeup" onfocus="setfocus(this)" oninput="setinput(this);"  onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
                                        <select name="makeupCoSe" id="typenum3" onchange="changeF(this)" class="makeupCoSe" size="10" style="display:none;">  
                                          
                                        </select>  
                                        

                                        <span style="display:none;" class="typename_worn">最多可输入10个字符</span>
                                    </div>

                                </div>
                               
                                <div class="modal-footer" style="text-align:center;">
                                    <button  id="createonetype" type="button" class="btn btn-primary">
                                                                                                                          创建
                                    </button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">
                                                                                                                         取消
                                    </button>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                        <!-- <script type="text/javascript" src="../../js/labelsystem/wy_select.js"></script> -->
                        <script>
                            var TempArr1=[],
                                TempArr2=[],
                                TempArr3=[];//存储option  
                            //$(function(){  
                                /*先将数据存入数组*/  
                                /* $("#typenum1 option").each(function(index, el) {  
                                    TempArr1[index] = $(this).text();  
                                });  
                                $("#typenum2 option").each(function(index, el) {  
                                    TempArr2[index] = $(this).text();  
                                });
                                $("#typenum3 option").each(function(index, el) {  
                                    TempArr3[index] = $(this).text();  
                                }); */
                                $("#oneModal").bind('click', function(e) {    
                                    var e = e || window.event; //浏览器兼容性     
                                    var elem = e.target || e.srcElement;
                                    while (elem) { //循环判断至跟节点，防止点击的是div子元素  
                                        if (elem.id && (elem.id == 'typenum1' || elem.id == "levelOneName" || elem.id == 'typenum2' || elem.id == "levelTwoName" || elem.id == 'typenum3' || elem.id == "levelThreeName")) {    
                                            return;    
                                        } 
                                        elem = elem.parentNode;    
                                    }   
                                    $('#typenum1,#typenum2,#typenum3').css('display', 'none'); //点击的不是div或其子元素     
                                    
                                      
                                });    
                            //}) 
                            //根据父ID获取子标签
                            function getSubTags(parentId,name) {
                               	var result = '';
                            	$.ajax({  
                                    type:'get',  
                                    url:"${basePath}/basicTag/queryBasicTagForPid",
                                    dataType:"json",
                                    data:{
                                    	"pid":parentId,
                                    	"name":name
                                    },  
                                    async: false,
                                    success:function(data){
                                    	result = data;
                                    }  
                            	});
                            	return result;
                             }
                                
                            //点击下拉
                            function changeF(this_) {  
                                $(this_).prev("input").val($(this_).find("option:selected").text());
                                $(this_).css({"display":"none"});  
                                //获取ID存储 val()
                            } 
                          //新增标签
                            function addAjax(data){
                            	var id = '';
                            	$.ajax({  
                                    type:'post',  
                                    url:"${basePath}/basicTag/addMainBasicTag",
                                    dataType:"json",
                                    data:data, 
                                    async: false,
                                    success:function(data){
                                    	id = data.data;
                                    }  
                            	});
                            	return id;
                            }
                            
                            //获取文本框中对应的数据ID（如果没有则为''）
                            function getIdBySelectAndText(selectName, textName){
                            	var levelName=document.getElementById(textName).value;
						        var select = document.getElementById(selectName);
						        var options = select.options;
						        var id = '';
						        for(var i = 0; i < options.length; i++) {
						        	var text = options[i].text;
						        	var value = options[i].value;
                                   	if(levelName == text){
                                   		id = value;
                                   		break;
                                   	}
						        }
						        return id;
                            }
                            
                            //根据文本框ID获取内容
                            function getTextById(textName){
                            	var value = document.getElementById(textName).value;
                            	return value;
                            }
                            //置空文本框
                            function emptyTextById(textName){
                            	document.getElementById(textName).value='';
                            }
                            
                            //根据后台结果构建select HTML
                            function getSelectHtmlByData(data){
                                var html = '';
                            	if(null == data){
                            		return html;
                            	}
                            	if(data.code == '10005'){
                           		 var subTags = [];
                                    subTags = data.data;
                                    $.each(subTags,function(k,v){
                                    	html+='<option value="'+v.id+'">'+v.name+'</option>';
                                    })
                           		}
                            	return html;
                            }
                            
                            function setfocus(this_){ 
                                $(this_).next().css({"display":"block"});  
                                var select = $(this_).next(); 
                                var data;
                                if($(this_).next().attr("id") == "typenum1") {
                                	//获取一级标签
                                	data = getSubTags(0,getTextById("levelOneName"));
                                   
                                } else if($(this_).next().attr("id") == "typenum2"){
							        var id = getIdBySelectAndText("typenum1","levelOneName");
							        if('' != id) {
							        	//根据id查
							        	//获取一级标签
	                                	data = getSubTags(id,getTextById("levelTwoName"));
							        }
                                	
                                }else if($(this_).next().attr("id") == "typenum3"){
                                	
							        var id = getIdBySelectAndText("typenum2","levelTwoName");
							        if('' != id) {
	                                	data = getSubTags(id,getTextById("levelThreeName"));
							        }
                                }
						        var html = getSelectHtmlByData(data);
                            	select.html(html);
                            	
                                setinput(this_);
                            }  
                              
                            function setinput(this_){  
                                var select = $(this_).next();  
                                select.html(""); 
                                var data;
                                if($(this_).next().attr("id") == "typenum1") { 
                                	//获取一级标签
                                	data = getSubTags(0,getTextById("levelOneName"));
                                	//清空后边两个文本框
                                	emptyTextById("levelTwoName");
                                	emptyTextById("levelThreeName");
                                }else if($(this_).next().attr("id") == "typenum2") { 
                                	//获取二级标签
							        var pid = getIdBySelectAndText("typenum1","levelOneName");
                                	if('' != pid) {
    							        data = getSubTags(pid,getTextById("levelTwoName"));
                                	}
                                	//清空第三个文本框
                                	emptyTextById("levelThreeName");
                                }else if($(this_).next().attr("id") == "typenum3") { 
                                	//获取二级标签
							        var pid = getIdBySelectAndText("typenum2","levelTwoName");
							        if('' != pid) {
							        	data = getSubTags(pid,getTextById("levelThreeName"));
							        }
                                }
						        var html = getSelectHtmlByData(data);
                            	select.html(html);
                                  
                            }  
                            
                           
                            //点击新增
                            $("#createonetype").on('click',function(e){
                            	var pid1 = getIdBySelectAndText("typenum1","levelOneName");
						        if('' == pid1 && '' != getTextById("levelOneName")) {
						        	//插入一级标签获取ID
						        	var data = {
					        			"name":getTextById("levelOneName"),
                                    	"pid":0,
                                    	"level":1
						        	};
						        	pid1 = addAjax(data);
						        }
						        
						        var pid2 = getIdBySelectAndText("typenum2","levelTwoName");
						        if('' == pid2 && '' != getTextById("levelTwoName")) {
						        	//插入二级标签获取ID
						        	var data = {
						        			"name":getTextById("levelTwoName"),
	                                    	"pid":pid1,
	                                    	"level":2
						        	};
						        	pid2 = addAjax(data);
						        }
                            	
						        var pid3 = getIdBySelectAndText("typenum3","levelThreeName");
						        if('' == pid3 && '' != getTextById("levelThreeName")) {
						        	//插入三级标签获取ID
						        	var data = {
						        			"name":getTextById("levelThreeName"),
	                                    	"pid":pid2,
	                                    	"level":3
						        	};
						        	pid3 = addAjax(data);
						        }
                                $("#oneModal").modal("hide");
                               // $("#oneModal input[type='text']").val("");
                            });
                        </script>
                </section>
                <!--E 创建一级分类-->
                </div>
                
                <!--S 创建四级标签-->
                <section id="labelsystem_childrenlabel"><!-- 模态框（Modal） -->
                    <div class="modal fade" id="childrenModal" tabindex="-1" role="dialog"
                         aria-labelledby="childrenModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        ×
                                    </button>
                                    <h4 class="modal-title" id="childrenModalLabel">
                                        新建四级标签
                                    </h4>
                                </div>
                                <div class="modal-body">
                                  <form action="" class="childrenfourModal">
                                    <div>
                                      <span class="tip">*</span>
                                      <span class="typename_span">标签名称：</span>
                                      <input type="text" id = "levelFourName" placeholder="最多可输入10个字符" class="form-control typename_input" name="addfourName" maxlength="10">
                                      <span style="display:none;" class="typename_worn">最多可输入10个字符</span>
                                    </div>
                                    <!-- 标签分类 -->
                                    <div style="margin-top: 8px;">
                                      <span class="tip">*</span>
                                      <span class="typename_span">标签分类：</span>
                                      <select name="" id="">
                                        <option value="">金融行业</option>
                                      </select>
                                      <select name="" id="">
                                        <option value="">金融行业</option>
                                      </select>
                                      <select name="" id="">
                                        <option value="">金融行业</option>
                                      </select>
                                    </div>
                                    <!-- 更新周期 -->
                                    <div style="margin-bottom: 8px;margin-top: 8px;">
                                      <span class="tip">*</span>
                                      <span class="typename_span">更新周期：</span>
                                      <select name="" id="">
                                        <option value="">每天</option>
                                      </select>
                                      <input type="text" id="d242" readonly="" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})" class="Wdate" style="height: 30px;border:1px solid #ccc;margin-left: 20px;padding-left: 5px;border-radius: 3px;" />
                                    </div>
                                    <!--业务含义文本框-->
                                    <div class="type_wrap">
                                      <span class="tip">*</span>
                                      <span class="typename_datatype">业务含义：</span>
                                      <textarea type="text" maxlength="50" id="fourMeanings" class="form-control  form-input  business_mean"
                                                placeholder="最多可输入50个字符" name="fourMeanings"></textarea>
                                      <div><span style="margin-top:15px;display:none" class="typename_worn">最多可输入50个字符</span></div>
                                    </div>
                                    <!--标签规则文本框-->
                                    <div class="type_wrap">
                                        <span class="tip">*</span>
                                        <span class="typename_datatype">标签规则：</span>
                                        <textarea type="text" maxlength="50" id = "fourLabelRules" class="form-control  form-input  business_mean"
                                                  placeholder="最多可输入50个字符" name="fourLabelRules"></textarea>
                                        <div><span style="display:none;" class="typename_worn">最多可输入50个字符</span></div>
                                    </div>
                                    <!-- 算法类型 -->
                                    <div style="margin-bottom: 8px;">
                                        <span class="tip">*</span>
                                        <span class="typename_span">算法类型：</span>
                                        <input type="text" id = "algorithmType" class="form-control typename_input" name="algorithmType">
                                    </div>
                                    <!-- 算法名称 -->
                                    <div style="margin-bottom: 8px;">
                                        <span class="tip">*</span>
                                        <span class="typename_span">算法名称：</span>
                                        <input type="text" id = "algorithmName" class="form-control typename_input" name="algorithmName">
                                    </div>
                                    <!-- 算法引擎 -->
                                    <div class="algorithm">
                                        <span class="tip">*</span>
                                        <span class="typename_span">算法引擎：</span>
                                        <input type="text" readonly="" style="height: 30px;border:1px solid #ccc;" class="form-control typename_input" />
                                        <span id="sub_autoupload">上传文件</span>
                                        <input type="file" id="sub_hidefileupload" class="file"/>
                                        <span class="commondel" style="cursor:pointer;margin-left: 20px;"><img src="${basePath}/res/imgs/55.png"></span>
                                    </div>
                                  </form>
                                    
                                </div>

                                <div class="modal-footer" style="text-align:center;">
                                     <button id="createchildrentype" type="button" class="btn btn-primary">
                                        创建
                                    </button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">
                                        取消
                                    </button>
                                   
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->

                        <script>
                          $(".add_tab_n2").on("click",function(){
                            $("#childrenModal input[type='text']").val("");
                            $("#childrenModal label.error").text("");
                            var d = new Date();
                            var my_hours=d.getHours();
                            var my_minutes=d.getMinutes();
                            var my_seconds=d.getSeconds();
                            var time = my_hours+":"+my_minutes+":"+my_seconds;
                            $(".Wdate").val(time);
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
                            
                          
                        </script>
                    </div>
                </section>
                <!--E 创建四级标签-->
                <!--S 创建五级标签-->
                <section id="labelsystem_childrenlabel"><!-- 模态框（Modal） -->
                    <div class="modal fade" id="smallchildrenModal" tabindex="-1" role="dialog"
                         aria-labelledby="smallchildrenModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        ×
                                    </button>
                                    <h4 class="modal-title" id="smallchildrenModalLabel">
                                        新建五级标签
                                    </h4>
                                </div>
                                <div class="modal-body">
                                  <form action="" class="smallchildrenModalLabel">
                                    <div>
                                      <span class="tip">*</span>
                                      <span class="typename_span">标签名称：</span>
                                      <input type="text" id = "levelFourName" placeholder="最多可输入10个字符" class="form-control typename_input" name="addfourName">
                                      <span style="display:none;" class="typename_worn">最多可输入10个字符</span>
                                    </div>
                                    <!-- 更新周期 -->
                                    <div style="margin-bottom: 8px;margin-top: 8px;">
                                      <span class="tip">*</span>
                                      <span class="typename_span">更新周期：</span>
                                      <select name="" id="">
                                        <option value="">每天</option>
                                      </select>
                                      <input type="text" id="d242" readonly="" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})" class="Wdate" style="height: 30px;border:1px solid #ccc;margin-left: 25px;" />
                                    </div>
                                    <!--业务含义文本框-->
                                    <div class="type_wrap">
                                      <span class="tip">*</span>
                                      <span class="typename_datatype">业务含义：</span>
                                      <textarea type="text" maxlength="50" id="fourMeanings" class="form-control  form-input  business_mean"
                                                placeholder="最多可输入50个字符" name="fourMeanings"></textarea>
                                      <div><span style="margin-top:15px;display:none" class="typename_worn">最多可输入50个字符</span></div>
                                    </div>
                                    <!--标签规则文本框-->
                                    <div class="type_wrap">
                                        <span class="tip">*</span>
                                        <span class="typename_datatype">标签规则：</span>
                                        <textarea type="text" maxlength="50" id = "fourLabelRules" class="form-control  form-input  business_mean"
                                                  placeholder="最多可输入50个字符" name="fourLabelRules"></textarea>
                                        <div><span style="display:none;" class="typename_worn">最多可输入50个字符</span></div>
                                    </div>
                                    <!-- 算法引擎 -->
                                    <div class="algorithm">
                                        <span class="tip">*</span>
                                        <span class="typename_span">算法引擎：</span>
                                        <input type="text" readonly="" style="height: 30px;border:1px solid #ccc;" class="form-control typename_input" />
                                        <span id="sub_autoupload">上传文件</span>
                                        <input type="file" id="sub_hidefileupload" class="file"/>
                                        <span class="commondel" style="cursor:pointer;margin-left: 20px;"><img src="${basePath}/res/imgs/55.png"></span>
                                    </div>
                                  </form>
                                    
                                </div>

                                <div class="modal-footer" style="text-align:center;">
                                     <button id="createsmallchildrentype" type="button" class="btn btn-primary">
                                        创建
                                    </button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">
                                        取消
                                    </button>
                                   
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                        <script>
                          $(".add_tab_n2").on("click",function(){
                            $("#smallchildrenModal input[type='text']").val("");
                            $("#smallchildrenModal label.error").text("");
                            var d = new Date();
                            var my_hours=d.getHours();
                            var my_minutes=d.getMinutes();
                            var my_seconds=d.getSeconds();
                            var time = my_hours+":"+my_minutes+":"+my_seconds;
                            $(".Wdate").val(time);
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
                            
                        </script>
                    </div>
                </section>
                <!--E 创建五级标签-->
            </div>
        </div>
        <!--E cont_right_label-->   
         <form id = "form" style = "display:none;" action="${basePath}/addcombinationlabel" method = "POST"></form>
    </div>
        
        
        
        
    </div>
    <div id="model">
      <div id="threeLabel">
        <div style="display:none" class="year clearfix">
          <!--S 4级标签-->
          <div class="year0">
            <span class="shu_name"></span>
          </div>
          <div class="gender2"></div>
          <div class="gender3 clearfix">
            <div class="gender3_1">
              <div style="display: none;" class="gender3_1top shu_name"></div>
                <div class="gender3_1buttom">
                  <span class="shangxian"></span><span><img
            src="${basePath}/res/imgs/refesh.png"></span> <span>每月更新</span>
                </div>
            </div>
            <div class="gender3_2">
              <span><img src="${basePath}/res/imgs/worn.png"></span><span>暂无标签规则</span>
            </div>
            <div class="gender3_3">
              <div id="group2"></div>
              <span><img src="${basePath}/res/imgs/huan.png">&nbsp;&nbsp;统计:84.09%</span>
            </div>
            <div class="gender3_4">
           <!-- <span class="commonadd" style="cursor: pointer;" level="3">
              <img src="../image/labelsystem/addicon.png"></span> -->
              <span class="commondel" style="cursor: pointer;" level="3">
              <img src="${basePath}/res/imgs/55.png"></span>
            </div>
          </div>
          <!--E 4级标签-->
        </div>
      </div>


      <div id="fourLabel">
        <div class="gender_in" style="display: none">
          <div class="gender4">
            <div class="gender2_right">
              <div class="gender4_on2">

                <div class="gender4_on2_1">
                  <span class="shu_name_img"></span> <span
                    style="color: #3385ff; padding: 0px 20px;" class="shu_name"></span>
                </div>
                <div class="gender4_on2_2">
                  <span><img src="${basePath}/res/imgs/worn.png"></span><span
                    style="margin-left: 5px;">暂无标签规则</span>
                </div>
                <div class="gender4_on2_3">
                  <div class="gender4_on2_3T">
                    <div class="progress">
                      <span class="blue" style="width: 83px; height: 7px;"></span>
                    </div>
                    <span style="margin-left: 15px !important;">309.00</span><span>用户拥有该标签</span>
                  </div>
                  <div class="gender4_on2_3B"></div>
                </div>
                <div class="gender4_on2_4">
              <!--    <span class="commonadd" style="cursor: pointer;" level="4">
                  <img src="../image/labelsystem/addicon.png"></span> -->
                  <span class="commondel" style="cursor: pointer;" level="4">
                  <img src="${basePath}/res/imgs/55.png"></span>
                </div>
              </div>
            </div>
          </div>
        <div  style="display:none" class="gender_in_fifth"></div>
        </div>
      </div>

    </div>
    
    <script src="${basePath}/res/lib/bootstrap3/js/bootstrap.js"></script>
    <script src="${basePath}/res/lib/My97DatePicker/WdatePicker.js"></script>

    <script src="${basePath}/res/js/basicTag/fun.js"></script>
    <script src="${basePath}/res/js/basicTag/tagmanager.js"></script>
    <script src="${basePath}/res/commons/js/base.js"></script>
	<script src="${basePath}/res/js/basicTag/add.js"></script>
	<!-- <script src="../../js/json2.js"></script> -->
	<script src="${basePath}/res/lib/jquery-confirm.min.js"></script>
</body>
</html>