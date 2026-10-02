package com.stayhub.expense;

import com.stayhub.common.exception.ResourceNotFoundException;
import com.stayhub.expense.dto.CreateExpenseRequest;
import com.stayhub.expense.dto.ExpenseResponse;
import com.stayhub.property.Property;
import com.stayhub.property.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final PropertyRepository propertyRepository;

    @Transactional(readOnly = true)
    public List<ExpenseResponse> getExpenses(String propertyId) {
        List<Expense> expenses = propertyId != null
                ? expenseRepository.findByPropertyId(propertyId)
                : expenseRepository.findAll();

        return expenses.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public ExpenseResponse createExpense(CreateExpenseRequest request) {
        Expense expense = Expense.builder()
                .propertyId(request.getPropertyId())
                .title(request.getTitle())
                .category(request.getCategory())
                .amount(request.getAmount())
                .expenseDate(request.getExpenseDate())
                .paidTo(request.getPaidTo())
                .receiptUrl(request.getReceiptUrl())
                .notes(request.getNotes())
                .build();

        expense = expenseRepository.save(expense);
        return toResponse(expense);
    }

    @Transactional
    public void deleteExpense(String id) {
        if (!expenseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Expense", "id", id);
        }
        expenseRepository.deleteById(id);
    }

    private ExpenseResponse toResponse(Expense expense) {
        String propName = propertyRepository.findById(expense.getPropertyId())
                .map(Property::getName).orElse("StayHub Property");

        return ExpenseResponse.builder()
                .id(expense.getId())
                .propertyId(expense.getPropertyId())
                .propertyName(propName)
                .title(expense.getTitle())
                .category(expense.getCategory())
                .amount(expense.getAmount())
                .expenseDate(expense.getExpenseDate())
                .paidTo(expense.getPaidTo())
                .receiptUrl(expense.getReceiptUrl())
                .notes(expense.getNotes())
                .createdAt(expense.getCreatedAt())
                .build();
    }
}
