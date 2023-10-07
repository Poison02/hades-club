package com.zch.subject.domain.service;

import com.zch.subject.common.entity.PageResult;
import com.zch.subject.domain.entity.SubjectInfoBO;

/**
 * @author Zch
 * @date 2023/10/7
 **/
public interface SubjectInfoDomainService {

    /**
     * 新增题目
     */
    void add(SubjectInfoBO subjectInfoBO);

    /**
     * 分页查询
     */
    PageResult<SubjectInfoBO> getSubjectPage(SubjectInfoBO subjectInfoBO);

    /**
     * 查询题目信息
     */
    SubjectInfoBO querySubjectInfo(SubjectInfoBO subjectInfoBO);

}
