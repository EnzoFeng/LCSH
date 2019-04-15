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
	int addUser(UserBean bean);
	
	/**
	 * 根据ID修改用户密码
	 * @param userBean
	 * @return
	 */
	int updatePasswordById(UserBean userBean);
	
	/**
	 * 修改用户信息
	 * @param userBean
	 */
	void updateUserById(UserBean userBean);
	
	
	/**
     * 根据用户id查询
     * @param userId
     * @return
     */
	UserBean queryById(Long id);
	
	/**
     * 根据用户username查询
     * @param username
     * @return
     */
    UserBean queryByUsername(String username);
    
    /**
     * 根据用户username查询(查出密码)
     * @param username
     * @return
     */
    UserBean queryByUsernameWithPWD(String username);
    
    /**
     * 根据用户名及密码查询
     * @param userBean
     * @return
     */
    UserBean queryByUsernameAndPassword(UserBean userBean);
	
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
	int deleteUserById(Long id);

	
	/**
	 * 获取用户列表
	 * @return
	 */
	List<UserBean> listUser();
}

