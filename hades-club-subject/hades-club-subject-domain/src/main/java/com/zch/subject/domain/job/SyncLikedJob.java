package com.zch.subject.domain.job;

import com.jingdianjichi.subject.domain.service.SubjectLikedDomainService;
import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 同步点赞数据
 *
 * @author: ChickenWing
 * @date: 2024/1/8
 */
@Component
@Slf4j
public class SyncLikedJob {

    @Resource
    private SubjectLikedDomainService subjectLikedDomainService;

    /**
     * 同步点赞数据任务
     */
    @XxlJob("syncLikedJobHandler")
    public void syncLikedJobHandler() throws Exception {
        XxlJobHelper.log("syncLikedJobHandler.start");
        try {
            subjectLikedDomainService.syncLiked();
        } catch (Exception e) {
            XxlJobHelper.log("syncLikedJobHandler.error" + e.getMessage());
        }
    }

}
