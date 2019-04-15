package com.lcsh.student.service;

import java.util.List;

import com.lcsh.student.bean.StudentBean;

/**
 * @author FengZhen
 * @date Mar 6, 2019
 * 
 */
public interface StudentService {

	/**
	 * 新增学员
	 * @param bean
	 * @return
	 */
	String addStudent(StudentBean bean);
	
	/**
	 * 批量添加学员
	 * @param xmlPath
	 * @return
	 */
	boolean batchAddStudent(String xmlPath);
	
	/**
	 * 更新学员信息
	 * @param bean
	 */
	void updateStudent(StudentBean bean);
	
	/**
     * 根据学员id查询
     * @param userId
     * @return
     */
	StudentBean queryById(Long id);
	
	/**
     * 根据学员username查询
     * @param username
     * @return
     */
	List<StudentBean> queryByName(String name);
    
    /**
     * 根据学员名及密码查询
     * @param userBean
     * @return
     */
	StudentBean queryByIdCard(String idCard);
	
    /**
     * 根据学员手机号查询
     * @param phone
     * @return
     */
	StudentBean queryByPhone(String phone);
    
    /**
     * 根据学员邮箱查询
     * @param email
     * @return
     */
	StudentBean queryByEmail(String email);
    
	/**
	 * 根据ID删除学员(逻辑删除)
	 * @param id
	 * @return
	 */
	boolean deleteStudentById(Long id);
	
	
	/**
	 * 获取学员列表
	 * @return
	 */
	List<StudentBean> listStudent();
	
}
