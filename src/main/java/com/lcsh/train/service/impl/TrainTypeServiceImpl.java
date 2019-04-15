package com.lcsh.train.service.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lcsh.train.bean.TrainTypeBean;
import com.lcsh.train.mapper.TrainTypeMapper;
import com.lcsh.train.service.TrainTypeService;

/**
 * @author FengZhen
 * @date Apr 4, 2019
 * 
 */
@Service
public class TrainTypeServiceImpl implements TrainTypeService{
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	TrainTypeMapper trainTypeMapper;
	
	@Override
	public String addTrainType(TrainTypeBean bean) {
		String errorMsg = "";
		try {
			//校验是否存在
			if (StringUtils.isBlank(bean.getName())) {
				errorMsg = "培训类型名不能为空!";
			}else {
				TrainTypeBean trainTypeBean = queryByTrainTypeName(bean.getName());
				if (null != trainTypeBean) {
					errorMsg = "培训类型名已存在!";
				}else {
					bean.setCreateUserId(1);
					bean.setUpdateUserId(1);
					logger.info("==== addTrainType@exec:{} ====", bean);
					trainTypeMapper.addTrainType(bean);
				}
			}
		} catch (Exception e) {
			logger.error("==== addTrainType@err:{} ====", e);
		}
		
		return errorMsg;
	}

	@Override
	public String updateTrainTypeById(TrainTypeBean bean) {
		String errorMsg = "";
		try {
			//校验是否存在
			if (StringUtils.isBlank(bean.getName())) {
				errorMsg = "培训类型名不能为空!";
			}else {
				TrainTypeBean trainTypeBean = queryByTrainTypeName(bean.getName());
				if (null != trainTypeBean) {
					errorMsg = "培训类型名已存在!";
				}else {
					bean.setUpdateUserId(1);
					logger.info("==== updateTrainTypeById@exec:{} ====", bean);
					trainTypeMapper.updateTrainTypeById(bean);
				}
			}
		} catch (Exception e) {
			logger.error("==== updateTrainTypeById@err:{} ====", e);
		}
		
		return errorMsg;
	}

	@Override
	public TrainTypeBean queryById(Long id) {
		TrainTypeBean trainTypeBean = trainTypeMapper.queryById(id);
		logger.info("==== queryById@exec:id:{},result:{} ====", id,trainTypeBean);
		return trainTypeBean;
	}

	@Override
	public TrainTypeBean queryByTrainTypeName(String trainTypeName) {
		TrainTypeBean trainTypeBean = trainTypeMapper.queryByTrainTypeName(trainTypeName);
		logger.info("==== queryByTrainTypeName@exec:trainTypeName:{},result:{} ====", trainTypeName,trainTypeBean);
		return trainTypeBean;
	}

	@Override
	public boolean deleteTrainTypeById(Long id) {
		boolean result = false;
		try {
			trainTypeMapper.deleteTrainTypeById(id);
			result = true;
			logger.info("==== deleteTrainTypeById@exec:{} ====", id);
		} catch (Exception e) {
			logger.error("==== deleteTrainTypeById@err:{} ====", e);
		}
		return result;
	}

	@Override
	public List<TrainTypeBean> listTrainType() {
		List<TrainTypeBean> result = trainTypeMapper.listTrainType();
		logger.info("==== listTrainType@result:{} ====", result);
		return result;
	}

}
