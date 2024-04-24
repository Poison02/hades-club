package com.zch.practice.api.req;

import com.jingdianjichi.practice.api.common.PageInfo;
import lombok.Data;

import java.io.Serializable;

@Data
public class GetUnCompletePracticeReq implements Serializable {

    /**
     * 分页信息
     */
    private PageInfo pageInfo;

}