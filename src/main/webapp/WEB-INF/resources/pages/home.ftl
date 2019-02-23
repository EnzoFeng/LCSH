<!DOCTYPE html>
<html>
	<head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="icon" href="${basePath}/res/imgs/favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="${basePath}/res/imas/favicon.ico" type="image/x-icon">
        <title>管理系统首页</title>
        <meta name="keywords" content="管理系统首页">
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
	    <h3 class="form-title">首页</h3>
	    <@shiro.user>  
            欢迎[<@shiro.principal property="name" />]登录，<a href="/logout.shtml">退出</a>  
        <@shiro.principal />
        </@shiro.user>
        
        <@shiro.hasRole name="supper_admin">  
            用户[<@shiro.principal property="name"/>]拥有角色supper_admin<br/>  
        </@shiro.hasRole> 
    </body>  
</html>
