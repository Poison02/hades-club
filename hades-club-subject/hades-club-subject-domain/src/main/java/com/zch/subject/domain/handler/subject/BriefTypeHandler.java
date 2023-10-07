package com.zch.subject.domain.handler.subject;

import com.zch.subject.common.enums.SubjectInfoTypeEnum;
import com.zch.subject.domain.entity.SubjectInfoBO;
import com.zch.subject.domain.entity.SubjectOptionBO;
import com.zch.subject.infra.basic.entity.SubjectBrief;
import com.zch.subject.infra.basic.service.SubjectBriefService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @author Zch
 * @date 2023/10/7
 **/
@Component
public class BriefTypeHandler implements SubjectTypeHandler{

    @Resource
    private SubjectBriefService subjectBriefService;

    @Override
    public SubjectInfoTypeEnum getHandlerType() {
        return SubjectInfoTypeEnum.BRIEF;
    }

    @Override
    public void add(SubjectInfoBO subjectInfoBO) {
    }

    @Override
    public SubjectOptionBO query(int subjectId) {
        SubjectBrief subjectBrief = subjectBriefService.queryById(Long.valueOf(subjectId));
        SubjectOptionBO subjectOptionBO = new SubjectOptionBO();
        subjectOptionBO.setSubjectAnswer(subjectBrief.getSubjectAnswer());
        return subjectOptionBO;
    }
}