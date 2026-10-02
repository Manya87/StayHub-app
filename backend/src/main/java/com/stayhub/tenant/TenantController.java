package com.stayhub.tenant;

import com.stayhub.common.enums.TenantStatus;
import com.stayhub.common.response.ApiResponse;
import com.stayhub.tenant.dto.CreateTenantRequest;
import com.stayhub.tenant.dto.TenantResponse;
import com.stayhub.tenant.dto.UpdateTenantRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
@RequiredArgsConstructor
@Tag(name = "Tenants", description = "Tenant onboarding and residency lifecycle endpoints")
public class TenantController {

    private final TenantService tenantService;

    @GetMapping
    @Operation(summary = "Get list of all tenants with optional filters")
    public ResponseEntity<ApiResponse<List<TenantResponse>>> getAllTenants(
            @RequestParam(required = false) String propertyId,
            @RequestParam(required = false) TenantStatus status
    ) {
        List<TenantResponse> tenants = tenantService.getAllTenants(propertyId, status);
        return ResponseEntity.ok(ApiResponse.success(tenants));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get tenant details by ID")
    public ResponseEntity<ApiResponse<TenantResponse>> getTenantById(@PathVariable String id) {
        TenantResponse tenant = tenantService.getTenantById(id);
        return ResponseEntity.ok(ApiResponse.success(tenant));
    }

    @PostMapping
    @Operation(summary = "Onboard a new tenant and allocate bed")
    public ResponseEntity<ApiResponse<TenantResponse>> createTenant(@Valid @RequestBody CreateTenantRequest request) {
        TenantResponse created = tenantService.createTenant(request);
        return ResponseEntity.ok(ApiResponse.success("Tenant onboarded successfully", created));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update tenant details or status")
    public ResponseEntity<ApiResponse<TenantResponse>> updateTenant(
            @PathVariable String id,
            @RequestBody UpdateTenantRequest request
    ) {
        TenantResponse updated = tenantService.updateTenant(id, request);
        return ResponseEntity.ok(ApiResponse.success("Tenant updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete tenant record and release bed")
    public ResponseEntity<ApiResponse<Void>> deleteTenant(@PathVariable String id) {
        tenantService.deleteTenant(id);
        return ResponseEntity.ok(ApiResponse.success("Tenant deleted successfully", null));
    }
}
