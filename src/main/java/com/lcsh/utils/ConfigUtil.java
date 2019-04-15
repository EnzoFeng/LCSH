package com.lcsh.utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

/**
 * @author: FengZhen
 * @create: 2019-01-29
 */
public class ConfigUtil {
    /**
     * 从指定文件获取配置
     * @param file
     * @param key
     * @return
     */
    public static String getConfig(String file, String key){
        Properties prop = new Properties();
        InputStream inputStream = ConfigUtil.class.getClassLoader().getResourceAsStream(file);
        try {
            prop.load(new InputStreamReader(inputStream, "utf-8"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        String value = prop.get(key).toString();
        return value;
    }
    
    /**
     * 从当前配置文件获取配置
     * @param key
     * @return
     */
    public static String getConfig(String key) {
    	String mode = getConfig("config-current.properties","mode");
    	String configFile = "config-" + mode + ".properties";
    	String value = getConfig(configFile, key);
    	return value;
    }
}
