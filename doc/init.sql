/*
Navicat MySQL Data Transfer

Source Server         : 117.72.14.166
Source Server Version : 50743
Source Host           : 117.72.14.166:3306
Source Database       : jc-club

Target Server Type    : MYSQL
Target Server Version : 50743
File Encoding         : 65001

Date: 2023-12-09 15:58:16
*/

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission`
(
    `id`             bigint(20) NOT NULL AUTO_INCREMENT,
    `name`           varchar(64)  DEFAULT NULL COMMENT '权限名称',
    `parent_id`      bigint(20)   DEFAULT NULL COMMENT '父id',
    `type`           tinyint(4)   DEFAULT NULL COMMENT '权限类型 0菜单 1操作',
    `menu_url`       varchar(255) DEFAULT NULL COMMENT '菜单路由',
    `status`         tinyint(2)   DEFAULT NULL COMMENT '状态 0启用 1禁用',
    `show`           tinyint(2)   DEFAULT NULL COMMENT '展示状态 0展示 1隐藏',
    `icon`           varchar(128) DEFAULT NULL COMMENT '图标',
    `permission_key` varchar(64)  DEFAULT NULL COMMENT '权限唯一标识',
    `created_by`     varchar(32)  DEFAULT NULL COMMENT '创建人',
    `created_time`   datetime     DEFAULT NULL COMMENT '创建时间',
    `update_by`      varchar(32)  DEFAULT NULL COMMENT '更新人',
    `update_time`    datetime     DEFAULT NULL COMMENT '更新时间',
    `is_deleted`     int(11)      DEFAULT '0' COMMENT '是否被删除 0为删除 1已删除',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission`
VALUES ('1', '新增题目', '0', '1', 'ladiwd/www', '0', '0', 'http://1.png', 'subject:add', '', '2023-11-12 16:17:08', '',
        '2023-11-12 16:17:12', '0');

-- ----------------------------
-- Table structure for auth_role
-- ----------------------------
DROP TABLE IF EXISTS `auth_role`;
CREATE TABLE `auth_role`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT,
    `role_name`    varchar(32) DEFAULT NULL COMMENT '角色名称',
    `role_key`     varchar(64) DEFAULT NULL COMMENT '角色唯一标识',
    `created_by`   varchar(32) DEFAULT NULL COMMENT '创建人',
    `created_time` datetime    DEFAULT NULL COMMENT '创建时间',
    `update_by`    varchar(32) DEFAULT NULL COMMENT '更新人',
    `update_time`  datetime    DEFAULT NULL COMMENT '更新时间',
    `is_deleted`   int(11)     DEFAULT '0' COMMENT '是否被删除 0未删除 1已删除',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of auth_role
-- ----------------------------
INSERT INTO `auth_role`
VALUES ('1', '管理员', 'admin_user', '', '2023-11-12 16:15:56', '', '2023-11-12 16:16:07', '0');
INSERT INTO `auth_role`
VALUES ('2', '普通用户', 'normal_user', '', '2023-11-12 16:16:00', '', '2023-11-12 16:16:10', '0');

