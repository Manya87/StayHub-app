package com.stayhub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

    @Value("${aws.s3.bucket-name:stayhub-documents}")
    private String bucketName;

    @Value("${aws.region:us-east-1}")
    private String region;

    public String getBucketName() {
        return bucketName;
    }

    public String getRegion() {
        return region;
    }
}
