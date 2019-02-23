<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<!--S logo-->
	<link rel="icon" href="${basePath}/res/imgs/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="${basePath}/res/imgs/image/favicon.ico" type="image/x-icon">
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
	<link rel="stylesheet" type="text/css" href="${basePath}/res/commons/css/base.css"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/res/mergeTag/css/mergeTag.css"/>
	<link rel="stylesheet" href="${basePath}/res/lib/jquery-confirm.min.css">
	<script src="${basePath}/res/lib/bootstrap3/jquery1/jquery.min.js"></script>
	<script src="../../assets/laydate.dev.js"></script>
	<script src="${basePath}/res/lib/jquery-confirm.min.js"></script>
</head>
<body>
<div class="container">
	<!--S 顶部导航-->
	<nav class="navbar navbar-default navbar-fixed-top g_row">
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
                   <li ${(navigation??&&navigation='statisticstag ')?string("class=active","")}><a href="${basePath}/userGroup/statistics">组合标签</a></li>
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
    </nav> 
	<!--E 顶部导航-->
	<!--S 中间的内容-->
	<div class="centent clearfix">
		<div class="cont_left_label">
			<!--S 左侧的一级标签-->
			<!--S 新增一级分类-->
			<div class="leftNav">
                <!--S 左侧的动态的添加的树状列表-->
                <div class="con_gr">
                  <div class="left_gr">
                        <div class="firstGr" style="transition: 0.5s;position: relative;">
                            <img src="${basePath}/res/imgs/nav_labelsystem.png">
                            <span value=${var1.id} title=${var1.name}>金融行业</span>
                        </div>
                        <div style="display:block;" class="zi">
                            <div class="secondGr" style="background: #435569;"><span class="second_img active" style="background:url(${basePath}/res/imgs/u62.png) no-repeat 0 10px !important;" value=${var2.id} title=${var2.name}>中信银行</span>
                            </div>
                            <div style="display:block;" class="secondzi">
                              <div  style="display:block;" class="we">
                                <div class="we_div" style="background: #2fa4ff;"><span
                                        class="we_div_span" value="${var3.id}" title=${var3.name} style="background:url(${basePath}/res/imgs/u62.png) no-repeat 0 10px !important;">社保数据</span></div>
                              </div>
                              <div style="display:block;" class="four">
                                <div class="four_div" style="background: #435569;"><span class="four_div_span" value=${var2.id} title=${var2.name}>近1-3个月社保</span></div>
                              </div>
                            </div>
                            
                            <div class="secondGr" style="background: #435569;"><span class="second_img active" value=${var2.id} title=${var2.name}>保险业</span>
                            </div>
                            <div  style="display:block;" class="we"></div>
                         </div>
                        <span hidden="">${var1.tagType}</span>
                  </div>
                  <div style="display:block;" class="zi"></div>
                  <span hidden="">${var1.tagType}</span>
                </div>
                <div class="add_tab" data-toggle="modal" data-target="#oneModal">
                    <div class="add_tab_n"><img src="${basePath}/res/imgs/addlabel.png"><span>新建主分类标签</span></div>
                </div>
            </div>
			<!--E 左侧的一级标签-->
		</div>
		<!--S cont_right_label-->
		<div class="cont_right_label">
			<!--S 导航-->
			<div class="label_nav">
				<img src="${basePath}/res/imgs/home.png" style="margin-left:12px;margin-top: -5px;"/>
				<span class="label_nav_sp2">您当前的位置：</span>
				<a href="${basePath}/home" class="label_nav_sp1">首页</a>
				<span class="label_nav_sp2">></span>
				<a href="javascript:void(0)" class="label_nav_sp3">组合标签</a>
				<span class="label_nav_sp2">></span>
				<a href="javascript:void(0)" class="label_nav_sp3">创建组合标签</a>
			</div>
			<!--E 导航-->
			<!--S 1.2.3步-->
			<div class="createusergroupguide_wrap clearfix">
				<div class="guide_one guide">
					<span class="guide_line_active"></span>
					<div class="guide_one_img guide_lead"><span class="guide_one_span">1</span></div>
					<span class="guide_line_active"></span>
					<div class="guide_text">定义条件</div>
				</div>
				<div class="guide_two guide">
					<span class="guide_two_line"></span>
					<div class="guide_two_img guide_lead">
						<span class="guide_one_span">2</span>
					</div>
					<span class="guide_two_line"></span>
					<div class="guide_text">填写基本信息</div>
				</div>
				<div class="guide_three guide">
					<span class="guide_three_line"></span>
					<div class="guide_three_img guide_lead">
						<span class="guide_one_span">3</span>
					</div>
					<span class="guide_three_line"></span>
					<div class="guide_text">确认信息</div>
				</div>
			</div>
			<!--E 1.2.3步-->
			<!--S 第一步的内容-->
			<div style="display:block;" class="createusergroupcount_wrap">
				<!--S　用户选择面板-->
				<section class ="useraddlabel_wrap">
                     <section  class="useraddlabel_nav">
                         <span class="useraddlabel_nav_text first_text">未选择</span>
						 <div  class="useraddlabel_search">
							 <input id="searchval" class="useraddlabel_input" type="text" />
							 <span id="searchbtn" class="useraddlabel_img" ></span>
						 </div>
					 </section>
					<div class="usersureaddlabel_contentchoice addlabel"></div>
					<div class="userlabel_addbtn">
						<span class="userlabel_addbtn_text">添加</span>
					</div>
				</section>
				<!--E　用户选择面板-->
				<!--S　用户确认选择-->
				<section class="usersureaddlabel_wrap">
					<!--S 内容-->
					<div class="usersureaddlabel_contentchoice">
                        <section  class="useraddlabel_nav" style="margin-bottom:10px;">
							<span class="useraddlabel_nav_text" >已选条件</span>
							<span class="clearAll">清空</span>
						</section>
						<!--S 每一项的内容-->
						<div id="addtocontent" class="addtocontent"></div>
					     <!--E 每一项的内容-->

						<!--S 条件公式预览-->
						<span class="sersureaddlabel_oversee_span">条件公式预览</span>
						<div class="sersureaddlabel_oversee_watch"></div>
						<!--E 条件公式预览-->
				   </div>
					<!--E 内容-->
				</section>
				<!--E　用户确认选择-->
				<!--S　按钮-->
				<section style="display:block;" class ="btngroup_wrap">
					<div class="form_data_btn">
						<div class="center_btn">
							<button id="one_next" type="button" style=" background: rgb(0, 104, 181);" class="btn btn-default base_btn one_next_btn" >
								<span  class="btn_span">下一步</span>
							</button>
							<button id = "cancel" type="button" style="background: rgb(146, 146, 146);color:#fff" class="btn btn-default base_btn  one_cancel_btn" >
								<a  class="one_btn_span">取消</a>
							</button>
						</div>
					</div>
				</section>
				<!--E　按钮-->
			</div>
			<!--E 第一步的内容-->
			<!--S 第二步的内容-->
			<div style="display:none;"  class="createusergroupcount_twowrap">
				<!--S　用户填写面板-->
				<section class ="useraddlabel_wrap">
					<section  class="useraddlabel_nav">
						<span class="useraddlabel_nav_text" >基本信息</span>
					</section>
					<div class="usersureaddlabel_content">
						<div class="usersureaddlabel_choose">
							<div class="userinputaddlabel_type">
                                <span class="userinputaddlabel_description_text">行业分类：</span><select name="" id="usergrouptype" class="userinputaddlabel_type_text">
									<option value="">金融行业</option>
								</select>
							</div>
							<div class="userinputaddlabel_name">
                                <span class="userinputaddlabel_description_text">组合名称：</span><input id="usergroupname" maxlength="10" type="text" class="userinputaddlabel_name_text" name="" placeholder="最多可输入10个字符">
							</div>
							<div class="userinputaddlabel_description">
							    <span class="userinputaddlabel_description_text">组合含义：</span>
							    <textarea id="usergroupmean" maxlength="50" class="userinputaddlabel_meaning_textarea" placeholder="最多可输入50个字符"></textarea>

							</div>
							<div class="userinputaddlabel_description">
								<span class="userinputaddlabel_description_text">组合用途：</span>
								<textarea id="usergroupdeuse" maxlength="50" class="userinputaddlabel_description_textarea" placeholder="最多可输入50个字符"></textarea>

							</div>
							<div class="userinputaddlabel_time">
								<span class="userinputaddlabel_description_text">有效时间：</span><input type="text" id="starttime" readonly="" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd'})" class="Wdate" style="height: 25px;border:1px solid #ccc;padding-left: 5px;width: 150px;" /><input type="text" id="endtime" readonly="" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd'})" class="Wdate" style="height: 25px;border:1px solid #ccc;margin-left: 20px;padding-left: 5px;width: 150px;" />
							</div>
						</div>
					</div>
				</section>
				<!--E　用户填写面板-->
				<!--S　按钮-->
				<section style="display:none;" class ="btngroup_twowrap">
					<div class="form_data_btn">
						<div class="center_btn">
							<button id="two_next_btn" type="button" style="background:#0068b5;color:#fff" class="btn btn-default base_btn  two_next_btn" >
								<span class="btn_span">下一步</span>
							</button>
							<button type="button" class="btn btn-default base_btn  two_pro_btn" >
								<span  class="btn_span">上一步</span>
							</button>
						</div>
					</div>
				</section>
				<!--E　按钮-->
			</div>
			<!--E 第二步的内容-->

			<!--S 第三步的内容-->
			<div style="display:none;"  class="createusergroupcount_threewrap">
				<!--S　用户填写面板-->
				<section class ="useraddlabel_wrap">
					<div class="nameType">
						<p>行业分类：<span>金融行业</span></p>
						<p>组合名称：<span>高端用户</span></p>
					</div>
					<section  class="useraddlabel_nav">
						<span class="useraddlabel_nav_text" >基本信息</span>
					</section>
					<div class="usersureaddlabel_contentsure">
						<div class="usersureaddlabel_choosesure">
							<div>
							<span class="user_three_text">标签名称：</span>
							<span id="threeusergroupname" class="user_three_text"></span>
							</div>
							<div>
							<span class="user_three_text">标签描述：</span>
							<span id="threeusergroupdescription" class="user_three_text"></span>
							</div>
							<div>
							<span class="user_three_text">标签用途：</span>
							<span id="threeusergroupdeuse" class="user_three_text"></span>
							</div>
							<div>
							<span  class="user_three_text">有效时间:</span>
							<span id="time" class="user_three_text"></span>
							</div>
						</div>
					</div>
					<section  class="useraddlabel_nav">
						<span class="useraddlabel_nav_text" >定义条件</span>
					</section>
					<div class="usersureaddlabel_contentsure">
						<div>
						<span id="threeuseraddlabel_text" class="userinputaddlabel_description_text"></span>
						<span id="threeuseraddlabel_id" style="display:none;"></span>
						</div>
						<span id="threecompeople" class="userinputaddlabel_description_text"></span>
						<span id="threecoverpeople" class="userinputaddlabel_description_text"></span>
					</div>
				</section>
				<!--E　用户填写面板-->
				<!--S　按钮-->
				<section style="display:none;" class ="btngroup_twowrap">
					<div class="form_data_btn">
						<div class="three_center_btn" >
							<button id='addusergroup' type="button"  class="btn btn-default base_btn  three_next_btn saveandcommit" >
								<span class="btn_span">保存并提交申请</span>
							</button>
							<button id="three_pro_btn" type="button" class="btn btn-default base_btn  three_pro_btn" >
								<span  class="btn_span">上一步</span>
							</button>
						</div>
					</div>
				</section>
				<!--E　按钮-->
			</div>
			<!--E 第三步的内容-->
		</div>
		<!--E cont_right_label-->
	</div>
	<!--E 中间的内容-->
	<script src="${basePath}/res/lib/bootstrap3/js/bootstrap.js"></script>
	<script src="${basePath}/res/lib/My97DatePicker/WdatePicker.js"></script>
	<script src ="${basePath}/res/commons/js/base.js"></script>
	<script src="${basePath}/res/lib/jquery-confirm.min.js"></script>
	<script src="${basePath}/res/js/mergeTag/createMergeTag.js"></script>
	   <script>
	if(baseMethod.whatBrowser()== 'Chrome'){
        $(".guide_lead").css('line-height','21px');
	}
</script>
<script>
    $("#cancel").bind('click',function(){
       window.location.href='${basePath}/userGroup/statistics';
	});
</script>

</body>
</html>