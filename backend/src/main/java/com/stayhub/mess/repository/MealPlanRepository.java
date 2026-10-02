package com.stayhub.mess.repository;

import com.stayhub.mess.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, String> {
    List<MealPlan> findByIsActiveTrue();
}