-- ----------------------------
-- Table structure for auth_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_role_permission`;
CREATE TABLE `auth_role_permission`
(
    `id`            bigint(20) NOT NULL AUTO_INCREMENT,
    `role_id`       bigint(20)  DEFAULT NULL COMMENT '角色id',
    `permission_id` bigint(20)  DEFAULT NULL COMMENT '权限id',
    `created_by`    varchar(32) DEFAULT NULL COMMENT '创建人',
    `created_time`  datetime    DEFAULT NULL COMMENT '创建时间',
    `update_by`     varchar(32) DEFAULT NULL COMMENT '更新人',
    `update_time`   datetime    DEFAULT NULL COMMENT '更新时间',
    `is_deleted`    int(11)     DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = utf8 COMMENT ='角色权限关联表';

-- ----------------------------
-- Records of auth_role_permission
-- ----------------------------
INSERT INTO `auth_role_permission`
VALUES ('1', '2', '1', null, '2023-11-12 16:17:31', null, '2023-11-12 16:17:34', '0');

-- ----------------------------
-- Table structure for auth_user
-- ----------------------------
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `user_name`    varchar(32)  DEFAULT NULL COMMENT '用户名称/账号',
    `nick_name`    varchar(32)  DEFAULT NULL COMMENT '昵称',
    `email`        varchar(32)  DEFAULT NULL COMMENT '邮箱',
    `phone`        varchar(32)  DEFAULT NULL COMMENT '手机号',
    `password`     varchar(64)  DEFAULT NULL COMMENT '密码',
    `sex`          tinyint(2)   DEFAULT NULL COMMENT '性别',
    `avatar`       varchar(255) DEFAULT NULL COMMENT '头像',
    `status`       tinyint(2)   DEFAULT NULL COMMENT '状态 0启用 1禁用',
    `introduce`    varchar(255) DEFAULT NULL COMMENT '个人介绍',
    `ext_json`     varchar(255) DEFAULT NULL COMMENT '特殊字段',
    `created_by`   varchar(32)  DEFAULT NULL COMMENT '创建人',
    `created_time` datetime     DEFAULT NULL COMMENT '创建时间',
    `update_by`    varchar(32)  DEFAULT NULL COMMENT '更新人',
    `update_time`  datetime     DEFAULT NULL COMMENT '更新时间',
    `is_deleted`   int(11)      DEFAULT '0' COMMENT '是否被删除 0未删除 1已删除',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='用户信息表';

-- ----------------------------
-- Records of auth_user
-- ----------------------------

-- ----------------------------
-- Table structure for auth_user_role
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_role`;
CREATE TABLE `auth_user_role`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `user_id`      bigint(20)  DEFAULT NULL COMMENT '用户id',
    `role_id`      bigint(20)  DEFAULT NULL COMMENT '角色id',
    `created_by`   varchar(32) DEFAULT NULL COMMENT '创建人',
    `created_time` datetime    DEFAULT NULL COMMENT '创建时间',
    `update_by`    varchar(32) DEFAULT NULL COMMENT '更新人',
    `update_time`  datetime    DEFAULT NULL COMMENT '更新时间',
    `is_deleted`   int(11)     DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='用户角色表';

