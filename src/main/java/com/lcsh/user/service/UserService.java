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
	 * @param userBean
	 * @return
	 */
	boolean addUser(UserBean userBean);
	
	/**
     * 根据用户id查询
     * @param userId
     * @return
     */
	UserBean queryById(Long userId);
	
	/**
     * 根据用户username查询
     * @param username
     * @return
     */
    UserBean queryByUsername(String username);
    
	/**
     * 根据用户username查询(包括PWD)
     * @param username
     * @return
     */
    UserBean queryByUsernameWithPWD(String username);
	
    /**
     * 根据用户手机号查询
     * @param phone
     * @return
     */
    UserBean queryByPhone(String phone);
    
    /**
     * 根据用户邮箱查询
     * @param email
     * @return
     */
    UserBean queryByEmail(String email);
    
	/**
	 * 根据ID删除用户(逻辑删除)
	 * @param id
	 * @return
	 */
	boolean deleteUserById(Long id);
	
	/**
	 * 根据ID修改用户密码
	 * @param userBean
	 * @return
	 */
	boolean updatePasswordById(UserBean userBean);
	
	/**
	 * 查看用户列表
	 * @return
	 */
	List<UserBean> listUser();
	
	/**
	 * 用户登录
	 * @param userBean 用户名、密码
	 * @return
	 */
	UserBean login(UserBean userBean);
  
}
