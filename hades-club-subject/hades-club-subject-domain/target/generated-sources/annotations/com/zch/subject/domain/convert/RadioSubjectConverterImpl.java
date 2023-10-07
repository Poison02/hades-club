package com.zch.subject.domain.convert;

import com.zch.subject.domain.entity.SubjectAnswerBO;
import com.zch.subject.infra.basic.entity.SubjectRadio;
import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-10-07T17:13:25+0800",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_341 (Oracle Corporation)"
)
public class RadioSubjectConverterImpl implements RadioSubjectConverter {

    @Override
    public SubjectRadio convertBoToEntity(SubjectAnswerBO subjectAnswerBO) {
        if ( subjectAnswerBO == null ) {
            return null;
        }

        SubjectRadio subjectRadio = new SubjectRadio();

        subjectRadio.setOptionType( subjectAnswerBO.getOptionType() );
        subjectRadio.setOptionContent( subjectAnswerBO.getOptionContent() );
        subjectRadio.setIsCorrect( subjectAnswerBO.getIsCorrect() );

        return subjectRadio;
    }
}
