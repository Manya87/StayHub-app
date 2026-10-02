package com.stayhub.bed.dto;

import com.stayhub.common.enums.BedStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BedResponse {
    private String id;
    private String roomId;
    private String bedNumber;
    private BedStatus status;
    private BigDecimal monthlyRent;
    private Instant createdAt;
}
