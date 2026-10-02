package com.stayhub.mess;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "mess_attendance", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"property_id", "attendance_date"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "property_id", nullable = false)
    private String propertyId;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(name = "breakfast_count", nullable = false)
    @Builder.Default
    private int breakfastCount = 0;

    @Column(name = "lunch_count", nullable = false)
    @Builder.Default
    private int lunchCount = 0;

    @Column(name = "dinner_count", nullable = false)
    @Builder.Default
    private int dinnerCount = 0;
}
