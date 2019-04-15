package com.lcsh.train.service;

import java.util.List;

import com.lcsh.train.bean.TrainTypeBean;

/**
 * @author FengZhen
 * @date Apr 4, 2019
 * 培训类型业务处理
 */
public interface TrainTypeService {
	
	/**
	 * 新增培训类型
	 * @param bean
	 * @return
	 */
	String addTrainType(TrainTypeBean bean);
	
	/**
	 * 修改培训类型信息(改名)
	 * @param TrainTypeBean
	 */
	String updateTrainTypeById(TrainTypeBean TrainTypeBean);
	
	
	/**
     * 根据培训类型id查询
     * @param TrainTypeId
     * @return
     */
	TrainTypeBean queryById(Long id);
	
	/**
     * 根据培训类型TrainTypeName查询
     * @param TrainTypeName
     * @return
     */
    TrainTypeBean queryByTrainTypeName(String trainTypeName);
	
    
	/**
	 * 根据ID删除培训类型(逻辑删除)
	 * @param id
	 * @return
	 */
    boolean deleteTrainTypeById(Long id);

	
	/**
	 * 获取培训类型列表
	 * @return
	 */
	List<TrainTypeBean> listTrainType();
	
}
