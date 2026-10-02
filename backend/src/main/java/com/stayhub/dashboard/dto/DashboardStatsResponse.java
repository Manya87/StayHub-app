package com.stayhub.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private long totalProperties;
    private long totalRooms;
    private long totalBeds;
    private long occupiedBeds;
    private int occupancyRate;
    private BigDecimal monthlyRevenue;
    private BigDecimal pendingDues;
    private long openComplaints;
}
