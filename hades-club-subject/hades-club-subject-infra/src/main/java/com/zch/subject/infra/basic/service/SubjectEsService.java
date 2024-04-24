package com.zch.subject.infra.basic.service;

import com.jingdianjichi.subject.common.entity.PageResult;
import com.jingdianjichi.subject.infra.basic.entity.SubjectInfoEs;

public interface SubjectEsService {

    boolean insert(SubjectInfoEs subjectInfoEs);

    PageResult<SubjectInfoEs> querySubjectList(SubjectInfoEs subjectInfoEs);

}
