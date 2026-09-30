package com.stayhub.document.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentResponse {
    private String id;
    private String tenantId;
    private String propertyId;
    private String documentType;
    private String title;
    private String fileUrl;
    private Long fileSize;
    private String mimeType;
    private Instant createdAt;
}
