package com.zch.subject.domain.convert;

import com.zch.subject.domain.entity.SubjectInfoBO;
import com.zch.subject.infra.basic.entity.SubjectBrief;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author Zch
 * @date 2023/10/9
 **/
@Mapper
public interface BriefSubjectConverter {

    BriefSubjectConverter INSTANCE = Mappers.getMapper(BriefSubjectConverter.class);

    SubjectBrief convertBoToEntity(SubjectInfoBO subjectInfoBO);

}
