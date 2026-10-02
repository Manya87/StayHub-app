package com.stayhub.property.dto;

import com.stayhub.common.enums.PropertyStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePropertyRequest {
    private String name;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String contactNumber;
    private PropertyStatus status;
    private String imageUrl;
}
