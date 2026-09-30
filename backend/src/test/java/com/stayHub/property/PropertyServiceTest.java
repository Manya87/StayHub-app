package com.stayhub.property;

import com.stayhub.common.enums.PropertyStatus;
import com.stayhub.property.dto.CreatePropertyRequest;
import com.stayhub.property.dto.PropertyResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PropertyServiceTest {

    @Mock
    private PropertyRepository propertyRepository;

    @Spy
    private PropertyMapper propertyMapper;

    @InjectMocks
    private PropertyService propertyService;

    @Test
    void testCreateProperty() {
        CreatePropertyRequest request = CreatePropertyRequest.builder()
                .name("Grand PG")
                .code("GPG-01")
                .address("Road 1")
                .city("Bengaluru")
                .state("Karnataka")
                .pincode("560001")
                .contactNumber("9876543210")
                .status(PropertyStatus.ACTIVE)
                .build();

        Property savedProperty = Property.builder()
                .id("prop-1")
                .name(request.getName())
                .code(request.getCode())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .contactNumber(request.getContactNumber())
                .status(request.getStatus())
                .build();

        when(propertyRepository.existsByCode("GPG-01")).thenReturn(false);
        when(propertyRepository.save(any(Property.class))).thenReturn(savedProperty);

        PropertyResponse response = propertyService.createProperty(request, "owner-1");

        assertNotNull(response);
        assertEquals("Grand PG", response.getName());
        assertEquals("GPG-01", response.getCode());
    }
}
