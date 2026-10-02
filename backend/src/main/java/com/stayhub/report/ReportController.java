package com.stayhub.report;

import com.stayhub.common.response.ApiResponse;
import com.stayhub.report.dto.RevenueReportResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "Financial and occupancy reporting endpoints")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/financial")
    @Operation(summary = "Get historical financial cashflow reports")
    public ResponseEntity<ApiResponse<List<RevenueReportResponse>>> getFinancialSummary(
            @RequestParam(required = false) Integer year
    ) {
        List<RevenueReportResponse> reports = reportService.getFinancialSummary(year);
        return ResponseEntity.ok(ApiResponse.success(reports));
    }
}
