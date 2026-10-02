package com.stayhub.complaint;

import com.stayhub.common.enums.ComplaintStatus;
import com.stayhub.common.exception.ResourceNotFoundException;
import com.stayhub.complaint.dto.CreateComplaintRequest;
import com.stayhub.complaint.dto.ComplaintResponse;
import com.stayhub.property.Property;
import com.stayhub.property.PropertyRepository;
import com.stayhub.room.Room;
import com.stayhub.room.RoomRepository;
import com.stayhub.tenant.Tenant;
import com.stayhub.tenant.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final TenantRepository tenantRepository;
    private final PropertyRepository propertyRepository;
    private final RoomRepository roomRepository;

    @Transactional(readOnly = true)
    public List<ComplaintResponse> getComplaints(String propertyId, ComplaintStatus status) {
        List<Complaint> complaints;
        if (propertyId != null) {
            complaints = complaintRepository.findByPropertyId(propertyId);
        } else if (status != null) {
            complaints = complaintRepository.findByStatus(status);
        } else {
            complaints = complaintRepository.findAll();
        }

        return complaints.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public ComplaintResponse createComplaint(CreateComplaintRequest request) {
        Complaint complaint = Complaint.builder()
                .propertyId(request.getPropertyId())
                .tenantId(request.getTenantId())
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .priority(request.getPriority())
                .status(ComplaintStatus.OPEN)
                .build();

        complaint = complaintRepository.save(complaint);
        return toResponse(complaint);
    }

    @Transactional
    public ComplaintResponse updateStatus(String id, ComplaintStatus status, String resolutionNotes) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint", "id", id));

        complaint.setStatus(status);
        if (status == ComplaintStatus.RESOLVED || status == ComplaintStatus.CLOSED) {
            complaint.setResolvedAt(Instant.now());
            complaint.setResolutionNotes(resolutionNotes);
        }

        complaint = complaintRepository.save(complaint);
        return toResponse(complaint);
    }

    private ComplaintResponse toResponse(Complaint complaint) {
        Tenant tenant = tenantRepository.findById(complaint.getTenantId()).orElse(null);
        String tenantName = tenant != null ? tenant.getFirstName() + " " + tenant.getLastName() : "Resident";
        String propertyName = propertyRepository.findById(complaint.getPropertyId()).map(Property::getName).orElse("StayHub Property");
        String roomNumber = (tenant != null) ? roomRepository.findById(tenant.getRoomId()).map(Room::getRoomNumber).orElse("-") : "-";

        return ComplaintResponse.builder()
                .id(complaint.getId())
                .propertyId(complaint.getPropertyId())
                .propertyName(propertyName)
                .tenantId(complaint.getTenantId())
                .tenantName(tenantName)
                .roomNumber(roomNumber)
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .category(complaint.getCategory())
                .priority(complaint.getPriority())
                .status(complaint.getStatus())
                .resolutionNotes(complaint.getResolutionNotes())
                .resolvedAt(complaint.getResolvedAt())
                .createdAt(complaint.getCreatedAt())
                .build();
    }
}
