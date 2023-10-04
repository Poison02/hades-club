package com.zch.subject.domain.service;

import com.zch.subject.domain.entity.SubjectCategoryBO;

import java.util.List;

/**
 * @author Zch
 * @date 2023/10/3
 **/
public interface SubjectCategoryDomainService {

    void add(SubjectCategoryBO subjectCategoryBO);

    List<SubjectCategoryBO> queryCategory(SubjectCategoryBO subjectCategoryBO);

}
