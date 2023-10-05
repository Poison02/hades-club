package com.zch.subject.domain.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * @author Zch
 * @date 2023/10/5
 **/
@Data
public class SubjectLabelBO implements Serializable {

    /**
     * 主键
     */
    private Long id;

    /**
     * 标签分类
     */
    private String labelName;

    /**
     * 排序
     */
    private Integer sortNum;

    /**
     * 分类id
     */
    private Long categoryId;

}
