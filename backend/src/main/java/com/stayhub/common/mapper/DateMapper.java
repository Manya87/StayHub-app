package com.stayhub.common.mapper;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class DateMapper {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

    public String asString(LocalDate date) {
        return date != null ? date.format(FORMATTER) : null;
    }

    public LocalDate asLocalDate(String dateString) {
        return dateString != null && !dateString.isBlank() ? LocalDate.parse(dateString, FORMATTER) : null;
    }
}
