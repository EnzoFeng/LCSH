package com.lcsh.user.controller;

import java.io.PrintWriter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lcsh.commons.bean.StateCode;
import com.lcsh.user.bean.UserBean;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * @author FengZhen
 * @date Jan 19, 2019
 * 用户操作
 */
@Api("用户管理")
@Controller("user")
public class UserController {

	@ApiOperation(value="新增用户", notes="添加新用户",produces = "application/json")
	@ApiResponses({
		@ApiResponse(code = StateCode.ADD_SUCCESS, message = "新增成功"),
		@ApiResponse(code = StateCode.ADD_FAILD, message = "新增失败")
	})
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void addUser(PrintWriter pw, UserBean userBean) {
		
	}
	
}
