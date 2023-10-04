package com.zch.subject.domain.service.impl;

import com.alibaba.fastjson.JSON;
import com.zch.subject.domain.convert.SubjectCategoryConverter;
import com.zch.subject.domain.entity.SubjectCategoryBO;
import com.zch.subject.domain.service.SubjectCategoryDomainService;
import com.zch.subject.intra.basic.entity.SubjectCategory;
import com.zch.subject.intra.basic.service.SubjectCategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zch
 * @date 2023/10/3
 **/
@Service
@Slf4j
public class SubjectCategoryDomainServiceImpl implements SubjectCategoryDomainService {

    @Resource
    private SubjectCategoryService subjectCategoryService;

    @Override
    public void add(SubjectCategoryBO subjectCategoryBO) {
        SubjectCategory subjectCategory =
                SubjectCategoryConverter.INSTANCE.convertBoToCategory(subjectCategoryBO);
        subjectCategoryService.insert(subjectCategory);
    }

    @Override
    public List<SubjectCategoryBO> queryCategory(SubjectCategoryBO subjectCategoryBO) {
        SubjectCategory subjectCategory =
                SubjectCategoryConverter.INSTANCE.convertBoToCategory(subjectCategoryBO);
        List<SubjectCategory> subjectCategoryList = subjectCategoryService.queryCategory(subjectCategory);
        List<SubjectCategoryBO> subjectCategoryBOList =
                SubjectCategoryConverter.INSTANCE.convertCategoryToBo(subjectCategoryList);
        if(log.isInfoEnabled()){
            log.info("SubjectCategoryController.queryPrimaryCategory.boList:{}",
                    JSON.toJSONString(subjectCategoryBOList));
        }
        return subjectCategoryBOList;
    }
}
