package com.stayhub.property;

import com.stayhub.property.dto.CreatePropertyRequest;
import com.stayhub.property.dto.PropertyResponse;
import org.springframework.stereotype.Component;

@Component
public class PropertyMapper {

    public Property toEntity(CreatePropertyRequest request, String ownerId) {
        return Property.builder()
                .ownerId(ownerId)
                .name(request.getName())
                .code(request.getCode())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .contactNumber(request.getContactNumber())
                .status(request.getStatus())
                .imageUrl(request.getImageUrl())
                .build();
    }

    public PropertyResponse toResponse(Property property, int totalRooms, int totalBeds, int occupiedBeds) {
        return PropertyResponse.builder()
                .id(property.getId())
                .ownerId(property.getOwnerId())
                .name(property.getName())
                .code(property.getCode())
                .address(property.getAddress())
                .city(property.getCity())
                .state(property.getState())
                .pincode(property.getPincode())
                .contactNumber(property.getContactNumber())
                .status(property.getStatus())
                .imageUrl(property.getImageUrl())
                .totalRooms(totalRooms)
                .totalBeds(totalBeds)
                .occupiedBeds(occupiedBeds)
                .createdAt(property.getCreatedAt())
                .build();
    }
}
