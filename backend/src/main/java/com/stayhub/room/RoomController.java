package com.stayhub.room;

import com.stayhub.common.response.ApiResponse;
import com.stayhub.room.dto.CreateRoomRequest;
import com.stayhub.room.dto.RoomResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
@Tag(name = "Rooms", description = "Room inventory and layout endpoints")
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    @Operation(summary = "Get rooms, optionally filtered by property ID")
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getRooms(
            @RequestParam(required = false) String propertyId
    ) {
        List<RoomResponse> rooms = roomService.getRoomsByProperty(propertyId);
        return ResponseEntity.ok(ApiResponse.success(rooms));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get room details by ID")
    public ResponseEntity<ApiResponse<RoomResponse>> getRoomById(@PathVariable String id) {
        RoomResponse room = roomService.getRoomById(id);
        return ResponseEntity.ok(ApiResponse.success(room));
    }

    @PostMapping
    @Operation(summary = "Create a new room in property")
    public ResponseEntity<ApiResponse<RoomResponse>> createRoom(@Valid @RequestBody CreateRoomRequest request) {
        RoomResponse created = roomService.createRoom(request);
        return ResponseEntity.ok(ApiResponse.success("Room created successfully", created));
    }
}
