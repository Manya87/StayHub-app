package com.stayhub.complaint;

import com.stayhub.common.enums.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, String> {
    List<Complaint> findByPropertyId(String propertyId);
    List<Complaint> findByTenantId(String tenantId);
    List<Complaint> findByStatus(ComplaintStatus status);
}
