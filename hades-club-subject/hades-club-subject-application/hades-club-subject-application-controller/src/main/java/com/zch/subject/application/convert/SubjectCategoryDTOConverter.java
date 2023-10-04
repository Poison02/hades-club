package com.zch.subject.application.convert;

import com.zch.subject.application.dto.SubjectCategoryDTO;
import com.zch.subject.domain.entity.SubjectCategoryBO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * @author Zch
 * @date 2023/10/3
 **/
@Mapper
public interface SubjectCategoryDTOConverter {

    SubjectCategoryDTOConverter INSTANCE = Mappers.getMapper(SubjectCategoryDTOConverter.class);

    SubjectCategoryBO convertDTOToBO(SubjectCategoryDTO subjectCategoryDTO);

    List<SubjectCategoryDTO> convertBoToDTO(List<SubjectCategoryBO> subjectCategoryBOList);

}
