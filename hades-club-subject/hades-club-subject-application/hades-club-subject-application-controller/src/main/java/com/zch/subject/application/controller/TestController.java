package com.zch.subject.application.controller;

import com.zch.subject.infra.basic.entity.SubjectCategory;
import com.zch.subject.infra.basic.service.SubjectCategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author Zch
 * @date 2023/10/3
 **/
@RestController
public class TestController {

    @Resource
    private SubjectCategoryService service;

    @GetMapping("/test")
    public String test() {
        SubjectCategory subjectCategory = service.queryById(1L);
        return subjectCategory.getCategoryName();
    }

}
