package com.stayhub.expense;

import com.stayhub.common.enums.ExpenseCategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, String> {
    List<Expense> findByPropertyId(String propertyId);
    List<Expense> findByCategory(ExpenseCategoryType category);
}
