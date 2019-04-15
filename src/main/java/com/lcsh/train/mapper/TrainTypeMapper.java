package com.lcsh.train.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lcsh.train.bean.TrainTypeBean;



/**
 * TrainTypeDao
 * @author FengZhen
 *
 */
@Repository
public interface TrainTypeMapper {

	/**
	 * 新增培训类型
	 * @param bean
	 * @return
	 */
	int addTrainType(TrainTypeBean bean);
	
	/**
	 * 修改培训类型信息(改名)
	 * @param TrainTypeBean
	 */
	void updateTrainTypeById(TrainTypeBean TrainTypeBean);
	
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
	int deleteTrainTypeById(Long id);

	
	/**
	 * 获取培训类型列表
	 * @return
	 */
	List<TrainTypeBean> listTrainType();
}

