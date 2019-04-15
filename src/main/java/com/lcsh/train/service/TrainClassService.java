package com.lcsh.train.service;

import java.util.List;

import com.lcsh.train.bean.TrainClassBean;

/**
 * @author FengZhen
 * @date Apr 4, 2019
 * 培训班次业务处理
 */
public interface TrainClassService {

	/**
	 * 新增培训班次
	 * @param bean
	 * @return
	 */
	String addTrainClass(TrainClassBean bean);
	
	/**
	 * 修改培训班次信息(改名)
	 * @param TrainClassBean
	 */
	void updateTrainClassById(TrainClassBean TrainClassBean);
	
	/**
     * 根据培训班次id查询
     * @param TrainClassId
     * @return
     */
	TrainClassBean queryById(Long id);
	
	/**
     * 根据培训班次TrainClassName查询
     * @param TrainClassName
     * @return
     */
    TrainClassBean queryByTrainClassName(String trainClassName);
	
    /**
     * 根据培训类型ID找相关班次
     * @param typeId
     * @return
     */
    List<TrainClassBean> queryByTypeId(int typeId);
    
    
	/**
	 * 根据ID删除培训班次(逻辑删除)
	 * @param id
	 * @return
	 */
	boolean deleteTrainClassById(Long id);

	
	/**
	 * 获取培训班次列表
	 * @return
	 */
	List<TrainClassBean> listTrainClass();
	
}
