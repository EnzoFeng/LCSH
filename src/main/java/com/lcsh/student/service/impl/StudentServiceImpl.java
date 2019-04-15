package com.lcsh.student.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.lcsh.student.bean.StudentBean;
import com.lcsh.student.mapper.StudentMapper;
import com.lcsh.student.service.StudentService;
import com.lcsh.utils.ExcelUtil;
import com.lcsh.utils.ValidationUtil;


/**
 * @author FengZhen
 * @date Mar 10, 2019
 * 
 */
@Service
public class StudentServiceImpl implements StudentService{

	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	StudentMapper studentMapper;
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	public String addStudent(StudentBean bean) {
		bean.setCreateUserId(1);
		String errorMsg = "";
		try {
			//校验该学员信息
			//学员名、密码、姓名、手机号、邮箱、角色ID、地区编码都不能为空
			//格式校验
			if (StringUtils.isBlank(bean.getName())) {
				errorMsg = "姓名不能为空!";
			} else if (StringUtils.isBlank(bean.getPhone())) {
				errorMsg = "手机号不能为空!";
			} else if (StringUtils.isBlank(bean.getEmail())) {
				errorMsg = "邮箱不能为空!";
			} else if (StringUtils.isBlank(bean.getAreaCode())){
				errorMsg = "地区不能为空!";
			} else if (StringUtils.isBlank(bean.getIdCard())) {
				errorMsg = "身份证号不能为空!";
			} else if (!ValidationUtil.isMobile(bean.getPhone())) {
				errorMsg = "手机号格式不正确!";
			} else if (!ValidationUtil.isEmail(bean.getEmail())) {
				errorMsg = "邮箱格式不正确!";
			} else { //校验身份证号、手机号、邮箱是否唯一
				StudentBean confirmStudentIdCardBean = queryByIdCard(bean.getIdCard());
				StudentBean confirmPhoneBean = queryByPhone(bean.getPhone());
				StudentBean confirmEmailBean = queryByEmail(bean.getEmail());
				if (null != confirmStudentIdCardBean) {
					errorMsg = "该身份证号已被使用!";
				} else if (null != confirmPhoneBean) {
					errorMsg = "该手机号已被使用!";
				}else if (null != confirmEmailBean) {
					errorMsg = "该邮箱已被使用!";
				}
			}
			//TODO 获取当前登录用户
			bean.setUpdateUserId(bean.getCreateUserId());
			studentMapper.addStudent(bean);
			logger.info("==== addStudent@exec:{} ====", bean);
		} catch (Exception e) {
			logger.error("==== addStudent@err:{} ====", e);
		}
		return errorMsg;
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	public void updateStudent(StudentBean bean) {
		try {
			//TODO 获取当前登录用户
			studentMapper.updateStudent(bean);
			logger.info("==== updateStudent@exec:{} ====", bean);
		} catch (Exception e) {
			logger.error("==== updateStudent@err:{} ====", e);
		}
		
	}

	@Override
	public StudentBean queryById(Long id) {
		StudentBean studentBean = null;
		try {
			studentBean = studentMapper.queryById(id);
			logger.info("==== queryById@exec:{} ====", studentBean);
		} catch (Exception e) {
			logger.error("==== queryById@err:{} ====", e);
		}
		return studentBean;
	}

	@Override
	public List<StudentBean> queryByName(String name) {
		List<StudentBean> studentBeans = null;
		try {
			studentBeans = studentMapper.queryByName(name);
			logger.info("==== queryByName@exec:{} ====", studentBeans);
		} catch (Exception e) {
			logger.error("==== queryByName@err:{} ====", e);
		}
		return studentBeans;
	}

	@Override
	public StudentBean queryByIdCard(String idCard) {
		StudentBean studentBean = null;
		try {
			studentBean = studentMapper.queryByIdCard(idCard);
			logger.info("==== queryByIdCard@exec:{} ====", studentBean);
		} catch (Exception e) {
			logger.error("==== queryByIdCard@err:{} ====", e);
		}
		return studentBean;
	}

	@Override
	public StudentBean queryByPhone(String phone) {
		StudentBean studentBean = null;
		try {
			studentBean = studentMapper.queryByPhone(phone);
			logger.info("==== queryByPhone@exec:{} ====", studentBean);
		} catch (Exception e) {
			logger.error("==== queryByPhone@err:{} ====", e);
		}
		return studentBean;
	}

	@Override
	public StudentBean queryByEmail(String email) {
		StudentBean studentBean = null;
		try {
			studentBean = studentMapper.queryByEmail(email);
			logger.info("==== queryByEmail@exec:{} ====", studentBean);
		} catch (Exception e) {
			logger.error("==== queryByEmail@err:{} ====", e);
		}
		return studentBean;
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	public boolean deleteStudentById(Long id) {
		boolean result = false;
		try {
			studentMapper.deleteById(id);
			result = true;
			logger.info("==== deleteUserById@exec:{} ====", id);
		} catch (Exception e) {
			logger.error("==== deleteUserById@err:{} ====", e);
		}
		return result;
	}

	@Override
	public List<StudentBean> listStudent() {
		List<StudentBean> studentBeans = null;
		try {
			studentBeans = studentMapper.list();
			logger.info("==== listStudent@exec:{} ====", studentBeans);
		} catch (Exception e) {
			logger.error("==== listStudent@err:{} ====", e);
		}
		return studentBeans;
	}

	@Override
	public boolean batchAddStudent(String xmlPath) {
		boolean result = false;
		try {
			//解析xml
			ExcelUtil excelUtil = new ExcelUtil();
			List<Map<Integer, String>> students = excelUtil.readExcelToObj(xmlPath);
			List<StudentBean> errorStudents = new ArrayList<>();
			//遍历插入
			for (Map<Integer, String> map : students) {
				StudentBean studentBean = new StudentBean();
				studentBean.setName(map.get(0));
				studentBean.setIdCard(map.get(1));
				studentBean.setPhone(map.get(2));
				studentBean.setEmail(map.get(3));
				//TODO:根据地区名称获取区域ID
				studentBean.setAreaCode("1");
				//根据姓名、身份证、手机号、邮箱校验是否存在该学员
				//存在：不操作
				//不存在：调用添加
				String errorMsg = addStudent(studentBean);
				if (!StringUtils.isBlank(errorMsg)) {
					//如果学员信息有问题，生成Excel提示，建议手动录入有问题学员信息
					errorStudents.add(studentBean);
				}
			}
			result = true;
			logger.info("==== batchAddStudent@exec:{} ====", xmlPath);
		} catch (Exception e) {
			logger.error("==== batchAddStudent@err:{} ====", e);
		}
		return result;
	}

}
