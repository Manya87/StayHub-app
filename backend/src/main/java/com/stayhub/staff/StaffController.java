package com.stayhub.staff;

import com.stayhub.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
@Tag(name = "Staff", description = "Property staff and employee management endpoints")
public class StaffController {

    private final StaffService staffService;

    @GetMapping
    @Operation(summary = "Get list of staff members")
    public ResponseEntity<ApiResponse<List<Staff>>> getStaff(@RequestParam(required = false) String propertyId) {
        List<Staff> staff = staffService.getStaff(propertyId);
        return ResponseEntity.ok(ApiResponse.success(staff));
    }

    @PostMapping
    @Operation(summary = "Add a new staff member")
    public ResponseEntity<ApiResponse<Staff>> addStaff(@RequestBody Staff staff) {
        Staff created = staffService.addStaff(staff);
        return ResponseEntity.ok(ApiResponse.success("Staff member added successfully", created));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remove staff record by ID")
    public ResponseEntity<ApiResponse<Void>> deleteStaff(@PathVariable String id) {
        staffService.deleteStaff(id);
        return ResponseEntity.ok(ApiResponse.success("Staff member removed", null));
    }
}
