package com.stayhub.tenant.dto;

import com.stayhub.common.enums.TenantStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTenantRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String emergencyContact;
    private BigDecimal monthlyRent;
    private BigDecimal securityDeposit;
    private LocalDate checkOutDate;
    private TenantStatus status;
}
