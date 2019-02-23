package com.lcsh.user.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lcsh.user.bean.UserBean;


/**
 * UserDao
 * @author FengZhen
 *
 */
@Repository
public interface UserMapper {

	/**
	 * 新增用户
	 * @param bean
	 * @return
	 */
	public int addUser(UserBean bean);
	
	/**
	 * 根据ID删除用户
	 * @param bean
	 * @return
	 */
	public int delUserForId(UserBean bean);
	
	/**
	 * 根据ID修改用户密码
	 * @param bean 用户名、新密码、ID
	 * @return
	 */
	public int updateForPassword(UserBean bean);
	
	/**
	 * 根据用户名和密码查询
	 * @param bean 用户名、密码
	 * @return
	 */
	public UserBean queryForUsernameAndPassword(UserBean bean);
	
	/**
	 * 根据用户id查询
	 * @param bean id
	 * @return
	 */
	public UserBean queryForId(UserBean bean);
	
	/**
     * 根据用户username查询
     * @param bean id
     * @return
     */
    public UserBean queryForUsername(UserBean bean);
    
    /**
     * 查询所有的用户
     * @param bean
     * @return List<UserBean>
     */
    List<UserBean> queryForConditions(UserBean bean);
    
    /**
     * 查询所有的用户总记录数
     * @param bean
     * @return List<UserBean>
     */
    int queryCountForConditions(UserBean bean);
}

