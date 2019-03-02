<!DOCTYPE html>
<html>
	<head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="icon" href="${basePath}/res/imgs/favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="${basePath}/res/imas/favicon.ico" type="image/x-icon">
        <title>联创世华学员管理系统首页</title>
        <meta name="keywords" content="学员管理系统首页">
        <meta http-equiv="cache-control" content="no-cache">
        <!-- Bootstrap 核心 CSS 文件 -->  
        <link rel="stylesheet" href="${basePath}/res/lib/bootstrap3/css/bootstrap.min.css">
        <link rel="stylesheet" href="${basePath}/res/lib/bootstrap3/css/bootstrap-theme.min.css">
        <!-- 在bootstrap.min.js 之前引入 -->
        <script type="text/javascript" src="${basePath}/res/lib/jquery2/jquery-2.1.1.min.js"></script>  
        <!-- Bootstrap 核心 JavaScript 文件 -->
        <script type="text/javascript" src="${basePath}/res/lib/bootstrap3/js/bootstrap.min.js"></script>
        <style type="text/css">
        </style>
	</head>
	<body>
	   
	    <!-- <@shiro.user>  
	    <h3 class="form-title">首页</h3>
            欢迎[<@shiro.principal property="name" />]登录，<a href="/logout.shtml">退出</a>  
        <@shiro.principal />
        </@shiro.user>
        
        <@shiro.hasRole name="supper_admin">  
            用户[<@shiro.principal property="name"/>]拥有角色supper_admin<br/>  
        </@shiro.hasRole>  -->
        
        <nav class="navbar navbar-default" role="navigation">
		    <div class="container-fluid">
		    <div class="navbar-header" style="background-color:">
		        <a class="navbar-brand" href="#">联创世华</a>
		    </div>
		    <div>
		        <ul class="nav navbar-nav">
		        	<li class="active">
		            	<a href="#">培训班次</a>
		            </li>
		            <li>
		            	<a href="#">培训类型</a>
		            </li>
		            <li class="dropdown">
		                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
		                    学员信息
		                    <b class="caret"></b>
		                </a>
		                <ul class="dropdown-menu">
		                    <li><a href="#">学员查询</a></li>
		                    <li class="divider"></li>
		                    <li><a href="#">单条录入</a></li>
		                    <li class="divider"></li>
		                    <li><a href="#">批量导入</a></li>
		                </ul>
		            </li>
		            <li>
		            	<a href="#">用户管理</a>
		            </li>
		        </ul>
		    </div>
		    </div>
		</nav>
    </body>  
</html>
