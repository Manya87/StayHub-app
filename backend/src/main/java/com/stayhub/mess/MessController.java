package com.stayhub.mess;

import com.stayhub.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mess")
@RequiredArgsConstructor
@Tag(name = "Mess & Dining", description = "Meal menus, subscription plans, and headcount attendance")
public class MessController {

    private final MessService messService;

    @GetMapping("/menu")
    @Operation(summary = "Get weekly meal menu for property")
    public ResponseEntity<ApiResponse<List<Meal>>> getMenu(@RequestParam String propertyId) {
        List<Meal> meals = messService.getWeeklyMenu(propertyId);
        return ResponseEntity.ok(ApiResponse.success(meals));
    }

    @GetMapping("/plans")
    @Operation(summary = "Get available mess subscription plans")
    public ResponseEntity<ApiResponse<List<MealPlan>>> getMealPlans() {
        List<MealPlan> plans = messService.getActiveMealPlans();
        return ResponseEntity.ok(ApiResponse.success(plans));
    }

    @PostMapping("/attendance")
    @Operation(summary = "Record daily meal attendance count")
    public ResponseEntity<ApiResponse<MessAttendance>> recordAttendance(
            @RequestBody Map<String, Object> payload
    ) {
        String propertyId = (String) payload.get("propertyId");
        LocalDate date = LocalDate.parse((String) payload.get("date"));
        int breakfast = (int) payload.get("breakfast");
        int lunch = (int) payload.get("lunch");
        int dinner = (int) payload.get("dinner");

        MessAttendance attendance = messService.recordAttendance(propertyId, date, breakfast, lunch, dinner);
        return ResponseEntity.ok(ApiResponse.success("Attendance updated", attendance));
    }
}
