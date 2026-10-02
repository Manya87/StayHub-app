package com.stayhub.tenant;

import com.stayhub.common.enums.TenantStatus;
import com.stayhub.tenant.dto.CreateTenantRequest;
import com.stayhub.tenant.dto.TenantResponse;
import org.springframework.stereotype.Component;

@Component
public class TenantMapper {

    public Tenant toEntity(CreateTenantRequest request) {
        return Tenant.builder()
                .propertyId(request.getPropertyId())
                .roomId(request.getRoomId())
                .bedId(request.getBedId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .emergencyContact(request.getEmergencyContact())
                .monthlyRent(request.getMonthlyRent())
                .securityDeposit(request.getSecurityDeposit())
                .checkInDate(request.getCheckInDate())
                .status(TenantStatus.ACTIVE)
                .idProofType(request.getIdProofType())
                .idProofNumber(request.getIdProofNumber())
                .idProofUrl(request.getIdProofUrl())
                .build();
    }

    public TenantResponse toResponse(Tenant tenant, String propertyName, String roomNumber, String bedNumber) {
        return TenantResponse.builder()
                .id(tenant.getId())
                .userId(tenant.getUserId())
                .propertyId(tenant.getPropertyId())
                .propertyName(propertyName)
                .roomId(tenant.getRoomId())
                .roomNumber(roomNumber)
                .bedId(tenant.getBedId())
                .bedNumber(bedNumber)
                .firstName(tenant.getFirstName())
                .lastName(tenant.getLastName())
                .email(tenant.getEmail())
                .phone(tenant.getPhone())
                .emergencyContact(tenant.getEmergencyContact())
                .monthlyRent(tenant.getMonthlyRent())
                .securityDeposit(tenant.getSecurityDeposit())
                .checkInDate(tenant.getCheckInDate())
                .checkOutDate(tenant.getCheckOutDate())
                .status(tenant.getStatus())
                .idProofType(tenant.getIdProofType())
                .idProofNumber(tenant.getIdProofNumber())
                .idProofUrl(tenant.getIdProofUrl())
                .createdAt(tenant.getCreatedAt())
                .build();
    }
}
