package com.lcsh.user.controller;

import java.io.PrintWriter;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcsh.commons.bean.Result;
import com.lcsh.commons.bean.StateCode;
import com.lcsh.user.bean.UserBean;
import com.lcsh.user.service.UserService;
import com.lcsh.utils.JsonUtil;
import com.lcsh.utils.ValidationUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * @author FengZhen
 * @date Jan 19, 2019
 * 用户操作
 */
@Api(tags = "用户管理")
@Controller
@RequestMapping("/user")
public class UserController {

	private Logger logger = LoggerFactory.getLogger(getClass());
	
	
	@Autowired
	UserService userService;
	
	@ApiOperation(value="用户添加",notes="用户名、密码、姓名、手机号、邮箱、角色ID、地区编码都不能为空")
//	@ApiImplicitParams({
//		@ApiImplicitParam(name = "UserBean", value = "用户信息bean", dataType = "UserBean", paramType = "body")
//	})
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public void addUser(PrintWriter pw, @RequestBody @Validated UserBean userBean) {
		Result responseMsg = new Result();
		logger.info("==== addUser@params:{} ====", userBean);
		//用户名、密码、姓名、手机号、邮箱、角色ID、地区编码都不能为空
		//格式校验
		String errorMsg = "";
		if (StringUtils.isBlank(userBean.getUsername())) {
			errorMsg = "用户名不能为空!";
		} else if (StringUtils.isBlank(userBean.getPassword())) {
			errorMsg = "密码不能为空!";
		} else if (StringUtils.isBlank(userBean.getName())) {
			errorMsg = "姓名不能为空!";
		} else if (StringUtils.isBlank(userBean.getPhone())) {
			errorMsg = "手机号不能为空!";
		} else if (StringUtils.isBlank(userBean.getEmail())) {
			errorMsg = "邮箱不能为空!";
		} else if (StringUtils.isBlank(userBean.getAreaCode())){
			errorMsg = "地区不能为空!";
		} else if (null == userBean.getRoleId() || 0 == userBean.getRoleId()) {
			errorMsg = "角色不能为空!";
		} else if (!ValidationUtil.isUserName(userBean.getUsername())) { //校验格式
			errorMsg = "用户名格式不正确!";
		} else if (!ValidationUtil.isPassword(userBean.getPassword())) {
			errorMsg = "密码格式不正确!";
		} else if (!ValidationUtil.isMobile(userBean.getPhone())) {
			errorMsg = "手机号格式不正确!";
		} else if (!ValidationUtil.isEmail(userBean.getEmail())) {
			errorMsg = "邮箱格式不正确!";
		} else { //校验用户名、手机号、邮箱是否唯一
			UserBean confirmUsernameBean = userService.queryByUsername(userBean.getUsername());
			UserBean confirmPhoneBean = userService.queryByPhone(userBean.getPhone());
			UserBean confirmEmailBean = userService.queryByEmail(userBean.getEmail());
			if (null != confirmUsernameBean) {
				errorMsg = "该用户名已被使用!";
			} else if (null != confirmPhoneBean) {
				errorMsg = "该手机号已被使用!";
			}else if (null != confirmEmailBean) {
				errorMsg = "该邮箱已被使用!";
			}
		}
		if (!StringUtils.isBlank(errorMsg)) {
			logger.error("==== addUser@{} ====", errorMsg);
			responseMsg.set(StateCode.FAILD, errorMsg);
			String result = JsonUtil.obj2Json(responseMsg);
			pw.write(result);
			return;
		}
		
		//该用户信息可用，执行插入操作
		userService.addUser(userBean);
		responseMsg.set(StateCode.SUCCESS, "用户添加成功！");
		String result = JsonUtil.obj2Json(responseMsg);
		pw.write(result);
	}
	
	
	@ApiOperation(value = "用户列表", notes = "查看用户列表")
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public void listUser(PrintWriter pw) {
		Result responseMsg = new Result();
		List<UserBean> userBeans = userService.listUser();
		responseMsg.set(StateCode.SUCCESS, "用户查询成功!", userBeans);
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== listUser@result:{} ====", result);
		pw.write(result);
	}
	
	@ApiOperation(value = "根据用户名查询", notes = "根据用户名查询用户信息")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "username", value = "用户名", dataType = "String", paramType = "query")
	})
	@RequestMapping(value = "/username", method = RequestMethod.POST)
	@ResponseBody
	public void queryByUsername(PrintWriter pw, @RequestParam String username) {
		logger.info("==== queryByUsername@params:{} ====", username);
		Result responseMsg = new Result();
		UserBean userBean = userService.queryByUsername(username);
		responseMsg.set(StateCode.SUCCESS, "用户查询成功!", userBean);
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== queryByUsername@result:{} ====", result);
		pw.write(result);
	}
	
	@ApiOperation(value = "根据手机号查询", notes = "根据手机号查询用户信息")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "phone", value = "手机号", dataType = "String", paramType = "query")
	})
	@RequestMapping(value = "/phone", method = RequestMethod.POST)
	@ResponseBody
	public void queryByPhone(PrintWriter pw, @RequestParam String phone) {
		logger.info("==== queryByPhone@params:{} ====", phone);
		Result responseMsg = new Result();
		UserBean userBean = userService.queryByPhone(phone);
		responseMsg.set(StateCode.SUCCESS, "用户查询成功!", userBean);
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== queryByPhone@result:{} ====", result);
		pw.write(result);
	}
	
	@ApiOperation(value = "根据邮箱查询", notes = "根据邮箱查询用户信息")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "email", value = "邮箱", dataType = "String", paramType = "query")
	})
	@RequestMapping(value = "/email", method = RequestMethod.POST)
	@ResponseBody
	public void queryByEmail(PrintWriter pw,  @RequestParam String email) {
		logger.info("==== queryByEmail@params:{} ====", email);
		Result responseMsg = new Result();
		UserBean userBean = userService.queryByEmail(email);
		responseMsg.set(StateCode.SUCCESS, "用户查询成功!", userBean);
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== queryByEmail@result:{} ====", result);
		pw.write(result);
	}
	
	@ApiOperation(value = "根据id删除用户", notes = "根据id删除用户信息")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "id", value = "邮箱", dataType = "Long", paramType = "query")
	})
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@ResponseBody
	public void deleteUser(PrintWriter pw,  @RequestParam Long id) {
		logger.info("==== deleteUser@params:{} ====", id);
		Result responseMsg = new Result();
		boolean operateResult = userService.deleteUserById(id);
		if (operateResult) {
			responseMsg.set(StateCode.SUCCESS, "操作成功!");
		}else {
			responseMsg.set(StateCode.FAILD, "操作失败!");
		}
		
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== deleteUser@result:{} ====", result);
		pw.write(result);
	}
	
}
