package com.lcsh.student.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lcsh.student.bean.StudentBean;

/**
 * @author FengZhen
 * @date Mar 6, 2019
 * 
 */
@Repository
public interface StudentMapper {


	/**
	 * 新增学员
	 * @param bean
	 * @return
	 */
	int addStudent(StudentBean bean);
	
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
	int deleteById(Long id);
	
	
	/**
	 * 获取学员列表
	 * @return
	 */
	List<StudentBean> list();
	
	/**
	 * 根据姓名、身份证、手机号、邮箱校验是否存在该学员
	 * @param bean
	 * @return
	 */
	StudentBean queryByNameAndIdCardAndPhoneAndEmail(StudentBean bean);
	
}
