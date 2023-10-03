package com.zch.subject.domain.service.impl;

import com.zch.subject.domain.convert.SubjectCategoryConverter;
import com.zch.subject.domain.entity.SubjectCategoryBO;
import com.zch.subject.domain.service.SubjectCategoryDomainService;
import com.zch.subject.intra.basic.entity.SubjectCategory;
import com.zch.subject.intra.basic.service.SubjectCategoryService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author Zch
 * @date 2023/10/3
 **/
@Service
public class SubjectCategoryDomainServiceImpl implements SubjectCategoryDomainService {

    @Resource
    private SubjectCategoryService subjectCategoryService;

    @Override
    public void add(SubjectCategoryBO subjectCategoryBO) {
        SubjectCategory subjectCategory =
                SubjectCategoryConverter.INSTANCE.convertBoToCategory(subjectCategoryBO);
        subjectCategoryService.insert(subjectCategory);
    }
}
