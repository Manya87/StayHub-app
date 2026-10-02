package com.stayhub.mess.repository;

import com.stayhub.mess.MessAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface MessAttendanceRepository extends JpaRepository<MessAttendance, String> {
    Optional<MessAttendance> findByPropertyIdAndAttendanceDate(String propertyId, LocalDate date);
}
