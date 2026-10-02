package com.stayhub.room.dto;

import com.stayhub.common.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private String id;
    private String propertyId;
    private String roomNumber;
    private int floor;
    private RoomType type;
    private int capacity;
    private BigDecimal baseRent;
    private boolean hasAttachedBathroom;
    private boolean hasBalcony;
    private boolean hasAc;
    private String status;
    private Instant createdAt;
}
