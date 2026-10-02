package com.stayhub.tenant;

import com.stayhub.common.enums.TenantStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, String> {
    List<Tenant> findByPropertyId(String propertyId);
    List<Tenant> findByStatus(TenantStatus status);
    Optional<Tenant> findByBedIdAndStatus(String bedId, TenantStatus status);
}
