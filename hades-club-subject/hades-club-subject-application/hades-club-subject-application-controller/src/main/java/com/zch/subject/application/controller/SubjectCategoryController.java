package com.zch.subject.application.controller;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Preconditions;
import com.zch.subject.application.convert.SubjectCategoryDTOConverter;
import com.zch.subject.application.dto.SubjectCategoryDTO;
import com.zch.subject.common.entity.Result;
import com.zch.subject.domain.entity.SubjectCategoryBO;
import com.zch.subject.domain.service.SubjectCategoryDomainService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
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
@Slf4j
public class SubjectCategoryController {

    @Resource
    private SubjectCategoryDomainService subjectCategoryDomainService;

    @PostMapping("/add")
    public Result<Boolean> add(@RequestBody SubjectCategoryDTO subjectCategoryDTO) {
        try {
            // 这里其实是为了优化日志，只有设置为info级别才会打印这里
            if (log.isInfoEnabled()) {
                log.info("SubjectCategoryController.add.dto:{}", JSON.toJSONString(subjectCategoryDTO));
            }
            // 这里使用Guava的断言进行参数的校验
            Preconditions.checkNotNull(subjectCategoryDTO.getCategoryType(),"分类类型不能为空");
            Preconditions.checkNotNull(subjectCategoryDTO.getCategoryName(),"分类名称不能为空");
            Preconditions.checkNotNull(subjectCategoryDTO.getParentId(),"分类父级id不能为空");

            SubjectCategoryBO subjectCategoryBO = SubjectCategoryDTOConverter.INSTANCE.convertDTOToBO(subjectCategoryDTO);
            subjectCategoryDomainService.add(subjectCategoryBO);
            return Result.ok(true);
        } catch (Exception e) {
            log.error("SubjectCategoryController.add.error:{}",e.getMessage(),e);
            return Result.fail(e.getMessage());
        }

    }

}
