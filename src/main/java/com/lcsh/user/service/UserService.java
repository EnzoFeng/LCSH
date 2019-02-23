package com.lcsh.user.service;

import java.util.List;

import com.lcsh.user.bean.UserBean;


/**
 * UserService
 * @author FengZhen
 *
 */
public interface UserService {

	/**
	 * 新增用户
	 * @param bean
	 * @return
	 */
	boolean addUser(UserBean bean);
	
	/**
	 * 根据ID删除用户
	 * @param bean
	 * @return
	 */
	boolean delForUser(UserBean bean);
	
	/**
	 * 根据ID修改用户密码
	 * @param bean 新密码、ID
	 * @return
	 */
	boolean updateForPassword(UserBean bean);
	
	/**
	 * 用户登录
	 * @param bean 用户名、密码
	 * @return
	 */
	UserBean login(UserBean bean);
	
	/**
	 * 当前用户权限
	 * @param bean
	 * @return
	 */
	
	/**
     * 根据用户id查询
     * @param bean id
     * @return
     */
	UserBean queryForId(UserBean bean);
	
	/**
     * 根据用户username查询
     * @param bean id
     * @return
     */
    UserBean queryForUsername(UserBean bean);
    
    /**
     * 查询所有的用户
     * pr=0时查询全部；否则确保sr为更新的数据
     * state=0时查询所有的状态
     * name是模糊查询
     * @param bean
     * @return List<UserBean>
     */
    List<UserBean> queryForConditions(UserBean bean);
    
    /**
     * 查询所有的用户总记录数
     * pr=0时查询全部；否则确保sr为更新的数据
     * state=0时查询所有的状态
     * name是模糊查询
     * @param bean
     * @return List<UserBean>
     */
    int queryCountForConditions(UserBean bean);
}
