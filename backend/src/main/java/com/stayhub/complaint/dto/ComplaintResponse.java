package com.stayhub.complaint.dto;

import com.stayhub.common.enums.ComplaintStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintResponse {
    private String id;
    private String propertyId;
    private String propertyName;
    private String tenantId;
    private String tenantName;
    private String roomNumber;
    private String title;
    private String description;
    private String category;
    private String priority;
    private ComplaintStatus status;
    private String resolutionNotes;
    private Instant resolvedAt;
    private Instant createdAt;
}
