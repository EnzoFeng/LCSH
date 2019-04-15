package com.lcsh.student.bean;

import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author FengZhen
 * @date Mar 6, 2019
 * 学员基本信息
 */
@Data
@ApiModel(value = "StudentBean", description="学员Bean")
public class StudentBean {

	/**
	 * 主键ID
	 */
	@ApiModelProperty(value = "主键ID")
	private Long id;

	/**
	 * 姓名
	 */
	@ApiModelProperty(value = "姓名")
    private String name;

	/**
	 * 身份证号
	 */
	@ApiModelProperty(value = "身份证号")
    private String idCard;
	
	
    /**
     * 手机号
     */
	@ApiModelProperty(value = "手机号")
    private String phone;

    /**
     * 邮箱
     */
	@ApiModelProperty(value = "邮箱")
    private String email;
    
    /**
     * 地区编码
     */
	@ApiModelProperty(value = "地区编码")
    private String areaCode;

    /**
     * school_id
     */
	@ApiModelProperty(value = "毕业院校Id")
    private Long schoolId;
	
    /**
     * 状态
     */
	@ApiModelProperty(value = "状态")
    private int status;
    
    /**
     * 创建者
     */
	@ApiModelProperty(value = "创建者")
    private int createUserId;

    /**
     * 创建日期
     */
	@ApiModelProperty(value = "创建日期")
    private Date createTime;
    
    /**
     * 上次更新人ID
     */
	@ApiModelProperty(value = "上次更新人ID")
    private int updateUserId;
   
    /**
     * 更新日期
     */
	@ApiModelProperty(value = "更新日期")
    private Date updateTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public Long getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(Long schoolId) {
		this.schoolId = schoolId;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(int createUserId) {
		this.createUserId = createUserId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public int getUpdateUserId() {
		return updateUserId;
	}

	public void setUpdateUserId(int updateUserId) {
		this.updateUserId = updateUserId;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public String toString() {
		return "StudentBean [id=" + id + ", name=" + name + ", idCard=" + idCard + ", phone=" + phone + ", email="
				+ email + ", areaCode=" + areaCode + ", schoolId=" + schoolId + ", status=" + status + ", createUserId="
				+ createUserId + ", createTime=" + createTime + ", updateUserId=" + updateUserId + ", updateTime="
				+ updateTime + "]";
	}
    
}
