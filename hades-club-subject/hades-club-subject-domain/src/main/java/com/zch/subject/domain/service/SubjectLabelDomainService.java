package com.zch.subject.domain.service;

import com.jingdianjichi.subject.domain.entity.SubjectLabelBO;

import java.util.List;

/**
 * 题目标签领域服务
 * 
 * @author: ChickenWing
 * @date: 2023/10/3
 */
public interface SubjectLabelDomainService {

    /**
     * 新增标签
     */
    Boolean add(SubjectLabelBO subjectLabelBO);

    /**
     * 更新标签
     */
    Boolean update(SubjectLabelBO subjectLabelBO);

    /**
     * 删除标签
     */
    Boolean delete(SubjectLabelBO subjectLabelBO);

    /**
     * 查询分类下标签
     */
    List<SubjectLabelBO> queryLabelByCategoryId(SubjectLabelBO subjectLabelBO);

}
