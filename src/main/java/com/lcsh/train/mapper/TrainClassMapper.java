package com.lcsh.train.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lcsh.train.bean.TrainClassBean;


/**
 * TrainClassDao
 * @author FengZhen
 *
 */
@Repository
public interface TrainClassMapper {

	/**
	 * 新增培训班次
	 * @param bean
	 * @return
	 */
	int addTrainClass(TrainClassBean bean);
	
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
	int deleteTrainClassById(Long id);

	
	/**
	 * 获取培训班次列表
	 * @return
	 */
	List<TrainClassBean> listTrainClass();
}

