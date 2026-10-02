package com.stayhub.tenant;

import com.stayhub.bed.Bed;
import com.stayhub.bed.BedRepository;
import com.stayhub.common.enums.BedStatus;
import com.stayhub.common.enums.TenantStatus;
import com.stayhub.property.Property;
import com.stayhub.property.PropertyRepository;
import com.stayhub.room.Room;
import com.stayhub.room.RoomRepository;
import com.stayhub.tenant.dto.CreateTenantRequest;
import com.stayhub.tenant.dto.TenantResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TenantServiceTest {

    @Mock
    private TenantRepository tenantRepository;

    @Mock
    private PropertyRepository propertyRepository;

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private BedRepository bedRepository;

    @Spy
    private TenantMapper tenantMapper;

    @InjectMocks
    private TenantService tenantService;

    @Test
    void testCreateTenant() {
        CreateTenantRequest request = CreateTenantRequest.builder()
                .propertyId("prop-1")
                .roomId("room-1")
                .bedId("bed-1")
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .phone("9876543210")
                .emergencyContact("9876543211")
                .monthlyRent(new BigDecimal("8000"))
                .securityDeposit(new BigDecimal("16000"))
                .checkInDate(LocalDate.now())
                .build();

        Bed bed = Bed.builder()
                .id("bed-1")
                .bedNumber("101-A")
                .status(BedStatus.AVAILABLE)
                .monthlyRent(new BigDecimal("8000"))
                .build();

        Tenant savedTenant = Tenant.builder()
                .id("t-1")
                .propertyId("prop-1")
                .roomId("room-1")
                .bedId("bed-1")
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .phone("9876543210")
                .emergencyContact("9876543211")
                .monthlyRent(new BigDecimal("8000"))
                .securityDeposit(new BigDecimal("16000"))
                .checkInDate(LocalDate.now())
                .status(TenantStatus.ACTIVE)
                .build();

        when(bedRepository.findById("bed-1")).thenReturn(Optional.of(bed));
        when(tenantRepository.save(any(Tenant.class))).thenReturn(savedTenant);
        when(propertyRepository.findById("prop-1")).thenReturn(Optional.of(Property.builder().name("Grand PG").build()));
        when(roomRepository.findById("room-1")).thenReturn(Optional.of(Room.builder().roomNumber("101").build()));

        TenantResponse response = tenantService.createTenant(request);

        assertNotNull(response);
        assertEquals("John", response.getFirstName());
        assertEquals("Doe", response.getLastName());
    }
}
