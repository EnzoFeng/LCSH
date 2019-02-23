<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="icon" href="${basePath}/image/favicon.ico" type="image/x-icon">
		<link rel="shortcut icon" href="${basePath}/image/favicon.ico" type="image/x-icon">
		<title>标签管理系统</title>
		<meta name="keywords" content="大数据，用户标签管理系统">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		<!--优先使用 IE 最新版本和 Chrome -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<!--忽略数字自动识别为电话号码 -->
		<meta name="format-detection" content="telephone=no"/>
		<!--忽略识别邮箱 -->
		<meta name="format-detection" content="email=no"/>
		<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
		<meta name="HandheldFriendly" content="true"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/bootstrap/css/bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/addcombinationlabel.css"/>
		<link rel="stylesheet" href="${basePath}/css/jquery-confirm.min.css">
		<script type="text/javascript">
			basePath = '${basePath}';
		</script>
		<script type="text/javascript" src="${basePath}/assets/jquery.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/labelsystem/addcombinationlabel.js"></script>
		<script src="${basePath}/bootstrap/js/bootstrap.js"></script>
	</head>
	<body>
	<div class="container">
		<!--S 头部的导航-->
		<nav class="navbar navbar-default navbar-fixed-top g_row">
			<div class="container">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">
						<img src="${basePath}/image/logo/logo.png"/>
						<span style="display:inline-block;">标签管理系统</span>
					</a>
				</div>
				<div id="navbar" class="collapse navbar-collapse">
				</div>
				<!--/.nav-collapse -->
			</div>
		</nav>

		<div class="nav_wrap">
			<!--S 导航-->
			<div class="label_nav">
				<img src="${basePath}/image/labelsystem/home.png" style="margin-left:12px;margin-top: -5px;"/>
				<span class="label_nav_sp2">您当前的位置：</span>
				<a href="${basePath}/home.ftl" class="label_nav_sp1">首页</a>
				<span class="label_nav_sp2">></span>
				<a href=".${basePath}/labelsystem.ftl" class="label_nav_sp3">标签体系</a>
				<span class="label_nav_sp2">></span>
				<a href="#" class="label_nav_sp3">创建组合标签</a>
			</div>
			<!--E 导航-->
			<div style="height:10px;width:100%;background:#eff5fa;"></div>
		</div>
		<!--E 头部的导航-->
		<div class="centent_wrap clearfix">
			<!--S cont_left_label-->
			<div class="cont_left_label_wrap"></div>
			<!--E cont_left_label-->

			<!--S cont_right_label-->
			<div class="cont_right_label_wrap" style="margin-left: 195px; width: 84%; ">
				<div class="label_cont_top_addlabel clearfix">
					<!--S 导航的二级标签-->
					<div class="label_cont_top_l_addlabel">基本信息<span hidden="">2&gt;</span></div>
				</div>

				<div class="form_data">
					<span class="addlabel_name" >填写标签名称：</span>
					<input maxlength="10" id = "labelName" type="text" class="addlabel_name_input" name="">
					<span class="addlabel_name addlabel_name_limit">最多可输入10个字符</span>
				</div>

				<div class="form_data">
					<span class="addlabel_type">标签分类：</span>
					<select class="select_addlabel_type" name="select" id="tagId">
						<!-- <option value="1">人口统计学</option>
							<option value="2">组合标签</option> -->
					</select>
				</div>
				<!--<div class="form_data">
					<span class="addlabel_type">更新周期：</span>
					<select class="select_addlabel_type" name="select" id="">
						<option value="1">1个月</option>
						<option value="2">2个月</option>
					</select>
				</div> -->
				<div class="form_data_mean">
					<div style="display:inline-block">
						<span class="addlabel_type">业务含义：</span>
						<textarea   maxlength="50" id = "meanings" class="addlabel_taskmean_textarea"></textarea>
						<span class="addlabel_taskmean">最多可输入50个字符</span>
					</div>
				</div>
				<!--S yixuanbaioqian-->
				
				
				<div class="form_data_choose">

						<span class="addlabel_type">已选标签：</span>
						<div class="contiunechoose">
							<!-- <span class="contiunechoose_span">继续选择标签</span> -->
						</div>
						<!--S 已选标签-->
						<div class="addlabel_chooselabel_textarea">
						<span id = "form" style = "display:none">${form.tagCombination?size}</span>
							<#list form.tagCombination as tagList>
							<div style = "display:none">
									<span class = "pId">${tagList.pId}</span>
									<span class = "cId">${tagList.cId}</span>
									<span class = "pLevel">${tagList.pLevel}</span>
							</div>
                            <div class="addlabel_div">
									 <div class="addlabel_div_con">
										 <span class="addlabel_spanonelabel">${tagList.name}</span>
										 <span class="addlabel_div_con_img"></span>
									 </div>
									<div  class="addlabel_div_con">
										<span class="addlabel_div_text">${tagList.path}</span>
									</div>
									
								</div>
								
							</#list>
							

						</div>
						<!--E 已选标签-->
						<div class="form_data_choose_relation">
							<span class="addlabel_type">已选标签：</span>
							<div class="choose_div">
								<div class="choose_label_and">
									<span class="chooselabel_text">AND</span>
									<span class="chooselabel_img"></span>
								</div>
								<div class="choose_label_or">
									<span class="chooselabel_text">OR</span>
									<span class="chooselabel_img"></span>
								</div>
							</div>
						</div>
						<div class="form_data_btn">
							<div class="center_btn">
								<button type="button" class="btn btn-default base_btn cancel_btn" >
									<span class="btn_span"> <a href = "${basePath}/mge">取消</a></span>
								</button>
								<button type="button" onclick="createbtn()"  id = "createCombinationLabel" class="btn btn-default base_btn  create_btn" >
									<span class="btn_span">创建</span>
								</button>

							</div>
						</div>

				</div>
				<!--E yixuanbaioqian-->
			</div>
			<!--E cont_right_label-->
		</div>

	</div>
	
	<script src="${basePath}/assets/jquery-confirm.min.js"></script>
	</body>
</html>
<script>
    //删除标签
    $('.addlabel_chooselabel_textarea').on("click", ".addlabel_div_con_img", function () {
        console.log($(this));
        $(this).css('background','url(${basePath}/image/labelsystem/delcombinationlabel_active.png) no-repeat 0px 0px');
        $(this).parent().parent().remove();
    });
    //选中事件
    $('.choose_div').on("click", ".choose_label_and", function () {
        var chooseimg = $(this).find('.chooselabel_img');
        if(chooseimg.css("visibility") == 'hidden'){
            console.log('--if-hidden-');
            chooseimg.css("visibility","visible");
		}else{
            chooseimg.css("visibility","hidden");
		}

    });
    $('.choose_div').on("click", ".choose_label_or", function () {
        var chooseimg = $(this).find('.chooselabel_img');
        if(chooseimg.css("visibility") == 'hidden'){
            console.log('--if-hidden-');
            chooseimg.css("visibility","visible");
        }else{
            chooseimg.css("visibility","hidden");
        }

    });

</script>


