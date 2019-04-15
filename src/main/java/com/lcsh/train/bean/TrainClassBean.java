package com.lcsh.train.bean;

import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author FengZhen
 * @date Apr 4, 2019
 * 培训班次实体类
 */
@Data
@ApiModel(value = "TrainClassBean", description="培训班次Bean")
public class TrainClassBean {
	
	/**
	 * 主键ID
	 */
	@ApiModelProperty(value = "主键ID")
	private Long id;
	
	/**
	 * 班次名
	 */
	@ApiModelProperty(value = "班次名")
	private String name;
	
	/**
	 * 培训类型ID
	 */
	@ApiModelProperty(value = "培训类型ID")
	private int typeId;
	
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
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	@Override
	public String toString() {
		return "TrainClassBean [id=" + id + ", name=" + name + ", typeId=" + typeId + ", status=" + status
				+ ", createUserId=" + createUserId + ", createTime=" + createTime + ", updateUserId=" + updateUserId
				+ ", updateTime=" + updateTime + "]";
	}
	
}
