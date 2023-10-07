package com.zch.subject.domain.handler.subject;

import com.zch.subject.common.enums.SubjectInfoTypeEnum;
import com.zch.subject.domain.entity.SubjectInfoBO;
import com.zch.subject.domain.entity.SubjectOptionBO;
import org.springframework.stereotype.Component;

/**
 * @author Zch
 * @date 2023/10/7
 **/
@Component
public class MultipleTypeHandler implements SubjectTypeHandler{

    @Override
    public SubjectInfoTypeEnum getHandlerType() {
        return SubjectInfoTypeEnum.MULTIPLE;
    }

    @Override
    public void add(SubjectInfoBO subjectInfoBO) {
    }

    @Override
    public SubjectOptionBO query(int subjectId) {
        return null;
    }
}