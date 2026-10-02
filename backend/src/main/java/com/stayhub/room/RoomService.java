package com.stayhub.room;

import com.stayhub.common.exception.BadRequestException;
import com.stayhub.common.exception.ResourceNotFoundException;
import com.stayhub.room.dto.CreateRoomRequest;
import com.stayhub.room.dto.RoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    @Transactional(readOnly = true)
    public List<RoomResponse> getRoomsByProperty(String propertyId) {
        List<Room> rooms = propertyId != null
                ? roomRepository.findByPropertyId(propertyId)
                : roomRepository.findAll();

        return rooms.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RoomResponse getRoomById(String id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", id));
        return toResponse(room);
    }

    @Transactional
    public RoomResponse createRoom(CreateRoomRequest request) {
        if (roomRepository.existsByPropertyIdAndRoomNumber(request.getPropertyId(), request.getRoomNumber())) {
            throw new BadRequestException("Room " + request.getRoomNumber() + " already exists in this property");
        }

        Room room = Room.builder()
                .propertyId(request.getPropertyId())
                .roomNumber(request.getRoomNumber())
                .floor(request.getFloor())
                .type(request.getType())
                .capacity(request.getCapacity())
                .baseRent(request.getBaseRent())
                .hasAttachedBathroom(request.isHasAttachedBathroom())
                .hasBalcony(request.isHasBalcony())
                .hasAc(request.isHasAc())
                .status("AVAILABLE")
                .build();

        room = roomRepository.save(room);
        return toResponse(room);
    }

    private RoomResponse toResponse(Room room) {
        return RoomResponse.builder()
                .id(room.getId())
                .propertyId(room.getPropertyId())
                .roomNumber(room.getRoomNumber())
                .floor(room.getFloor())
                .type(room.getType())
                .capacity(room.getCapacity())
                .baseRent(room.getBaseRent())
                .hasAttachedBathroom(room.isHasAttachedBathroom())
                .hasBalcony(room.isHasBalcony())
                .hasAc(room.isHasAc())
                .status(room.getStatus())
                .createdAt(room.getCreatedAt())
                .build();
    }
}
