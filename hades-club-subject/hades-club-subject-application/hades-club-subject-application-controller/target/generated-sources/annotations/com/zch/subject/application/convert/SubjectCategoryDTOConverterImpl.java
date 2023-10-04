package com.zch.subject.application.convert;

import com.zch.subject.application.dto.SubjectCategoryDTO;
import com.zch.subject.domain.entity.SubjectCategoryBO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-10-04T13:02:19+0800",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_341 (Oracle Corporation)"
)
public class SubjectCategoryDTOConverterImpl implements SubjectCategoryDTOConverter {

    @Override
    public SubjectCategoryBO convertDTOToBO(SubjectCategoryDTO subjectCategoryDTO) {
        if ( subjectCategoryDTO == null ) {
            return null;
        }

        SubjectCategoryBO subjectCategoryBO = new SubjectCategoryBO();

        subjectCategoryBO.setId( subjectCategoryDTO.getId() );
        subjectCategoryBO.setCategoryName( subjectCategoryDTO.getCategoryName() );
        subjectCategoryBO.setCategoryType( subjectCategoryDTO.getCategoryType() );
        subjectCategoryBO.setImageUrl( subjectCategoryDTO.getImageUrl() );
        subjectCategoryBO.setParentId( subjectCategoryDTO.getParentId() );

        return subjectCategoryBO;
    }

    @Override
    public List<SubjectCategoryDTO> convertBoToDTO(List<SubjectCategoryBO> subjectCategoryBOList) {
        if ( subjectCategoryBOList == null ) {
            return null;
        }

        List<SubjectCategoryDTO> list = new ArrayList<SubjectCategoryDTO>( subjectCategoryBOList.size() );
        for ( SubjectCategoryBO subjectCategoryBO : subjectCategoryBOList ) {
            list.add( subjectCategoryBOToSubjectCategoryDTO( subjectCategoryBO ) );
        }

        return list;
    }

    protected SubjectCategoryDTO subjectCategoryBOToSubjectCategoryDTO(SubjectCategoryBO subjectCategoryBO) {
        if ( subjectCategoryBO == null ) {
            return null;
        }

        SubjectCategoryDTO subjectCategoryDTO = new SubjectCategoryDTO();

        subjectCategoryDTO.setId( subjectCategoryBO.getId() );
        subjectCategoryDTO.setCategoryName( subjectCategoryBO.getCategoryName() );
        subjectCategoryDTO.setCategoryType( subjectCategoryBO.getCategoryType() );
        subjectCategoryDTO.setImageUrl( subjectCategoryBO.getImageUrl() );
        subjectCategoryDTO.setParentId( subjectCategoryBO.getParentId() );

        return subjectCategoryDTO;
    }
}
