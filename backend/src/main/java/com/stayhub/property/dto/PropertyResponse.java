package com.stayhub.property.dto;

import com.stayhub.common.enums.PropertyStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyResponse {
    private String id;
    private String ownerId;
    private String name;
    private String code;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String contactNumber;
    private PropertyStatus status;
    private String imageUrl;
    private int totalRooms;
    private int totalBeds;
    private int occupiedBeds;
    private Instant createdAt;
}
