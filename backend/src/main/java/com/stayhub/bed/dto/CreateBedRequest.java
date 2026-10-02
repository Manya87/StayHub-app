package com.stayhub.bed.dto;

import com.stayhub.common.enums.BedStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBedRequest {

    @NotBlank(message = "Room ID is required")
    private String roomId;

    @NotBlank(message = "Bed number is required")
    private String bedNumber;

    @NotNull(message = "Monthly rent is required")
    @Positive(message = "Monthly rent must be positive")
    private BigDecimal monthlyRent;

    @Builder.Default
    private BedStatus status = BedStatus.AVAILABLE;
}
