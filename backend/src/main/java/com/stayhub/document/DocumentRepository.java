package com.stayhub.document;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, String> {
    List<Document> findByTenantId(String tenantId);
    List<Document> findByPropertyId(String propertyId);
}
