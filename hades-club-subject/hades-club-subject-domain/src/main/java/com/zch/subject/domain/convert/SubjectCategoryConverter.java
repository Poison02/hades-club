package com.zch.subject.domain.convert;

import com.zch.subject.domain.entity.SubjectCategoryBO;
import com.zch.subject.intra.basic.entity.SubjectCategory;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author Zch
 * @date 2023/10/3
 **/
@Mapper
public interface SubjectCategoryConverter {

    SubjectCategoryConverter INSTANCE = Mappers.getMapper(SubjectCategoryConverter.class);

    SubjectCategory convertBoToCategory(SubjectCategoryBO subjectCategoryBO);

}
