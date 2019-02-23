package com.lcsh.etc.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * 扩展监听器（缓存模块、邮件模块）
 * @author FengZhen
 *
 */
public class ExtListener implements ServletContextListener {

	private Logger logger = LogManager.getLogger(getClass());
	
	
	public ExtListener() {
		logger.info("==== 初始化系统扩展监听器 ====");
	}
	
	public void contextDestroyed(ServletContextEvent event) {
	}

	public void contextInitialized(ServletContextEvent event) {
		ServletContext servletContext = event.getServletContext();
		servletContext.setAttribute("ext", "ext");
	}

}
