package com.stayhub.payment.dto;

import com.stayhub.common.enums.PaymentMethod;
import com.stayhub.common.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {
    private String id;
    private String tenantId;
    private String tenantName;
    private String propertyId;
    private String propertyName;
    private String roomNumber;
    private BigDecimal amount;
    private BigDecimal paidAmount;
    private String paymentType;
    private PaymentMethod mode;
    private PaymentStatus status;
    private String transactionReference;
    private LocalDate paymentDate;
    private LocalDate dueDate;
    private String receiptUrl;
    private String notes;
    private Instant createdAt;
}
