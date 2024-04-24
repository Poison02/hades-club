package com.zch.subject.application.controller;

import com.jingdianjichi.subject.infra.entity.UserInfo;
import com.jingdianjichi.subject.infra.rpc.UserRpc;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 刷题分类controller
 *
 * @author: ChickenWing
 * @date: 2023/10/1
 */
@RestController
@RequestMapping("/subject/category")
@Slf4j
public class TestFeignController {

    @Resource
    private UserRpc userRpc;

    @GetMapping("testFeign")
    public void testFeign() {
        UserInfo userInfo = userRpc.getUserInfo("jichi");
        log.info("testFeign.userInfo:{}", userInfo);
    }

}
