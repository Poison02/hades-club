package com.zch.subject.domain.service;

import com.zch.subject.domain.entity.SubjectCategoryBO;

import java.util.List;

/**
 * @author Zch
 * @date 2023/10/3
 **/
public interface SubjectCategoryDomainService {

    /**
     * 新增分类
     * @param subjectCategoryBO
     */
    void add(SubjectCategoryBO subjectCategoryBO);

    /**
     * 查询岗位大分类
     * @param subjectCategoryBO
     * @return
     */
    List<SubjectCategoryBO> queryCategory(SubjectCategoryBO subjectCategoryBO);

    /**
     * 更新分类
     * @param subjectCategoryBO
     * @return
     */
    Boolean update(SubjectCategoryBO subjectCategoryBO);

    /**
     * 删除分类
     * @param subjectCategoryBO
     * @return
     */
    Boolean delete(SubjectCategoryBO subjectCategoryBO);
}
