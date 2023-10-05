package com.zch.subject.domain.convert;

import com.zch.subject.domain.entity.SubjectLabelBO;
import com.zch.subject.infra.basic.entity.SubjectLabel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author Zch
 * @date 2023/10/5
 **/
@Mapper
public interface SubjectLabelConverter {

    SubjectLabelConverter INSTANCE = Mappers.getMapper(SubjectLabelConverter.class);

    SubjectLabel convertBoToLabel(SubjectLabelBO subjectLabelBO);

}
