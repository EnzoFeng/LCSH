package com.lcsh.utils;

import com.alibaba.fastjson.JSON;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * 操作文件的工具类
 * Created by fshuaxm on 2017/12/5
 *
 */
public class FileUtil {

	private static final Logger logger = LoggerFactory.getLogger(FileUtil.class);

	/** 
	 * 新建目录 
	 * @param folderPath String 如 c:/fqf 
	 * @return boolean 
	 */ 
	public static void newFolder(String folderPath) { 
		try { 
			String filePath = folderPath; 
			filePath = filePath.toString(); 
			File myFilePath = new File(filePath); 
			if (!myFilePath.exists()) { 
				myFilePath.mkdirs(); 
			} 
		} 
		catch (Exception e) { 
			logger.error("新建目录操作出错:", e);
		}
	} 

	/** 
	 * 新建文件 
	 * @param filePathAndName String 文件路径及名称 如c:/fqf.txt 
	 * @param fileContent String 文件内容 
	 * @return boolean 
	 */ 
	public static void newFile(String filePathAndName, String fileContent) { 

		try { 
			String filePath = filePathAndName; 
			filePath = filePath.toString(); 
			File myFilePath = new File(filePath); 
			if (!myFilePath.exists()) { 
				myFilePath.createNewFile(); 
			} 
			FileWriter resultFile = new FileWriter(myFilePath); 
			PrintWriter myFile = new PrintWriter(resultFile); 
			String strContent = fileContent; 
			myFile.println(strContent); 
			resultFile.close(); 

		} 
		catch (Exception e) { 
			logger.error("新建目录操作出错:", e);
		}

	} 

	/** 
	 * 删除文件 
	 * @param filePathAndName String 文件路径及名称 如c:/fqf.txt 
	 * @return boolean
	 */ 
	public static void delFile(String filePathAndName) { 
		try { 
			String filePath = filePathAndName; 
			filePath = filePath.toString(); 
			File myDelFile = new File(filePath); 
			myDelFile.delete(); 

		} 
		catch (Exception e) { 
			logger.error("删除文件操作出错:", e);
		}

	} 

	/** 
	 * 删除文件夹 
	 * @param folderPath String 文件夹路径及名称 如c:/fqf
	 * @return boolean
	 */ 
	public static void delFolder(String folderPath) { 
		try { 
			delAllFile(folderPath); //删除完里面所有内容 
			String filePath = folderPath; 
			filePath = filePath.toString(); 
			File myFilePath = new File(filePath); 
			myFilePath.delete(); //删除空文件夹 

		} 
		catch (Exception e) { 
			logger.error("删除文件夹操作出错", e);
		}

	} 

	/** 
	 * 删除文件夹里面的所有文件 
	 * @param path String 文件夹路径 如 c:/fqf 
	 */ 
	public static void delAllFile(String path) { 
		File file = new File(path); 
		if (!file.exists()) { 
			return; 
		} 
		if (!file.isDirectory()) { 
			return; 
		} 
		String[] tempList = file.list(); 
		File temp = null; 
		for (int i = 0; i < tempList.length; i++) { 
			if (path.endsWith(File.separator)) { 
				temp = new File(path + tempList[i]); 
			} 
			else { 
				temp = new File(path + File.separator + tempList[i]); 
			} 
			if (temp.isFile()) { 
				temp.delete(); 
			} 
			if (temp.isDirectory()) { 
				delAllFile(path+"/"+ tempList[i]);//先删除文件夹里面的文件 
				delFolder(path+"/"+ tempList[i]);//再删除空文件夹 
			} 
		} 
	}

