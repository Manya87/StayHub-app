package com.stayhub.property;

import com.stayhub.common.exception.BadRequestException;
import com.stayhub.common.exception.ResourceNotFoundException;
import com.stayhub.property.dto.CreatePropertyRequest;
import com.stayhub.property.dto.PropertyResponse;
import com.stayhub.property.dto.UpdatePropertyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;

    @Transactional(readOnly = true)
    public List<PropertyResponse> getAllProperties() {
        return propertyRepository.findAll().stream()
                .map(p -> propertyMapper.toResponse(p, 10, 25, 20))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PropertyResponse getPropertyById(String id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property", "id", id));
        return propertyMapper.toResponse(property, 10, 25, 20);
    }

    @Transactional
    public PropertyResponse createProperty(CreatePropertyRequest request, String ownerId) {
        if (propertyRepository.existsByCode(request.getCode())) {
            throw new BadRequestException("Property with code " + request.getCode() + " already exists");
        }

        Property property = propertyMapper.toEntity(request, ownerId);
        property = propertyRepository.save(property);
        return propertyMapper.toResponse(property, 0, 0, 0);
    }

    @Transactional
    public PropertyResponse updateProperty(String id, UpdatePropertyRequest request) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property", "id", id));

        if (request.getName() != null) property.setName(request.getName());
        if (request.getAddress() != null) property.setAddress(request.getAddress());
        if (request.getCity() != null) property.setCity(request.getCity());
        if (request.getState() != null) property.setState(request.getState());
        if (request.getPincode() != null) property.setPincode(request.getPincode());
        if (request.getContactNumber() != null) property.setContactNumber(request.getContactNumber());
        if (request.getStatus() != null) property.setStatus(request.getStatus());
        if (request.getImageUrl() != null) property.setImageUrl(request.getImageUrl());

        property = propertyRepository.save(property);
        return propertyMapper.toResponse(property, 10, 25, 20);
    }

    @Transactional
    public void deleteProperty(String id) {
        if (!propertyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Property", "id", id);
        }
        propertyRepository.deleteById(id);
    }
}
