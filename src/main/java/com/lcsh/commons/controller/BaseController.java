/**
 * 
 * 项目名称：ittime-tag
 * 创建日期：2018年5月29日
 * 修改历史：
 * 		1、[2018年5月29日]创建文件 by zhaocs
 */
package com.lcsh.commons.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authz.AuthorizationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * @author FengZhen
 * 基础Controller，处理公共的业务，如：异常
 */
public class BaseController {
    private Logger logger = LoggerFactory.getLogger(getClass());
    
    @ExceptionHandler
    public String exception(HttpServletRequest request, Exception e) {  
        logger.debug("==== exception@error ===={}", e);
        
        //对异常进行判断做相应的处理  
        if(e instanceof AuthorizationException){  
            return "redirect:/logout";  
        }
        return null;
    }
    
    /**
     * 用户对应的应用上下文
     * @return 上下文格式为http://xxx/datacenter/，最后一定有/
     */
    public String getContextPathWithHost(HttpServletRequest request) {
          return request.getScheme() + "://"
                    + request.getServerName() + ":" + request.getServerPort()
                    + request.getContextPath();
    }
}
