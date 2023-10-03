package com.zch.subject.domain.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * @author Zch
 * @date 2023/10/3
 **/
@Data
public class SubjectCategoryBO implements Serializable {

    /**
     * 主键
     */
    private Long id;

    /**
     * 分类名称
     */
    private String categoryName;

    /**
     * 分类类型
     */
    private Integer categoryType;

    /**
     * 图标连接
     */
    private String imageUrl;

    /**
     * 父级id
     */
    private Long parentId;

}
