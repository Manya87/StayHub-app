package com.stayhub.expense;

import com.stayhub.common.enums.ExpenseCategoryType;
import com.stayhub.expense.dto.CreateExpenseRequest;
import com.stayhub.expense.dto.ExpenseResponse;
import com.stayhub.property.Property;
import com.stayhub.property.PropertyRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private PropertyRepository propertyRepository;

    @InjectMocks
    private ExpenseService expenseService;

    @Test
    void testCreateExpense() {
        CreateExpenseRequest request = CreateExpenseRequest.builder()
                .propertyId("prop-1")
                .title("Electricity Bill")
                .category(ExpenseCategoryType.ELECTRICITY)
                .amount(new BigDecimal("15000"))
                .expenseDate(LocalDate.now())
                .paidTo("Power Corp")
                .build();

        Expense saved = Expense.builder()
                .id("exp-1")
                .propertyId("prop-1")
                .title("Electricity Bill")
                .category(ExpenseCategoryType.ELECTRICITY)
                .amount(new BigDecimal("15000"))
                .expenseDate(LocalDate.now())
                .paidTo("Power Corp")
                .build();

        when(expenseRepository.save(any(Expense.class))).thenReturn(saved);
        when(propertyRepository.findById("prop-1")).thenReturn(Optional.of(Property.builder().name("Grand PG").build()));

        ExpenseResponse response = expenseService.createExpense(request);

        assertNotNull(response);
        assertEquals("Electricity Bill", response.getTitle());
        assertEquals(ExpenseCategoryType.ELECTRICITY, response.getCategory());
    }
}