-- ----------------------------
-- Records of auth_user_role
-- ----------------------------
-- ----------------------------
-- Table structure for practice_detail
-- ----------------------------
DROP TABLE IF EXISTS `practice_detail`;
CREATE TABLE `practice_detail`
(
    `id`             bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `practice_id`    bigint(20)                      DEFAULT NULL COMMENT '练题id',
    `subject_id`     bigint(20)                      DEFAULT NULL COMMENT '题目id',
    `subject_type`   int(11)                         DEFAULT NULL COMMENT '题目类型',
    `answer_status`  int(11)                         DEFAULT NULL COMMENT '回答状态',
    `answer_content` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '回答内容',
    `created_by`     varchar(32) CHARACTER SET utf8  DEFAULT NULL COMMENT '创建人',
    `created_time`   datetime                        DEFAULT NULL COMMENT '创建时间',
    `update_by`      varchar(32) CHARACTER SET utf8  DEFAULT NULL COMMENT '更新人',
    `update_time`    datetime                        DEFAULT NULL COMMENT '更新时间',
    `is_deleted`     int(11)                         DEFAULT '0' COMMENT '是否被删除 0为删除 1已删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin COMMENT ='练习详情表';

-- ----------------------------
-- Table structure for practice_info
-- ----------------------------
DROP TABLE IF EXISTS `practice_info`;
CREATE TABLE `practice_info`
(
    `id`              bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `set_id`          bigint(20)                      DEFAULT NULL COMMENT '套题id',
    `complete_status` int(11)                         DEFAULT NULL COMMENT '是否完成 1完成 0未完成',
    `time_use`        varchar(32) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用时',
    `submit_time`     datetime                        DEFAULT NULL COMMENT '交卷时间',
    `correct_rate`    decimal(10, 2)                  DEFAULT NULL COMMENT '正确率',
    `created_by`      varchar(32) CHARACTER SET utf8  DEFAULT NULL COMMENT '创建人',
    `created_time`    datetime                        DEFAULT NULL COMMENT '创建时间',
    `update_by`       varchar(32) CHARACTER SET utf8  DEFAULT NULL COMMENT '更新人',
    `update_time`     datetime                        DEFAULT NULL COMMENT '更新时间',
    `is_deleted`      int(11)                         DEFAULT '0' COMMENT '是否被删除 0为删除 1已删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin COMMENT ='练习表';

-- ----------------------------
-- Table structure for practice_set
-- ----------------------------
DROP TABLE IF EXISTS `practice_set`;
CREATE TABLE `practice_set`
(
    `id`                  bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `set_name`            varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '套题名称',
    `set_type`            int(11)                          DEFAULT NULL COMMENT '套题类型 1实时生成 2预设套题',
    `set_heat`            int(11)                          DEFAULT NULL COMMENT '热度',
    `set_desc`            varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '套题描述',
    `primary_category_id` bigint(20)                       DEFAULT NULL COMMENT '大类id',
    `created_by`          varchar(32) CHARACTER SET utf8   DEFAULT NULL COMMENT '创建人',
    `created_time`        datetime                         DEFAULT NULL COMMENT '创建时间',
    `update_by`           varchar(32) CHARACTER SET utf8   DEFAULT NULL COMMENT '更新人',
    `update_time`         datetime                         DEFAULT NULL COMMENT '更新时间',
    `is_deleted`          int(11)                          DEFAULT '0' COMMENT '是否被删除 0为删除 1已删除',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin COMMENT ='套题信息表';

-- ----------------------------
-- Table structure for practice_set_detail
-- ----------------------------
DROP TABLE IF EXISTS `practice_set_detail`;
CREATE TABLE `practice_set_detail`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `set_id`       bigint(20) NOT NULL COMMENT '套题id',
    `subject_id`   bigint(20)                     DEFAULT NULL COMMENT '题目id',
    `subject_type` int(11)                        DEFAULT NULL COMMENT '题目类型',
    `created_by`   varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建人',
    `created_time` datetime                       DEFAULT NULL COMMENT '创建时间',
    `update_by`    varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '更新人',
    `update_time`  datetime                       DEFAULT NULL COMMENT '更新时间',
    `is_deleted`   int(11)                        DEFAULT '0' COMMENT '是否被删除 0为删除 1已删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin COMMENT ='套题内容表';
-- ----------------------------
-- Table structure for subject_brief
-- ----------------------------
DROP TABLE IF EXISTS `subject_brief`;
CREATE TABLE `subject_brief`
(
    `id`             bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `subject_id`     int(20)     DEFAULT NULL COMMENT '题目id',
    `subject_answer` text COMMENT '题目答案',
    `created_by`     varchar(32) DEFAULT NULL COMMENT '创建人',
    `created_time`   datetime    DEFAULT NULL COMMENT '创建时间',
    `update_by`      varchar(32) DEFAULT NULL COMMENT '更新人',
    `update_time`    datetime    DEFAULT NULL COMMENT '更新时间',
    `is_deleted`     int(11)     DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 232
  DEFAULT CHARSET = utf8 COMMENT ='简答题';

-- ----------------------------
-- Records of subject_brief
-- ----------------------------
INSERT INTO `subject_brief`
VALUES ('59', '100',
        '<p><br></p><ol><li>String（字符串）</li><li>List（列表）</li><li>Hash（字典）</li><li>Set（集合）</li><li>Sorted Set（有序集合）</li></ol><p><br></p><p><strong>String</strong></p><p><br></p><p>String是简单的 key-value 键值对，value 不仅可以是 String，也可以是数字。String在redis内部存储默认就是一个字符串，被redisObject所引用，当遇到incr,decr等操作时会转成数值型进行计算，此时redisObject的encoding字段为int。</p><p><br></p><p><strong>List</strong></p><p><br></p><p>Redis列表是简单的字符串列表，可以类比到C++中的std::list，简单的说就是一个链表或者说是一个队列。可以从头部或尾部向Redis列表添加元素。列表的最大长度为2^32 - 1，也即每个列表支持超过40亿个元素。</p><p><br></p><p>Redis list的实现为一个双向链表，即可以支持反向查找和遍历，更方便操作，不过带来了部分额外的内存开销，Redis内部的很多实现，包括发送缓冲队列等也都是用的这个数据结构。</p><p><br></p><p><strong>Hash</strong></p><p><br></p><p>Redis Hash对应Value内部实际就是一个HashMap，实际这里会有2种不同实现，这个Hash的成员比较少时Redis为了节省内存会采用类似一维数组的方式来紧凑存储，而不会采用真正的HashMap结构，对应的value redisObject的encoding为zipmap,当成员数量增大时会自动转成真正的HashMap。</p><p><br></p><p><strong>Set</strong></p><p><br></p><p>set 的内部实现是一个 value永远为null的HashMap，实际就是通过计算hash的方式来快速排重的，这也是set能提供判断一个成员是否在集合内的原因。</p><p><br></p><p><strong>Sorted Set</strong></p><p><br></p><p>Redis有序集合类似Redis集合，不同的是增加了一个功能，即集合是有序的。一个有序集合的每个成员带有分数，用于进行排序。</p><p><br></p><p>Redis有序集合添加、删除和测试的时间复杂度均为O(1)(固定时间，无论里面包含的元素集合的数量)。列表的最大长度为2^32- 1元素(4294967295，超过40亿每个元素的集合)。</p><p><br></p><p>Redis sorted set的内部使用HashMap和跳跃表(SkipList)来保证数据的存储和有序，HashMap里放的是成员到score的映射，而跳跃表里存放的是所有的成员，排序依据是HashMap里存的score,使用跳跃表的结构可以获得比较高的查找效率，并且在实现上比较简单。</p>',
        null, null, null, null, '0');

-- ----------------------------
-- Table structure for subject_category
-- ----------------------------
DROP TABLE IF EXISTS `subject_category`;
CREATE TABLE `subject_category`
(
    `id`            bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `category_name` varchar(16) DEFAULT NULL COMMENT '分类名称',
    `category_type` tinyint(2)  DEFAULT NULL COMMENT '分类类型',
    `image_url`     varchar(64) DEFAULT NULL COMMENT '图标连接',
    `parent_id`     bigint(20)  DEFAULT NULL COMMENT '父级id',
    `created_by`    varchar(32) DEFAULT NULL COMMENT '创建人',
    `created_time`  datetime    DEFAULT NULL COMMENT '创建时间',
    `update_by`     varchar(32) DEFAULT NULL COMMENT '更新人',
    `update_time`   datetime    DEFAULT NULL COMMENT '更新时间',
    `is_deleted`    tinyint(1)  DEFAULT '0' COMMENT '是否删除 0: 未删除 1: 已删除',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 12
  DEFAULT CHARSET = utf8 COMMENT ='题目分类';

-- ----------------------------
-- Records of subject_category
-- ----------------------------
INSERT INTO `subject_category`
VALUES ('1', '后端', '1', 'https://image/category.icon', '0', null, null, null, null, '0');
INSERT INTO `subject_category`
VALUES ('2', '缓存', '2', 'https://image/category.icon', '1', null, null, null, null, '0');
INSERT INTO `subject_category`
VALUES ('3', '数据库', '2', 'https://image/category.icon', '1', null, null, null, null, '0');

-- ----------------------------
-- Table structure for subject_info
-- ----------------------------
DROP TABLE IF EXISTS `subject_info`;
CREATE TABLE `subject_info`
(
    `id`                bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `subject_name`      varchar(128) DEFAULT NULL COMMENT '题目名称',
    `subject_difficult` tinyint(4)   DEFAULT NULL COMMENT '题目难度',
    `settle_name`       varchar(32)  DEFAULT NULL COMMENT '出题人名',
    `subject_type`      tinyint(4)   DEFAULT NULL COMMENT '题目类型 1单选 2多选 3判断 4简答',
    `subject_score`     tinyint(4)   DEFAULT NULL COMMENT '题目分数',
    `subject_parse`     varchar(512) DEFAULT NULL COMMENT '题目解析',
    `created_by`        varchar(32)  DEFAULT NULL COMMENT '创建人',
    `created_time`      datetime     DEFAULT NULL COMMENT '创建时间',
    `update_by`         varchar(32)  DEFAULT NULL COMMENT '修改人',
    `update_time`       datetime     DEFAULT NULL COMMENT '修改时间',
    `is_deleted`        int(11)      DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 273
  DEFAULT CHARSET = utf8 COMMENT ='题目信息表';

-- ----------------------------
-- Records of subject_info
-- ----------------------------
INSERT INTO `subject_info`
VALUES ('100', 'Redis支持哪几种数据类型？', '1', null, '4', '1', '解析什么', null, null, null, null, '0');

-- ----------------------------
-- Table structure for subject_judge
-- ----------------------------
DROP TABLE IF EXISTS `subject_judge`;
CREATE TABLE `subject_judge`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `subject_id`   bigint(20)  DEFAULT NULL COMMENT '题目id',
    `is_correct`   tinyint(2)  DEFAULT NULL COMMENT '是否正确',
    `created_by`   varchar(32) DEFAULT NULL COMMENT '创建人',
    `created_time` datetime    DEFAULT NULL COMMENT '创建时间',
    `update_by`    varchar(32) DEFAULT NULL COMMENT '更新人',
    `update_time`  datetime    DEFAULT NULL COMMENT '更新时间',
    `is_deleted`   int(11)     DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='判断题';

-- ----------------------------
-- Records of subject_judge
-- ----------------------------

-- ----------------------------
-- Table structure for subject_label
-- ----------------------------
DROP TABLE IF EXISTS `subject_label`;
CREATE TABLE `subject_label`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `label_name`   varchar(32) DEFAULT NULL COMMENT '标签分类',
    `sort_num`     int(11)     DEFAULT NULL COMMENT '排序',
    `category_id`  varchar(50) DEFAULT NULL,
    `created_by`   varchar(32) DEFAULT NULL COMMENT '创建人',
    `created_time` datetime    DEFAULT NULL COMMENT '创建时间',
    `update_by`    varchar(32) DEFAULT NULL COMMENT '更新人',
    `update_time`  datetime    DEFAULT NULL COMMENT '更新时间',
    `is_deleted`   int(11)     DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 64
  DEFAULT CHARSET = utf8 COMMENT ='题目标签表';

-- ----------------------------
-- Records of subject_label
-- ----------------------------
INSERT INTO `subject_label`
VALUES ('1', 'Redis', '1', '1', null, null, null, null, '0');

-- ----------------------------
-- Table structure for subject_mapping
-- ----------------------------
DROP TABLE IF EXISTS `subject_mapping`;
CREATE TABLE `subject_mapping`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `subject_id`   bigint(20)  DEFAULT NULL COMMENT '题目id',
    `category_id`  bigint(20)  DEFAULT NULL COMMENT '分类id',
    `label_id`     bigint(20)  DEFAULT NULL COMMENT '标签id',
    `created_by`   varchar(32) DEFAULT NULL COMMENT '创建人',
    `created_time` datetime    DEFAULT NULL COMMENT '创建时间',
    `update_by`    varchar(32) DEFAULT NULL COMMENT '修改人',
    `update_time`  datetime    DEFAULT NULL COMMENT '修改时间',
    `is_deleted`   int(11)     DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 479
  DEFAULT CHARSET = utf8 COMMENT ='题目分类关系表';

-- ----------------------------
-- Records of subject_mapping
-- ----------------------------
INSERT INTO `subject_mapping`
VALUES ('216', '100', '2', '1', null, null, null, null, '0');

-- ----------------------------
-- Table structure for subject_multiple
-- ----------------------------
DROP TABLE IF EXISTS `subject_multiple`;
CREATE TABLE `subject_multiple`
(
    `id`             bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `subject_id`     bigint(20)  DEFAULT NULL COMMENT '题目id',
    `option_type`    bigint(4)   DEFAULT NULL COMMENT '选项类型',
    `option_content` varchar(64) DEFAULT NULL COMMENT '选项内容',
    `is_correct`     tinyint(2)  DEFAULT NULL COMMENT '是否正确',
    `created_by`     varchar(32) DEFAULT NULL COMMENT '创建人',
    `created_time`   datetime    DEFAULT NULL COMMENT '创建时间',
    `update_by`      varchar(32) DEFAULT NULL COMMENT '更新人',
    `update_time`    datetime    DEFAULT NULL COMMENT '更新时间',
    `is_deleted`     int(11)     DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='多选题信息表';

-- ----------------------------
-- Records of subject_multiple
-- ----------------------------

-- ----------------------------
-- Table structure for subject_radio
-- ----------------------------
DROP TABLE IF EXISTS `subject_radio`;
CREATE TABLE `subject_radio`
(
    `id`             bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `subject_id`     bigint(20)   DEFAULT NULL COMMENT '题目id',
    `option_type`    tinyint(4)   DEFAULT NULL COMMENT 'a,b,c,d',
    `option_content` varchar(128) DEFAULT NULL COMMENT '选项内容',
    `is_correct`     tinyint(2)   DEFAULT NULL COMMENT '是否正确',
    `created_by`     varchar(32)  DEFAULT NULL COMMENT '创建人',
    `created_time`   datetime     DEFAULT NULL COMMENT '创建时间',
    `update_by`      varchar(32)  DEFAULT NULL COMMENT '修改人',
    `update_time`    datetime     DEFAULT NULL COMMENT '修改时间',
    `is_deleted`     int(11)      DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='单选题信息表';

-- ----------------------------
-- Records of subject_radio
-- ----------------------------
