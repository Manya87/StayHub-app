package com.stayhub.payment;

import com.stayhub.common.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
    List<Payment> findByPropertyId(String propertyId);
    List<Payment> findByTenantId(String tenantId);
    List<Payment> findByStatus(PaymentStatus status);
}
