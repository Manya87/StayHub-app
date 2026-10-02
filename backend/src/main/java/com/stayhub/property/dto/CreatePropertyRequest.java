package com.stayhub.property.dto;

import com.stayhub.common.enums.PropertyStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePropertyRequest {

    @NotBlank(message = "Property name is required")
    private String name;

    @NotBlank(message = "Property code is required")
    private String code;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    @Builder.Default
    private PropertyStatus status = PropertyStatus.ACTIVE;

    private String imageUrl;
}
