package com.zch.subject.domain.handler.subject;

import com.zch.subject.common.enums.IsDeletedFlagEnum;
import com.zch.subject.common.enums.SubjectInfoTypeEnum;
import com.zch.subject.domain.convert.BriefSubjectConverter;
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
        SubjectBrief subjectBrief = BriefSubjectConverter.INSTANCE.convertBoToEntity(subjectInfoBO);
        subjectBrief.setSubjectId(subjectInfoBO.getId());
        subjectBrief.setIsDeleted(IsDeletedFlagEnum.UN_DELETED.getCode());
        subjectBriefService.insert(subjectBrief);
    }

    @Override
    public SubjectOptionBO query(int subjectId) {
        SubjectBrief subjectBrief = new SubjectBrief();
        subjectBrief.setSubjectId(Long.valueOf(subjectId));
        SubjectBrief result = subjectBriefService.queryByCondition(subjectBrief);
        SubjectOptionBO subjectOptionBO = new SubjectOptionBO();
        subjectOptionBO.setSubjectAnswer(result.getSubjectAnswer());
        return subjectOptionBO;
    }
}