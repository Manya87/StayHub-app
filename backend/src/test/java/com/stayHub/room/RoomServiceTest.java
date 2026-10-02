package com.stayhub.room;

import com.stayhub.common.enums.RoomType;
import com.stayhub.room.dto.CreateRoomRequest;
import com.stayhub.room.dto.RoomResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RoomServiceTest {

    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private RoomService roomService;

    @Test
    void testCreateRoom() {
        CreateRoomRequest request = CreateRoomRequest.builder()
                .propertyId("prop-1")
                .roomNumber("101")
                .floor(1)
                .type(RoomType.DOUBLE)
                .capacity(2)
                .baseRent(new BigDecimal("8000"))
                .hasAttachedBathroom(true)
                .build();

        Room saved = Room.builder()
                .id("room-1")
                .propertyId("prop-1")
                .roomNumber("101")
                .floor(1)
                .type(RoomType.DOUBLE)
                .capacity(2)
                .baseRent(new BigDecimal("8000"))
                .hasAttachedBathroom(true)
                .status("AVAILABLE")
                .build();

        when(roomRepository.existsByPropertyIdAndRoomNumber("prop-1", "101")).thenReturn(false);
        when(roomRepository.save(any(Room.class))).thenReturn(saved);

        RoomResponse response = roomService.createRoom(request);

        assertNotNull(response);
        assertEquals("101", response.getRoomNumber());
        assertEquals(RoomType.DOUBLE, response.getType());
    }
}
