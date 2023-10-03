package com.zch.subject.application.controller;

import com.zch.subject.application.convert.SubjectCategoryDTOConverter;
import com.zch.subject.application.dto.SubjectCategoryDTO;
import com.zch.subject.common.entity.Result;
import com.zch.subject.domain.entity.SubjectCategoryBO;
import com.zch.subject.domain.service.SubjectCategoryDomainService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author Zch
 * @date 2023/10/3
 **/
@RestController
@RequestMapping("/subject/category")
public class SubjectCategoryController {

    @Resource
    private SubjectCategoryDomainService subjectCategoryDomainService;

    @PostMapping("/add")
    public Result<Boolean> add(@RequestBody SubjectCategoryDTO subjectCategoryDTO) {
        SubjectCategoryBO subjectCategoryBO = SubjectCategoryDTOConverter.INSTANCE.convertDTOToBO(subjectCategoryDTO);
        subjectCategoryDomainService.add(subjectCategoryBO);
        return Result.ok(true);
    }

}
