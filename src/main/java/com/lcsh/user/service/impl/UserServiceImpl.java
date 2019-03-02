package com.lcsh.user.service.impl;


import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.lcsh.user.bean.UserBean;
import com.lcsh.user.mapper.UserMapper;
import com.lcsh.user.service.UserService;
import com.lcsh.utils.MD5Util;
import com.lcsh.utils.UserUtil;


/**
 * UserService
 * @author FengZhen
 *
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Resource
	private UserMapper userMapper;
	
	
	@Cacheable(value="userCache",key="'UserKey'+#userid")
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	public boolean addUser(UserBean userBean) {
		try {
			//密码加密
			userBean.setPassword(MD5Util.getMd5(userBean.getPassword() + UserUtil.ENCRYPTING_KEY));
			userBean.setUpdateUserId(userBean.getCreateUserId());
			userMapper.addUser(userBean);
			logger.info("==== addUser@exec:{} ====", userBean);
		} catch (Exception e) {
			logger.error("==== addUser@err:{} ====", e);
		}
		return userBean.getId() > 0;
	}

	@Override
	public UserBean queryById(Long userId) {
		UserBean userBean = null;
		try {
			userBean = userMapper.queryById(userId);
			logger.info("==== queryById@exec:{} ====", userBean);
		} catch (Exception e) {
			logger.error("==== queryById@err:{} ====", e);
		}
		return userBean;
	}


	@Override
	public UserBean queryByUsername(String username) {
		UserBean userBean = null;
		try {
			userBean = userMapper.queryByUsername(username);
			logger.info("==== queryByUserName@exec:{} ====", userBean);
		} catch (Exception e) {
			logger.error("==== queryByUserName@err:{} ====", e);
		}
		return userBean;
	}

	@Override
	public UserBean queryByUsernameWithPWD(String username) {
		UserBean userBean = null;
		try {
			userBean = userMapper.queryByUsernameWithPWD(username);
			logger.info("==== queryByUsernameWithPWD@exec:{} ====", userBean);
		} catch (Exception e) {
			logger.error("==== queryByUsernameWithPWD@err:{} ====", e);
		}
		return userBean;
	}
	

	@Override
	public UserBean queryByPhone(String phone) {
		UserBean userBean = null;
		try {
			userBean = userMapper.queryByPhone(phone);
			logger.info("==== queryByPhone@exec:{} ====", userBean);
		} catch (Exception e) {
			logger.error("==== queryByPhone@err:{} ====", e);
		}
		return userBean;
	}


	@Override
	public UserBean queryByEmail(String email) {
		UserBean userBean = null;
		try {
			userBean = userMapper.queryByEmail(email);
			logger.info("==== queryByEmail@exec:{} ====", userBean);
		} catch (Exception e) {
			logger.error("==== queryByEmail@err:{} ====", e);
		}
		return userBean;
	}


	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public boolean deleteUserById(Long id) {
		boolean result = false;
		try {
			userMapper.deleteUserById(id);
			result = true;
			logger.info("==== deleteUserById@exec:{} ====", id);
		} catch (Exception e) {
			logger.error("==== deleteUserById@err:{} ====", e);
		}
		return result;
	}

	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public boolean updatePasswordById(UserBean userBean) {
		boolean result = false;
		try {
			userBean.setPassword(MD5Util.getMd5(userBean.getPassword() + UserUtil.ENCRYPTING_KEY));
			userMapper.updatePasswordById(userBean);
			result = true;
			logger.info("==== updatePasswordById@exec:{} ====", userBean);
		} catch (Exception e) {
			logger.error("==== updatePasswordById@err:{} ====", e);
		}
		return result;
	}
	
	@Override
	public List<UserBean> listUser() {
		List<UserBean> userBeans = null;
		try {
			userBeans = userMapper.listUser();
			logger.info("==== listUser@exec:{} ====", userBeans);
		} catch (Exception e) {
			logger.error("==== listUser@err:{} ====", e);
		}
		return userBeans;
	}
	
	public UserBean login(UserBean userBean) {
		UserBean user = null;
		try {
			user = userMapper.queryByUsernameAndPassword(userBean);
			logger.info("==== login@exec:{} ====", user);
		} catch (Exception e) {
			logger.error("==== login@err:{} ====", e);
		}
		return user;
	}

}
