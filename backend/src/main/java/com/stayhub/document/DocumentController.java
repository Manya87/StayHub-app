package com.stayhub.document;

import com.stayhub.common.response.ApiResponse;
import com.stayhub.document.dto.DocumentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "File and KYC document upload endpoints")
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping("/tenant/{tenantId}")
    @Operation(summary = "Get list of documents uploaded for a tenant")
    public ResponseEntity<ApiResponse<List<DocumentResponse>>> getTenantDocuments(@PathVariable String tenantId) {
        List<DocumentResponse> documents = documentService.getDocumentsByTenant(tenantId);
        return ResponseEntity.ok(ApiResponse.success(documents));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload document file (image or PDF)")
    public ResponseEntity<ApiResponse<DocumentResponse>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String tenantId,
            @RequestParam(required = false) String propertyId,
            @RequestParam(required = false) String documentType,
            @RequestParam(required = false) String title
    ) {
        DocumentResponse response = documentService.uploadDocument(file, tenantId, propertyId, documentType, title);
        return ResponseEntity.ok(ApiResponse.success("Document uploaded successfully", response));
    }
}
