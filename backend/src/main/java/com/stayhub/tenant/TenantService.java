package com.stayhub.tenant;

import com.stayhub.bed.Bed;
import com.stayhub.bed.BedRepository;
import com.stayhub.common.enums.BedStatus;
import com.stayhub.common.enums.TenantStatus;
import com.stayhub.common.exception.BadRequestException;
import com.stayhub.common.exception.ResourceNotFoundException;
import com.stayhub.property.Property;
import com.stayhub.property.PropertyRepository;
import com.stayhub.room.Room;
import com.stayhub.room.RoomRepository;
import com.stayhub.tenant.dto.CreateTenantRequest;
import com.stayhub.tenant.dto.TenantResponse;
import com.stayhub.tenant.dto.UpdateTenantRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;
    private final PropertyRepository propertyRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final TenantMapper tenantMapper;

    @Transactional(readOnly = true)
    public List<TenantResponse> getAllTenants(String propertyId, TenantStatus status) {
        List<Tenant> tenants;
        if (propertyId != null) {
            tenants = tenantRepository.findByPropertyId(propertyId);
        } else if (status != null) {
            tenants = tenantRepository.findByStatus(status);
        } else {
            tenants = tenantRepository.findAll();
        }

        return tenants.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TenantResponse getTenantById(String id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant", "id", id));
        return mapToResponse(tenant);
    }

    @Transactional
    public TenantResponse createTenant(CreateTenantRequest request) {
        Bed bed = bedRepository.findById(request.getBedId())
                .orElseThrow(() -> new ResourceNotFoundException("Bed", "id", request.getBedId()));

        if (bed.getStatus() == BedStatus.OCCUPIED) {
            throw new BadRequestException("Bed is already occupied");
        }

        Tenant tenant = tenantMapper.toEntity(request);
        tenant = tenantRepository.save(tenant);

        // Update bed status to OCCUPIED
        bed.setStatus(BedStatus.OCCUPIED);
        bedRepository.save(bed);

        return mapToResponse(tenant);
    }

    @Transactional
    public TenantResponse updateTenant(String id, UpdateTenantRequest request) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant", "id", id));

        if (request.getFirstName() != null) tenant.setFirstName(request.getFirstName());
        if (request.getLastName() != null) tenant.setLastName(request.getLastName());
        if (request.getEmail() != null) tenant.setEmail(request.getEmail());
        if (request.getPhone() != null) tenant.setPhone(request.getPhone());
        if (request.getEmergencyContact() != null) tenant.setEmergencyContact(request.getEmergencyContact());
        if (request.getMonthlyRent() != null) tenant.setMonthlyRent(request.getMonthlyRent());
        if (request.getSecurityDeposit() != null) tenant.setSecurityDeposit(request.getSecurityDeposit());
        if (request.getCheckOutDate() != null) tenant.setCheckOutDate(request.getCheckOutDate());
        if (request.getStatus() != null) {
            tenant.setStatus(request.getStatus());
            if (request.getStatus() == TenantStatus.CHECKED_OUT) {
                bedRepository.findById(tenant.getBedId()).ifPresent(b -> {
                    b.setStatus(BedStatus.AVAILABLE);
                    bedRepository.save(b);
                });
            }
        }

        tenant = tenantRepository.save(tenant);
        return mapToResponse(tenant);
    }

    @Transactional
    public void deleteTenant(String id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant", "id", id));

        bedRepository.findById(tenant.getBedId()).ifPresent(b -> {
            b.setStatus(BedStatus.AVAILABLE);
            bedRepository.save(b);
        });

        tenantRepository.delete(tenant);
    }

    private TenantResponse mapToResponse(Tenant tenant) {
        String propName = propertyRepository.findById(tenant.getPropertyId()).map(Property::getName).orElse("Unknown Property");
        String roomNumber = roomRepository.findById(tenant.getRoomId()).map(Room::getRoomNumber).orElse("-");
        String bedNumber = bedRepository.findById(tenant.getBedId()).map(Bed::getBedNumber).orElse("-");
        return tenantMapper.toResponse(tenant, propName, roomNumber, bedNumber);
    }
}
