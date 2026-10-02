package com.stayhub.staff;

import com.stayhub.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;

    @Transactional(readOnly = true)
    public List<Staff> getStaff(String propertyId) {
        return propertyId != null ? staffRepository.findByPropertyId(propertyId) : staffRepository.findAll();
    }

    @Transactional
    public Staff addStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    @Transactional
    public void deleteStaff(String id) {
        if (!staffRepository.existsById(id)) {
            throw new ResourceNotFoundException("Staff", "id", id);
        }
        staffRepository.deleteById(id);
    }
}