	/** 
	 * 复制单个文件 
	 * @param oldPath String 原文件路径 如：c:/fqf.txt 
	 * @param newPath String 复制后路径 如：f:/test
	 * @return boolean 
	 */ 
	public static void copyFile(String oldPath, String newPath) { 
		try { 
			int bytesum = 0; 
			int byteread = 0; 
			File oldfile = new File(oldPath); 
			if (oldfile.exists()) { //文件存在时 
				InputStream inStream = new FileInputStream(oldPath); //读入原文件 
				File oldFile=new File(oldPath);
				FileOutputStream fs = new FileOutputStream(newPath+"/"+oldFile.getName()); 
				byte[] buffer = new byte[1444]; 
				while ( (byteread = inStream.read(buffer)) != -1) { 
					bytesum += byteread; //字节数 文件大小 
//					System.out.println(bytesum); 
					fs.write(buffer, 0, byteread); 
				} 
				inStream.close(); 
				fs.close();
			} 
		} 
		catch (Exception e) { 
			logger.error("复制单个文件操作出错", e);
		}
	}

//	public static Map<String, String> _checkFile(CommonsMultipartFile[] files, String uploadType, String allowtype) {
//		Map<String, String> map = new HashMap<>();
//		String msg = "";
//		String status = "0";
//
//		long maxSize = 10485760000L;//Long.parseLong(PropertyFileUtil.get("upload.file.maxSize"));
//		if (null == files || files.length < 1) {
//			status = ResponseCode.FILE_NO_SELECT.getCode();
//			msg = ResponseCode.FILE_NO_SELECT.getMsg();
//			map.put("status", status);
//			map.put("message", msg);
//			return map;
//		}
//		try {
//			for (int i = 0; i < files.length; i++) {
//                // 限制文件大小为10MB
//                if (files[i].getSize() > maxSize) {
//                    status = ResponseCode.FILE_ALLOW_MAXSIZE_ERORR.getCode();
//                    msg = ResponseCode.FILE_ALLOW_MAXSIZE_ERORR.getMsg() + " , 请上传小于10MB的文件";
//                    break;
//                }
//
//				if(!files[i].getOriginalFilename().contains(".")){
//                    status = ResponseCode.FILE_TYPE_ERROR.getCode();
//                    msg = ResponseCode.FILE_TYPE_ERROR.getMsg() + "，请上传允许的文件格式(" + allowtype + ")";
//                    break;
//                }
//                
//				String type = files[i].getOriginalFilename().substring(files[i].getOriginalFilename().lastIndexOf("."));
//				if (StringUtils.isNotBlank(allowtype) && !allowtype.contains(type)) {
//					status = ResponseCode.FILE_TYPE_ERROR.getCode();
//					msg = ResponseCode.FILE_TYPE_ERROR.getMsg() + "，请上传允许的文件格式(" + allowtype + ")";
//					break;
//				}
//
//
//			}
//		} catch (Exception e) {
//			logger.error("检测文件出错:", e);
//			status = ResponseCode.FILE_UPLOAD_FAIL.getCode();
//			msg = ResponseCode.FILE_UPLOAD_FAIL.getMsg();
//		}
//
//		map.put("status", status);
//		map.put("message", msg);
//		return map;
//	}
	

	/**
	 *@Author: huhy
	 *@Package_name:com.dpi.utils
	 *@Date:14:29 2018/2/26
	 *@Description: 拿到上传头像的处理流进行回显
	 */
	public static byte[] getStreamPic(MultipartFile file)throws IOException{
		InputStream inputStream = file.getInputStream();
		byte[] fileStreams = InputStreamUtil.input2Byte(inputStream);
		return  fileStreams;
	}
	/**
	 *@Author: huhy
	 *@Package_name:com.dpi.utils
	 *@Date:11:03 2018/2/27
	 *@Description:  吧图片上传到服务器的文件夹下
	 */
	public static String uploadPicture(@RequestParam(value="file",required=false)MultipartFile file,
								HttpServletRequest request){

		File targetFile=null;
		String fileName=file.getOriginalFilename();//获取文件名加后缀
		if(fileName!=null&&fileName!=""){
			String path = request.getSession().getServletContext().getRealPath("/file"); //文件存储位置
			String fileF = fileName.substring(fileName.lastIndexOf("."), fileName.length());//文件后缀
			fileName=System.currentTimeMillis()+"_"+new Random().nextInt(1000)+fileF;//新的文件名

			//先判断文件是否存在
			File file1 =new File(path+"/");
			//如果文件夹不存在则创建
			if(!file1.exists()  && !file1.isDirectory()){
				file1.mkdir();
			}
			targetFile = new File(file1, fileName);
			try {
				file.transferTo(targetFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return fileName;
	}
	/**
	 *@Author: huhy
	 *@Package_name:com.dpi.utils
	 *@Date:14:10 2018/2/28
	 *@Description: byte[] 数组转成 file文件
	 */
	public static void byteToFile(byte[] buf,  String fileName,HttpServletRequest request)
	{
		BufferedOutputStream bufferOut = null;
		FileOutputStream fileOut = null;
		File file = null;
		String filePath = request.getSession().getServletContext().getRealPath("/file"); //文件存储位置

		try
		{
			File resFile = new File(filePath);
			if (!resFile.exists() && resFile.isDirectory())
			{
				resFile.mkdirs();
			}
			file = new File(filePath + File.separator + fileName);
			//如果文件存在，就删除
			if(file.exists()){
				file.delete();
			}
			fileOut = new FileOutputStream(file);
			bufferOut = new BufferedOutputStream(fileOut);
			bufferOut.write(buf);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if (bufferOut != null)
			{
				try
				{
					bufferOut.close();
				}
				catch (IOException e)
				{
					e.printStackTrace();
				}
			}
			if (fileOut != null)
			{
				try
				{
					fileOut.close();
				}
				catch (IOException e)
				{
					e.printStackTrace();
				}
			}
		}

	}

}