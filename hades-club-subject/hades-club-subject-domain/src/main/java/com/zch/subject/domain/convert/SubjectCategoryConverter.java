package com.zch.subject.domain.convert;

import com.zch.subject.domain.entity.SubjectCategoryBO;
import com.zch.subject.infra.basic.entity.SubjectCategory;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * @author Zch
 * @date 2023/10/3
 **/
@Mapper
public interface SubjectCategoryConverter {

    SubjectCategoryConverter INSTANCE = Mappers.getMapper(SubjectCategoryConverter.class);

    SubjectCategory convertBoToCategory(SubjectCategoryBO subjectCategoryBO);

    List<SubjectCategoryBO> convertCategoryToBo(List<SubjectCategory> subjectCategoryList);

}
