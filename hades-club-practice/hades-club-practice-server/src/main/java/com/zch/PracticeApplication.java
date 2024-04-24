package com.zch;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author Poison02
 * @date 2024/4/24
 */
@SpringBootApplication
@ComponentScan("com.zch")
@MapperScan("com.zch.**.dao")
@EnableFeignClients(basePackages = "com.zch")
public class PracticeApplication {

    public static void main(String[] args) {
        SpringApplication.run(PracticeApplication.class);
    }

}