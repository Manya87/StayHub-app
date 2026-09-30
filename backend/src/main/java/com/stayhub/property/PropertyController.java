package com.stayhub.property;

import com.stayhub.common.response.ApiResponse;
import com.stayhub.property.dto.CreatePropertyRequest;
import com.stayhub.property.dto.PropertyResponse;
import com.stayhub.property.dto.UpdatePropertyRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
@Tag(name = "Properties", description = "Property and building management API endpoints")
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    @Operation(summary = "Get list of all properties")
    public ResponseEntity<ApiResponse<List<PropertyResponse>>> getAllProperties() {
        List<PropertyResponse> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(ApiResponse.success(properties));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get property details by ID")
    public ResponseEntity<ApiResponse<PropertyResponse>> getPropertyById(@PathVariable String id) {
        PropertyResponse property = propertyService.getPropertyById(id);
        return ResponseEntity.ok(ApiResponse.success(property));
    }

    @PostMapping
    @Operation(summary = "Register a new property")
    public ResponseEntity<ApiResponse<PropertyResponse>> createProperty(
            @Valid @RequestBody CreatePropertyRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String ownerId = userDetails != null ? userDetails.getUsername() : "system";
        PropertyResponse created = propertyService.createProperty(request, ownerId);
        return ResponseEntity.ok(ApiResponse.success("Property created successfully", created));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update property information")
    public ResponseEntity<ApiResponse<PropertyResponse>> updateProperty(
            @PathVariable String id,
            @RequestBody UpdatePropertyRequest request
    ) {
        PropertyResponse updated = propertyService.updateProperty(id, request);
        return ResponseEntity.ok(ApiResponse.success("Property updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete property by ID")
    public ResponseEntity<ApiResponse<Void>> deleteProperty(@PathVariable String id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.ok(ApiResponse.success("Property deleted successfully", null));
    }
}
