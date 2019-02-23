  <nav class="navbar navbar-default navbar-fixed-top g_row">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    <img src="../image/logo/logo.png" style="width:55px;margin-top:-5px;"/>
                    <span style="display:inline-block;">标签管理系统</span>
                </a>
            </div>
           <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav nav_b_text">
	               <#--<li ${(navigation??&&navigation='home')?string("class=active","")}><a href="${basePath}/home">首页</a></li>-->
                       <li ${(navigation??&&navigation='tagmanager')?string("class=active","")}><a href="${basePath}/mge">基础标签</a></li>
                       <li ${(navigation??&&navigation='statisticstag ')?string("class=active","")}><a href="${basePath}/userGroup/statistics">组合标签</a></li>
                       <li ${(navigation??&&navigation='microportrait')?string("class=active","")}><a href="${basePath}/micro">微观画像</a></li>
                       <li ${(navigation??&&navigation='tagquery')?string("class=active","")}><a href="${basePath}/tagquery">标签查询</a></li>
                       <li ${(navigation??&&navigation='appmanagement')?string("class=active","")}><a href="${basePath}/appmanage">审核管理</a></li>
                       <li ${(navigation??&&navigation='labeltask')?string("class=active","")}><a href="${basePath}/task/">标签任务</a></li>
                       <li ${(navigation??&&navigation='system')?string("class=active","")}><a href="${basePath}/systemSet">系统设置</a></li>

                       <#--<li id="li-1" ${(navigation??&&navigation='tagmanager')?string("class=active","")}>
                        <a href="javascript:void(0)">标签体系</a>
                        <div id="box-1" class="menu_pop" style="border-bottom: medium none; display:none;">
                            <span class="menu_pop_arrow">
                                        <span class="arrow_down"></span>
                                        <span class="arrow_up"></span>
                            </span>
                            <div class="menu_pop_link">
                                <a href="${basePath}/mge" class="first"  >基础标签</a>
                                <a href="${basePath}/userGroup/statistics">统计标签</a>
                                <a href="${basePath}/userGroup/excavate" class="last" >挖掘标签</a>
                            </div>
                        </div>
                    </li>

	               <li ${(navigation??&&navigation='macroportrait')?string("class=active","")}><a href="${basePath}/userGroup/userGroupPortrait">宏观分析</a></li>-->


                   
                   <li class="outlogin" >
                        <a class="outlogin_a" href="${basePath}/quit">
                            <span class="outlogin_exit">退出</span>
                        </a>
                   </li>
               </ul>
           </div>
       </div>
 </nav>
 <script type="text/javascript">
	var basePath = '${basePath}';
</script>