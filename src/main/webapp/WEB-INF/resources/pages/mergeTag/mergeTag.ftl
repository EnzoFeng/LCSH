<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<!--S logo-->
		<link rel="icon" href="${basePath}/res/imgs/favicon.ico" type="image/x-icon">
		<link rel="shortcut icon" href="${basePath}/res/imgs/favicon.ico" type="image/x-icon">
		<!--E logo-->
		<title>标签管理系统</title>
		<meta name="keywords" content="大数据，用户管理群，用户标签管理系统">
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
		<link rel="stylesheet" type="text/css" href="${basePath}/res/lib/bootstrap3/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href=""${basePath}/res/css/commons/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/res/css/mergeTag.css"/>
		<link rel="stylesheet" href="${basePath}/res/lib/jquery-confirm.min.css">
	</head>
	<body>
	<div class="container">
		<!--S 头部的导航-->
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
	    </nav>  
		<div class="nav_wrap">
			<!--S 导航-->
			<div class="label_nav">
				<img src="${basePath}/res/imgs/home.png" style="margin-left:12px;margin-top: -5px;"/>
				<span class="label_nav_sp2">您当前的位置：</span>
				<a href="${basePath}/home" class="label_nav_sp1">首页</a>
				<span class="label_nav_sp2">></span>
				<a href="javascript:void(0)" class="label_nav_sp3">组合标签</a>
			</div>
			<!--E 导航-->
			<!--S 尽显有效 全部 用户群-->
			<div class="small_nav">
				<div class="User_radio clearfix">
					<div class="User_radio_j">
						<input class="User_radio1" type="checkbox" checked="checked">
						<span class="label_radio2">仅显有效</span>
					</div>
					<div class="User_radio_sosuo">
						<input class="User_input" type="text" name="" id="query" value="" placeholder="请输入关键词检索"/>
						<span class="Userl_radio6"></span>
					</div>
				</div>
			</div>
			<!--E 尽显有效 全部 用户群-->
		</div>
		<!--E 头部的导航-->
		<!--S 下面的内容 -->
		<div class="centent_wrap clearfix">
			<div class="User_center">
				<div id="User_centerIN" class="User_centerIN">
					<div class="User_centerIN_top">
						<!-- <span class="centerIN_top1">图表</span> -->
						<span class="centerIN_top2">列表</span>
						<a href="${basePath}/userGroup/createStatisticsUserGroup" class="centerIN_top3">创建群体</a>
					<!--	<div class="centerIN_showcontent">
							<a href="${basePath}/userGroup/createStatisticsUserGroup" class="centerIN_top3_inner_one">创建统计群体</a><br>
							<a href="${basePath}/userGroup/createExcavateUserGroup" class="centerIN_top3_inner_two">创建挖掘群体</a>
						</div> -->
					</div>
					<!--图表-->
					<!-- <div id="bubbleDiagram" style="width:100%;height:500px; margin-top:40px;" class="User_centerIN_tubiao" ></div> -->
					<!--表格-->
					<div class="User_centerIN_liebiao">
						<!--table-->
						<section class="table_wrap clearfix all-table-container">
							<div class="cover_style">
								<!--用户列表-->
								<div>
									<table class="table table-striped table-bordered table-hover table-text-center" >
										<thead class="all-table-header">
										<tr>
											<th width="">行业分类</th>
											<th width="">组合标签名称</th>
											<th width="">覆盖用户数</th>
											<th width="">包含标签组数</th>
											<th width="">状态</th>
											<th width="">创建时间</th>
											<th width="">操作</th>
										</tr>
										</thead>
										<tbody>
											<tr>
												<td>金融行业</td>
												<td>高富帅</td>
												<td>121,000,000</td>
												<td>10</td>
												<td>已上线</td>
												<td>2016-11-30 12:20:30</td>
												<td><span class="openStop"><img src="${basePath}/res/imgs/user_open.png" alt="" style="width: 17px;margin-right: 5px;margin-left: 10px;"></span>
                              <span class="combinEdit"><img src="${basePath}/res/imgs/user_edit.png" alt=""></span>
                              <span class="delete_ug"><img src="${basePath}/res/imgs/55.png" alt=""></span></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</section>
						<!--/.table-->
						<!--pages-->
						<!--number-->
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
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="${basePath}/res/lib/bootstrap3/jquery1/jquery.min.js"></script>
	<script src="${basePath}/res/commons/js/base.js" ></script>
	<script src="${basePath}/res/lib/bootstrap3/js/bootstrap.js"></script>
	<script src="${basePath}/res/lib/jquery-confirm.min.js"></script>
	<script src="${basePath}/res/lib/echarts/echarts.min.js" ></script>
	<script src="${basePath}/res/js/mergeTag/mergeTag.js" ></script>
	<script src="${basePath}/res/js/mergeTag/mergeTagFun.js" ></script>
	</body>
</html>

