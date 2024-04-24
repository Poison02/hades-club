package com.zch.subject;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author Zch
 * @date 2023/10/3
 **/
@SpringBootApplication
@ComponentScan("com.zch")
@MapperScan("com.zch.**.mapper")
@EnableFeignClients(basePackages = "com.zch")
public class SubjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubjectApplication.class, args);
    }

}
