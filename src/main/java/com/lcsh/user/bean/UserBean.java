package com.lcsh.user.bean;

import java.io.Serializable;
import java.util.Date;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * @author FengZhen
 * @date Jan 19, 2019
 * 用户bean
 */
@ApiModel("用户bean")
public class UserBean implements Serializable{

	private static final long serialVersionUID = 1L;

	/**
	 * 主键ID
	 */
	private Long id;

	/**
	 * 姓名
	 */
    private String name;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 登录用户名
     */
    private String username;

    /**
     * 登录密码
     */
    private String password;
    
    /**
     * 角色ID
     */
    private Integer roleId;
    
    /**
     * 地区编码
     */
    private String areaCode;

    /**
     * 状态
     */
    private int status;
    
    /**
     * 创建者
     */
    private int createUserId;

    /**
     * 创建日期
     */
    private Date createTime;
    
    /**
     * 上次更新人ID
     */
    private int updateUserId;
   
    /**
     * 更新日期
     */
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
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
		return "UserBean [id=" + id + ", name=" + name + ", phone=" + phone + ", email=" + email + ", username="
				+ username + ", password=" + password + ", roleId=" + roleId + ", areaCode=" + areaCode + ", status="
				+ status + ", createUserId=" + createUserId + ", createTime=" + createTime + ", updateUserId="
				+ updateUserId + ", updateTime=" + updateTime + "]";
	}
    
}
