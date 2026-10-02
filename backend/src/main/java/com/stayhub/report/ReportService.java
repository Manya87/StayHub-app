package com.stayhub.report;

import com.stayhub.report.dto.RevenueReportResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ReportService {

    public List<RevenueReportResponse> getFinancialSummary(Integer year) {
        return List.of(
                RevenueReportResponse.builder()
                        .period("Jan 2026")
                        .totalIncome(new BigDecimal("420000.00"))
                        .totalExpenses(new BigDecimal("130000.00"))
                        .netProfit(new BigDecimal("290000.00"))
                        .collectionRate(98)
                        .build(),
                RevenueReportResponse.builder()
                        .period("Feb 2026")
                        .totalIncome(new BigDecimal("435000.00"))
                        .totalExpenses(new BigDecimal("125000.00"))
                        .netProfit(new BigDecimal("310000.00"))
                        .collectionRate(97)
                        .build(),
                RevenueReportResponse.builder()
                        .period("Mar 2026")
                        .totalIncome(new BigDecimal("450000.00"))
                        .totalExpenses(new BigDecimal("140000.00"))
                        .netProfit(new BigDecimal("310000.00"))
                        .collectionRate(99)
                        .build()
        );
    }
}
