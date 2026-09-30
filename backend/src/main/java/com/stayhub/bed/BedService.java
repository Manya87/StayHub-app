package com.stayhub.bed;

import com.stayhub.bed.dto.BedResponse;
import com.stayhub.bed.dto.CreateBedRequest;
import com.stayhub.common.enums.BedStatus;
import com.stayhub.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BedService {

    private final BedRepository bedRepository;

    @Transactional(readOnly = true)
    public List<BedResponse> getBedsByRoom(String roomId) {
        return bedRepository.findByRoomId(roomId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public BedResponse createBed(CreateBedRequest request) {
        Bed bed = Bed.builder()
                .roomId(request.getRoomId())
                .bedNumber(request.getBedNumber())
                .status(request.getStatus() != null ? request.getStatus() : BedStatus.AVAILABLE)
                .monthlyRent(request.getMonthlyRent())
                .build();

        bed = bedRepository.save(bed);
        return toResponse(bed);
    }

    @Transactional
    public BedResponse updateBedStatus(String id, BedStatus status) {
        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bed", "id", id));
        bed.setStatus(status);
        bed = bedRepository.save(bed);
        return toResponse(bed);
    }

    private BedResponse toResponse(Bed bed) {
        return BedResponse.builder()
                .id(bed.getId())
                .roomId(bed.getRoomId())
                .bedNumber(bed.getBedNumber())
                .status(bed.getStatus())
                .monthlyRent(bed.getMonthlyRent())
                .createdAt(bed.getCreatedAt())
                .build();
    }
}
