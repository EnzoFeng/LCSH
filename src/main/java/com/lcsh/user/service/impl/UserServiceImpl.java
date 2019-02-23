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
	public boolean addUser(UserBean bean) {
		int state = 0;
		try {
			state = userMapper.addUser(bean);
			logger.info("==== addUser@exec:{} ====", state);
		} catch (Exception e) {
			logger.error("==== addUser@err:{} ====", e);
		}
		return state>0;
	}


	public boolean delForUser(UserBean bean) {
		int state = 0;
		try {
			state = userMapper.delUserForId(bean);
			logger.info("==== delForUser@exec:{} ====", state);
		} catch (Exception e) {
			logger.error("==== delForUser@err:{} ====", e);
		}
		return state>0;
	}


	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	public boolean updateForPassword(UserBean bean) {
		int state = 0;
		try {
			state = userMapper.updateForPassword(bean);
			logger.info("==== updateForPassword@exec:{} ====", state);
		} catch (Exception e) {
			logger.error("==== updateForPassword@err:{} ====", e);
		}
		return state>0;
	}

	public UserBean login(UserBean bean) {
		UserBean user = null;
		try {
			user = userMapper.queryForUsernameAndPassword(bean);
			logger.info("==== login@exec:{} ====", user);
		} catch (Exception e) {
			logger.error("==== login@err:{} ====", e);
		}
		return user;
	}

    public UserBean queryForId(UserBean bean) {
        UserBean user = null;
        try {
            user = userMapper.queryForId(bean);
            logger.info("==== queryForId@exec:{} ====", user);
        } catch (Exception e) {
            logger.error("==== queryForId@err:{} ====", e);
        }
        return user;
    }


    public UserBean queryForUsername(UserBean bean) {
        UserBean user = null;
        try {
            user = userMapper.queryForUsername(bean);
            logger.info("==== queryForUsername@exec:{} ====", user);
        } catch (Exception e) {
            logger.error("==== queryForUsername@err:{} ====", e);
        }
        return user;
    }


    public List<UserBean> queryForConditions(UserBean bean) {
        List<UserBean> beans = null;
        try {
            beans = userMapper.queryForConditions(bean);
            logger.info("==== queryForConditions@exec:{} ====", beans);
        } catch (Exception e) {
            logger.error("==== queryForConditions@err:{} ====", e);
        }
        return beans;
    }
	
    public int queryCountForConditions(UserBean bean) {
        int count = 0;
        try {
            count = userMapper.queryCountForConditions(bean);
            logger.info("==== queryCountForConditions@exec:{} ====", count);
        } catch (Exception e) {
            logger.error("==== queryCountForConditions@err:{} ====", e);
        }
        return count;
    }
}
