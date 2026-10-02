package com.stayhub.payment;

import com.stayhub.payment.dto.CreatePaymentRequest;
import com.stayhub.payment.dto.PaymentResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class PaymentMapper {

    public Payment toEntity(CreatePaymentRequest request) {
        return Payment.builder()
                .tenantId(request.getTenantId())
                .propertyId(request.getPropertyId())
                .amount(request.getAmount())
                .paidAmount(request.getAmount())
                .paymentType(request.getPaymentType())
                .mode(request.getMode())
                .status(request.getStatus())
                .transactionReference(request.getTransactionReference())
                .paymentDate(request.getPaymentDate() != null ? request.getPaymentDate() : LocalDate.now())
                .dueDate(request.getDueDate() != null ? request.getDueDate() : LocalDate.now())
                .notes(request.getNotes())
                .build();
    }

    public PaymentResponse toResponse(Payment payment, String tenantName, String propertyName, String roomNumber) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .tenantId(payment.getTenantId())
                .tenantName(tenantName)
                .propertyId(payment.getPropertyId())
                .propertyName(propertyName)
                .roomNumber(roomNumber)
                .amount(payment.getAmount())
                .paidAmount(payment.getPaidAmount())
                .paymentType(payment.getPaymentType())
                .mode(payment.getMode())
                .status(payment.getStatus())
                .transactionReference(payment.getTransactionReference())
                .paymentDate(payment.getPaymentDate())
                .dueDate(payment.getDueDate())
                .receiptUrl(payment.getReceiptUrl())
                .notes(payment.getNotes())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}
