package com.stayhub.room.dto;

import com.stayhub.common.enums.RoomType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoomRequest {

    @NotBlank(message = "Property ID is required")
    private String propertyId;

    @NotBlank(message = "Room number is required")
    private String roomNumber;

    @Builder.Default
    private int floor = 1;

    @NotNull(message = "Room type is required")
    private RoomType type;

    @Builder.Default
    private int capacity = 2;

    @NotNull(message = "Base rent is required")
    @Positive(message = "Base rent must be greater than 0")
    private BigDecimal baseRent;

    private boolean hasAttachedBathroom;
    private boolean hasBalcony;
    private boolean hasAc;
}
