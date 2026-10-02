package com.stayhub.document;

import com.stayhub.document.dto.DocumentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Transactional(readOnly = true)
    public List<DocumentResponse> getDocumentsByTenant(String tenantId) {
        return documentRepository.findByTenantId(tenantId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public DocumentResponse uploadDocument(MultipartFile file, String tenantId, String propertyId, String documentType, String title) {
        String generatedFileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
        String fileUrl = "https://s3.amazonaws.com/stayhub-documents/" + generatedFileName;

        Document document = Document.builder()
                .tenantId(tenantId)
                .propertyId(propertyId)
                .documentType(documentType != null ? documentType : "OTHER")
                .title(title != null ? title : file.getOriginalFilename())
                .fileUrl(fileUrl)
                .fileSize(file.getSize())
                .mimeType(file.getContentType())
                .build();

        document = documentRepository.save(document);
        return toResponse(document);
    }

    private DocumentResponse toResponse(Document document) {
        return DocumentResponse.builder()
                .id(document.getId())
                .tenantId(document.getTenantId())
                .propertyId(document.getPropertyId())
                .documentType(document.getDocumentType())
                .title(document.getTitle())
                .fileUrl(document.getFileUrl())
                .fileSize(document.getFileSize())
                .mimeType(document.getMimeType())
                .createdAt(document.getCreatedAt())
                .build();
    }
}
