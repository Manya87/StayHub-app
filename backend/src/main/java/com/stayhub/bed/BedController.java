package com.stayhub.bed;

import com.stayhub.bed.dto.BedResponse;
import com.stayhub.bed.dto.CreateBedRequest;
import com.stayhub.common.enums.BedStatus;
import com.stayhub.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beds")
@RequiredArgsConstructor
@Tag(name = "Beds", description = "Bed slot allocation and occupancy status endpoints")
public class BedController {

    private final BedService bedService;

    @GetMapping
    @Operation(summary = "Get beds by room ID")
    public ResponseEntity<ApiResponse<List<BedResponse>>> getBedsByRoom(@RequestParam String roomId) {
        List<BedResponse> beds = bedService.getBedsByRoom(roomId);
        return ResponseEntity.ok(ApiResponse.success(beds));
    }

    @PostMapping
    @Operation(summary = "Add a new bed to a room")
    public ResponseEntity<ApiResponse<BedResponse>> createBed(@Valid @RequestBody CreateBedRequest request) {
        BedResponse created = bedService.createBed(request);
        return ResponseEntity.ok(ApiResponse.success("Bed created successfully", created));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update bed status (AVAILABLE, OCCUPIED, MAINTENANCE)")
    public ResponseEntity<ApiResponse<BedResponse>> updateStatus(
            @PathVariable String id,
            @RequestParam BedStatus status
    ) {
        BedResponse updated = bedService.updateBedStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Bed status updated", updated));
    }
}
