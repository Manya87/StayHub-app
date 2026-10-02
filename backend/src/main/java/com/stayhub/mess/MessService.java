package com.stayhub.mess;

import com.stayhub.mess.repository.MealPlanRepository;
import com.stayhub.mess.repository.MealRepository;
import com.stayhub.mess.repository.MessAttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessService {

    private final MealRepository mealRepository;
    private final MealPlanRepository mealPlanRepository;
    private final MessAttendanceRepository messAttendanceRepository;

    @Transactional(readOnly = true)
    public List<Meal> getWeeklyMenu(String propertyId) {
        return mealRepository.findByPropertyId(propertyId);
    }

    @Transactional(readOnly = true)
    public List<MealPlan> getActiveMealPlans() {
        return mealPlanRepository.findByIsActiveTrue();
    }

    @Transactional
    public MessAttendance recordAttendance(String propertyId, LocalDate date, int breakfast, int lunch, int dinner) {
        Optional<MessAttendance> existing = messAttendanceRepository.findByPropertyIdAndAttendanceDate(propertyId, date);

        MessAttendance attendance = existing.orElseGet(() -> MessAttendance.builder()
                .propertyId(propertyId)
                .attendanceDate(date)
                .build());

        attendance.setBreakfastCount(breakfast);
        attendance.setLunchCount(lunch);
        attendance.setDinnerCount(dinner);

        return messAttendanceRepository.save(attendance);
    }
}
