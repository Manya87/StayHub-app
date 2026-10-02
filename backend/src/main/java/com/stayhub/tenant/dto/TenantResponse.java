package com.stayhub.tenant.dto;

import com.stayhub.common.enums.TenantStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantResponse {
    private String id;
    private String userId;
    private String propertyId;
    private String propertyName;
    private String roomId;
    private String roomNumber;
    private String bedId;
    private String bedNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String emergencyContact;
    private BigDecimal monthlyRent;
    private BigDecimal securityDeposit;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private TenantStatus status;
    private String idProofType;
    private String idProofNumber;
    private String idProofUrl;
    private Instant createdAt;
}
