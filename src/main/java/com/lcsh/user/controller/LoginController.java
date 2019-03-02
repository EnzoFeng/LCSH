package com.lcsh.user.controller;

import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.lcsh.commons.bean.Result;
import com.lcsh.commons.bean.StateCode;
import com.lcsh.commons.controller.BaseController;
import com.lcsh.user.bean.UserBean;
import com.lcsh.user.loginForm.LoginForm;
import com.lcsh.user.service.UserService;
import com.lcsh.utils.JsonUtil;
import com.lcsh.utils.MD5Util;
import com.lcsh.utils.UserUtil;

/**
 * 登录、登出
 * @author FengZhen
 *
 */
@Controller
@RequestMapping("/")
public class LoginController extends BaseController {

	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Resource
	private UserService userService;
	
	private static final String LOGIN_RESULT = "==== login@result:{} ====";
	private static final String BASE_PATH = "basePath";
	private static String basePath = null;
	
	/**
	 * 登录页（默认页）
	 * @return
	 */
	@RequestMapping(value={"/","login"}, method = RequestMethod.GET)
	public ModelAndView loginView(HttpServletRequest request) {
		final ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject(BASE_PATH, StringUtils.isBlank(basePath)?this.getContextPathWithHost(request):basePath);
		modelAndView.setViewName("login");
		return modelAndView;
	}
	
	/**
	 * 登录
	 * @param form
	 * @param request
	 * @param pw
	 * @return
	 */
	@RequestMapping(value={"login"}, method = RequestMethod.POST)
	public ModelAndView login(LoginForm form, HttpServletRequest request, PrintWriter pw) {
	    ModelAndView modelAndView = new ModelAndView();
	    Result responseMsg = new Result();
	    UserBean user = null;
	    // 非空校验
	    if(null == form || StringUtils.isBlank(form.getUsername()) || StringUtils.isBlank(form.getPassword())) {
            responseMsg.set(StateCode.PARAM_NULL_FAILD, "参数输入错误");
            modelAndView.setViewName("login");
	    }else {
	     // 获取数据库中用户信息
	        logger.info("==== login@params:{} ====", form);
	        UserBean userBean = new UserBean();
	        userBean.setUsername(form.getUsername());
//	        userBean.setPassword(form.getPassword());
	        userBean.setPassword(MD5Util.getMd5(form.getPassword() + UserUtil.ENCRYPTING_KEY));
	        user = userService.login(userBean);
	        if (null == user) {
	            responseMsg.set(StateCode.QUERY_ZERO_SUCCESS, "用户名或者密码错误");
	            modelAndView.setViewName("login");
	            logger.error(LOGIN_RESULT, responseMsg);
	        }else if(user.getStatus() == 2) {
	            responseMsg.set(StateCode.RECORD_DISABLED, "用户被禁用");
	            modelAndView.setViewName("login");
                logger.error(LOGIN_RESULT, responseMsg);
	        }else {
	            // 校验通过的处理
	            modelAndView = shiroLogin(user, form.getRememberMe() !=null && form.getRememberMe().equals("true"));
	            responseMsg.set(StateCode.SUCCESS, "成功登录");
	        }
	    }
        
        logger.info(LOGIN_RESULT, responseMsg);
        String result = JsonUtil.obj2Json(responseMsg);
        
        modelAndView.addObject("data", result);
        return modelAndView;
	}
	
	private ModelAndView shiroLogin(UserBean user,Boolean rememberMe) {
		ModelAndView modelAndView = new ModelAndView();
	    //获取密码令牌并验证
        UsernamePasswordToken token = null;
        
        token = new UsernamePasswordToken(user.getUsername(), user.getPassword());
        Subject currentUser = SecurityUtils.getSubject();
        if (!currentUser.isAuthenticated()){
            //使用shiro来验证
            if(rememberMe) token.setRememberMe(true);
            currentUser.login(token);// 验证角色和权限
        }
        if(currentUser.isAuthenticated()) {
        	modelAndView.setViewName("redirect:home");
        } else {
        	modelAndView.setViewName("login");
        }
        return modelAndView;
	}
	
	
	/**
	 * 检查注册的登录名是否重复
	 * @param username 登录名
	 * @param request
	 * @param pw
	 */
	@RequestMapping(value={"registerCheck"}, method = RequestMethod.POST)
    public void registerCheck(String username, HttpServletRequest request, PrintWriter pw) {
	    Result responseMsg = new Result();
	    if(StringUtils.isBlank(username))responseMsg.set(StateCode.PARAM_NULL_FAILD, "参数输入错误");
	    else {
	    	UserBean userBean = new UserBean();
	    	userBean.setUsername(username);
	        UserBean bean = userService.login(userBean);
	        if(null == bean)responseMsg.set(StateCode.SUCCESS, "用户名不重复");
	        else responseMsg.set(StateCode.RECORD_DUP_FAILD, "用户名重复");
	    }
	    String result = JsonUtil.obj2Json(responseMsg);
        try {
            pw.write(result);
            logger.info("==== registerCheck@result:{} ====", result);
        } catch (RuntimeException e) {
            logger.error("==== registerCheck@result:服务器错误 ====");
        }
	}
	
	/**
	 * 登录校验
	 * @param pw
	 * @param loginUser
	 * @return
	 */
	@RequestMapping(value="/loginChk", method = RequestMethod.POST)
	public ModelAndView loginChk(UserBean bean, HttpServletRequest request) {
		final ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject(BASE_PATH, StringUtils.isBlank(basePath)?getContextPathWithHost(request):basePath);
		if (null != bean) {
			logger.info("==== login@params:{} ====", bean);
			bean = userService.login(bean);
		} else {
			logger.info("==== login@params:param error ====");
		}
		if (null != bean) {
			logger.info("==== login@result: {} login success, go to home! ====", bean);
		} else {
			modelAndView.setViewName("login");
			logger.info("==== login@result:login faild, go to login! ====");
		}
		return modelAndView; 
	}
	
	/**
	 * 登出
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ModelAndView logout(HttpServletRequest request) {
	    Subject subject = SecurityUtils.getSubject();  
        subject.logout(); 
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/login");
		logger.info("==== logout@result:logout success. ====");
		return modelAndView;
	}
	
}
