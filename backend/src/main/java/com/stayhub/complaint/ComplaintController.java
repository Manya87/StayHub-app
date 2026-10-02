package com.stayhub.complaint;

import com.stayhub.common.enums.ComplaintStatus;
import com.stayhub.common.response.ApiResponse;
import com.stayhub.complaint.dto.CreateComplaintRequest;
import com.stayhub.complaint.dto.ComplaintResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
@Tag(name = "Complaints", description = "Tenant complaints, repairs, and issue tracker endpoints")
public class ComplaintController {

    private final ComplaintService complaintService;

    @GetMapping
    @Operation(summary = "Get list of maintenance complaints")
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>> getComplaints(
            @RequestParam(required = false) String propertyId,
            @RequestParam(required = false) ComplaintStatus status
    ) {
        List<ComplaintResponse> complaints = complaintService.getComplaints(propertyId, status);
        return ResponseEntity.ok(ApiResponse.success(complaints));
    }

    @PostMapping
    @Operation(summary = "Log a new complaint ticket")
    public ResponseEntity<ApiResponse<ComplaintResponse>> createComplaint(@Valid @RequestBody CreateComplaintRequest request) {
        ComplaintResponse created = complaintService.createComplaint(request);
        return ResponseEntity.ok(ApiResponse.success("Complaint filed successfully", created));
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update complaint ticket status and add resolution notes")
    public ResponseEntity<ApiResponse<ComplaintResponse>> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> payload
    ) {
        ComplaintStatus status = ComplaintStatus.valueOf(payload.get("status"));
        String notes = payload.get("resolutionNotes");
        ComplaintResponse updated = complaintService.updateStatus(id, status, notes);
        return ResponseEntity.ok(ApiResponse.success("Complaint status updated", updated));
    }
}
