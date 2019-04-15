package com.lcsh.train.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.lcsh.commons.bean.Result;
import com.lcsh.commons.bean.StateCode;
import com.lcsh.utils.ConfigUtil;
import com.lcsh.utils.DateUtil;
import com.lcsh.utils.DownloadUtil;
import com.lcsh.utils.JsonUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * @author FengZhen
 * @date Apr 4, 2019
 * 培训类型管理
 */
@Api(tags = "培训类型")
@Controller
@RequestMapping("/trainType")
public class TrainTypeController {

private Logger logger = LoggerFactory.getLogger(getClass());
	
	
	@Autowired
	TrainTypeService TrainTypeService;
	
	@ApiOperation(value="学员添加",notes="姓名、手机号、邮箱、身份证号、地区编码都不能为空")
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public void addTrainType(PrintWriter pw, @RequestBody @Validated TrainTypeBean TrainTypeBean) {
		Result responseMsg = new Result();
		logger.info("==== addTrainType@params:{} ====", TrainTypeBean);
		
		//该学员信息可用，执行插入操作
		String errorMsg = TrainTypeService.addTrainType(TrainTypeBean);
		if (!StringUtils.isBlank(errorMsg)) {
			logger.error("==== addTrainType@{} ====", errorMsg);
			responseMsg.set(StateCode.FAILD, errorMsg);
			String result = JsonUtil.obj2Json(responseMsg);
			pw.write(result);
			return;
		}
		responseMsg.set(StateCode.SUCCESS, "学员添加成功！");
		String result = JsonUtil.obj2Json(responseMsg);
		pw.write(result);
	}
	
	//@ApiOperation(value="学员信息模板下载",notes="下载Excel",produces="application/octet-stream")
	@RequestMapping(value = "/downloadModel", method=RequestMethod.GET)
	@ResponseBody
    public void download(HttpServletRequest request,HttpServletResponse response) throws Exception{
        String modelPath = this.getClass().getClassLoader().getResource("/").getPath() + "/file/联创世华学员信息录入模板.xlsx";
        DownloadUtil.download(modelPath, response);
    }
	
