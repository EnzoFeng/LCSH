package com.lcsh.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author FengZhen
 * @date Mar 2, 2019
 * 首页
 */
@Controller
@RequestMapping("/")
public class HomeController {

	/**
	 * 跳转到首页
	 * @return
	 */
	@RequestMapping("home")
	public ModelAndView home() {
		ModelAndView modelAndView = new ModelAndView("home");
		return modelAndView;
	}
	
}
