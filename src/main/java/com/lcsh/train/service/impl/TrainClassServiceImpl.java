package com.lcsh.train.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lcsh.train.bean.TrainClassBean;
import com.lcsh.train.mapper.TrainClassMapper;
import com.lcsh.train.service.TrainClassService;

/**
 * @author FengZhen
 * @date Apr 4, 2019
 * 
 */
@Service
public class TrainClassServiceImpl implements TrainClassService{

	@Autowired
	TrainClassMapper trainClassMapper;
	
	@Override
	public String addTrainClass(TrainClassBean bean) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateTrainClassById(TrainClassBean TrainClassBean) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public TrainClassBean queryById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TrainClassBean queryByTrainClassName(String trainClassName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TrainClassBean> queryByTypeId(int typeId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteTrainClassById(Long id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<TrainClassBean> listTrainClass() {
		// TODO Auto-generated method stub
		return null;
	}

}
