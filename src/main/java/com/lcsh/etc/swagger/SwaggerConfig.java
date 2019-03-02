package com.lcsh.etc.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport; 

import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

 
/**
 * @author FengZhen
 * @date 2018年12月24日
 * 
 */
@Configuration
@EnableSwagger2
@ComponentScan(basePackages = {"com.lcsh.*"})   
@EnableWebMvc
public class SwaggerConfig extends WebMvcConfigurationSupport {

    @Bean
    public Docket customDocket() {
        //
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        Contact contact = new Contact("FengZhen", "https://www.cnblogs.com/EnzoDin/", "15810544160@163.com");
        return new ApiInfo("联创世华",//大标题 title
                "学员管理系统",//小标题
                "0.0.1",//版本
                "http://localhost:8080/LCSH/swagger-ui.html#/",//termsOfServiceUrl
                contact,//作者
                "swagger-home",//链接显示文字
                "http://localhost:8080/LCSH/swagger-ui.html#/"//网站链接
                //null
        );
    }
    
      
}