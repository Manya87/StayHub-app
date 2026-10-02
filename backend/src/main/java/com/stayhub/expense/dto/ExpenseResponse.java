package com.stayhub.expense.dto;

import com.stayhub.common.enums.ExpenseCategoryType;
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
public class ExpenseResponse {
    private String id;
    private String propertyId;
    private String propertyName;
    private String title;
    private ExpenseCategoryType category;
    private BigDecimal amount;
    private LocalDate expenseDate;
    private String paidTo;
    private String receiptUrl;
    private String notes;
    private Instant createdAt;
}
