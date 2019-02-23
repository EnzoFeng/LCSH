<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <!--S logo-->
        <link rel="icon" href="${basePath}/res/image/favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="${basePath}/res/image/favicon.ico" type="image/x-icon">
        <!--E logo-->
        <title>联创世华学员管理系统</title>
        <meta name="keywords" content="联创世华学员管理系统">
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
        <link rel="stylesheet" href="${basePath}/res/css/semantic.min.css"/>
        <link rel="stylesheet" href="${basePath}/res/css/login.css"/>
        <link rel="stylesheet" href="${basePath}/res/css/jquery-confirm.min.css">
    </head>
    <body>
       <!--顶部logo-->
    <div  class="ui middle aligned center aligned grid">
            <!--悬浮框-->
            <div  class="column popuwindow">
                <form id="loginForm"  class="ui large form wrap_form" action="${basePath}/login" method="post">

                    <div class="ui stacked segment">
                        <div class="field">
                            <div style="text-align:center;" class="ui left icon input">
                                <span class="login_label">用户登录</span>
                            </div>
                        </div>
                        <hr class="login_hr" width=60% size=1 color=#e3e3e3 >
                        <div class="field">
                            <div class="ui left icon input">

                                <input id="userName" class="user" type="text" name="username" placeholder="请输入用户名">
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui left icon input">
                                <input id="password" class="user" type="password" name="password" placeholder="请输入密码">
                            </div>
                        </div>
                       <div class="field">
                            <div class="ui left icon">
                                <input class="login_forgetpwd"  type="checkbox" name="rememberMe"></input>
                                <span  class="login_forgetpwd_text">记住密码</span>
                            </div>
                        </div>

                        <div class="loginbtn fields">
                            <div class="field">
                                <a id="loginSubmit" class="ui fluid large teal submit button login_a ">登录</a>
                            </div>
                        </div>
                    </div>

                    <div class="ui error message"></div>
                </form>
            </div>
    </div>
    <div class="public">
        <span></span>
    </div>
    <script type="text/javascript" src="${basePath}/res/assets/jquery.min.js"></script>
    <script type="text/javascript" src="${basePath}/res/assets/semantic.min.js"></script>
    <script type="text/javascript" src="${basePath}/res/js/index/index.js"></script>
    <script type="text/javascript" src="${basePath}/res/js/md5.min.js"></script>
    <script src="${basePath}/res/assets/jquery-confirm.min.js"></script>
    <script type="text/javascript">
      var basePath = '${basePath}';
      var data = ${data!""}
      console.log(data);
    </script>
  </body>
</html>
