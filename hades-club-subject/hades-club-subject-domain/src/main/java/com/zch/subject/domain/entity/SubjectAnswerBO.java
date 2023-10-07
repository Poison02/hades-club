package com.zch.subject.domain.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * @author Zch
 * @date 2023/10/7
 **/
@Data
public class SubjectAnswerBO implements Serializable {

    /**
     * 答案选项标识
     */
    private Integer optionType;

    /**
     * 答案
     */
    private String optionContent;

    /**
     * 是否正确
     */
    private Integer isCorrect;

}
