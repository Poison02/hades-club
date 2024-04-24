package com.zch.core.anno;

import java.lang.annotation.*;

@Documented
@Target({ElementType.TYPE, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Table {

    String value() default "";

    String keyType() default "";

    String col() default "";

    String comment() default "";

    String myBatisType() default "";

    String jdbcType() default "";

}
