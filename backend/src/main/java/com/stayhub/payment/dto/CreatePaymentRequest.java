package com.stayhub.payment.dto;

import com.stayhub.common.enums.PaymentMethod;
import com.stayhub.common.enums.PaymentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePaymentRequest {

    @NotBlank(message = "Tenant ID is required")
    private String tenantId;

    @NotBlank(message = "Property ID is required")
    private String propertyId;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotBlank(message = "Payment type is required")
    private String paymentType;

    @NotNull(message = "Payment mode is required")
    private PaymentMethod mode;

    @Builder.Default
    private PaymentStatus status = PaymentStatus.PAID;

    private String transactionReference;
    private LocalDate paymentDate;
    private LocalDate dueDate;
    private String notes;
}