	@ApiOperation(value="学员批量添加",notes="上传Excel")
	@RequestMapping(value = "/batchAdd", method=RequestMethod.POST, headers="content-type=multipart/form-data")
	@ResponseBody
	public void batchAddTrainType(HttpServletRequest request, PrintWriter pw, @ApiParam(value="学员列表Excel",required=true) MultipartFile file) {
		Result responseMsg = new Result();
		logger.info("==== batchAddTrainType@params:{} ====");
		
		try {
			//原始名
			String originalFileName = file.getOriginalFilename();
			//可存储进MySQL
			InputStream inputStream = file.getInputStream();
			//byte[] fileStreams = InputStreamUtil.input2Byte(inputStream);
			//获取后缀名
			String type = originalFileName.substring(originalFileName.indexOf(".") + 1);
			//取当前时间作为文件名开头
			String filename = DateUtil.parseDateToStr(new Date(), DateUtil.DATE_FORMAT_YYYYMMDDHHmm) + "_" + file.getOriginalFilename();
			// 生成文件
			String filePath = ConfigUtil.getConfig("filePath");
			String path = filePath + filename;
			File destFile = new File(path);
			FileUtils.copyInputStreamToFile(inputStream, destFile);
			logger.info("==== batchAddTrainType@xmlPath:{} ====",path);
			//解析xml文件
			TrainTypeService.batchAddTrainType(path);
			logger.info("==== batchAddTrainType@success ====");
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		responseMsg.set(StateCode.SUCCESS, "学员批量添加成功！");
		String result = JsonUtil.obj2Json(responseMsg);
		pw.write(result);
	}
	
	@ApiOperation(value = "学员列表", notes = "查看学员列表")
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public void listTrainType(PrintWriter pw) {
		Result responseMsg = new Result();
		List<TrainTypeBean> TrainTypeBeans = TrainTypeService.listTrainType();
		responseMsg.set(StateCode.SUCCESS, "查询成功!", TrainTypeBeans);
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== listTrainType@result:{} ====", result);
		pw.write(result);
	}
	
	@ApiOperation(value = "根据学员名查询", notes = "根据学员名查询学员信息")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "name", value = "学员名", dataType = "String", paramType = "query")
	})
	@RequestMapping(value = "/name", method = RequestMethod.POST)
	@ResponseBody
	public void queryByName(PrintWriter pw, @RequestParam String name) {
		logger.info("==== queryByName@params:{} ====", name);
		Result responseMsg = new Result();
		List<TrainTypeBean> TrainTypeBeans = TrainTypeService.queryByName(name);
		responseMsg.set(StateCode.SUCCESS, "学员查询成功!", TrainTypeBeans);
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== queryByName@result:{} ====", result);
		pw.write(result);
	}
	
	@ApiOperation(value = "根据学员身份证号查询", notes = "根据学员身份证号查询学员信息")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "idCard", value = "学员身份证号", dataType = "String", paramType = "query")
	})
	@RequestMapping(value = "/idCard", method = RequestMethod.POST)
	@ResponseBody
	public void queryByIdCard(PrintWriter pw, @RequestParam String idCard) {
		logger.info("==== queryByIdCard@params:{} ====", idCard);
		Result responseMsg = new Result();
		TrainTypeBean TrainTypeBean = TrainTypeService.queryByIdCard(idCard);
		responseMsg.set(StateCode.SUCCESS, "学员查询成功!", TrainTypeBean);
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== queryByIdCard@result:{} ====", result);
		pw.write(result);
	}
	
	@ApiOperation(value = "根据手机号查询", notes = "根据手机号查询学员信息")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "phone", value = "手机号", dataType = "String", paramType = "query")
	})
	@RequestMapping(value = "/phone", method = RequestMethod.POST)
	@ResponseBody
	public void queryByPhone(PrintWriter pw, @RequestParam String phone) {
		logger.info("==== queryByPhone@params:{} ====", phone);
		Result responseMsg = new Result();
		TrainTypeBean TrainTypeBean = TrainTypeService.queryByPhone(phone);
		responseMsg.set(StateCode.SUCCESS, "学员查询成功!", TrainTypeBean);
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== queryByPhone@result:{} ====", result);
		pw.write(result);
	}
	
	@ApiOperation(value = "根据邮箱查询", notes = "根据邮箱查询学员信息")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "email", value = "邮箱", dataType = "String", paramType = "query")
	})
	@RequestMapping(value = "/email", method = RequestMethod.POST)
	@ResponseBody
	public void queryByEmail(PrintWriter pw,  @RequestParam String email) {
		logger.info("==== queryByEmail@params:{} ====", email);
		Result responseMsg = new Result();
		TrainTypeBean TrainTypeBean = TrainTypeService.queryByEmail(email);
		responseMsg.set(StateCode.SUCCESS, "学员查询成功!", TrainTypeBean);
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== queryByEmail@result:{} ====", result);
		pw.write(result);
	}
	
	@ApiOperation(value = "根据id删除学员", notes = "根据id删除学员信息")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "id", value = "邮箱", dataType = "Long", paramType = "query")
	})
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@ResponseBody
	public void deleteTrainType(PrintWriter pw,  @RequestParam Long id) {
		logger.info("==== deleteTrainType@params:{} ====", id);
		Result responseMsg = new Result();
		boolean operateResult = TrainTypeService.deleteTrainTypeById(id);
		if (operateResult) {
			responseMsg.set(StateCode.SUCCESS, "操作成功!");
		}else {
			responseMsg.set(StateCode.FAILD, "操作失败!");
		}
		
		String result = JsonUtil.obj2Json(responseMsg);
		logger.info("==== deleteTrainType@result:{} ====", result);
		pw.write(result);
	}
	
	
}
