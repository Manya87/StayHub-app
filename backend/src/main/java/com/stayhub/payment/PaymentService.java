package com.stayhub.payment;

import com.stayhub.common.exception.ResourceNotFoundException;
import com.stayhub.payment.dto.CreatePaymentRequest;
import com.stayhub.payment.dto.PaymentResponse;
import com.stayhub.property.Property;
import com.stayhub.property.PropertyRepository;
import com.stayhub.room.Room;
import com.stayhub.room.RoomRepository;
import com.stayhub.tenant.Tenant;
import com.stayhub.tenant.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final TenantRepository tenantRepository;
    private final PropertyRepository propertyRepository;
    private final RoomRepository roomRepository;
    private final PaymentMapper paymentMapper;

    @Transactional(readOnly = true)
    public List<PaymentResponse> getPayments(String propertyId) {
        List<Payment> payments = propertyId != null
                ? paymentRepository.findByPropertyId(propertyId)
                : paymentRepository.findAll();

        return payments.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PaymentResponse getPaymentById(String id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment", "id", id));
        return mapToResponse(payment);
    }

    @Transactional
    public PaymentResponse recordPayment(CreatePaymentRequest request) {
        Payment payment = paymentMapper.toEntity(request);
        payment = paymentRepository.save(payment);
        return mapToResponse(payment);
    }

    private PaymentResponse mapToResponse(Payment payment) {
        Tenant tenant = tenantRepository.findById(payment.getTenantId()).orElse(null);
        String tenantName = tenant != null ? tenant.getFirstName() + " " + tenant.getLastName() : "Unknown Tenant";
        String propertyName = propertyRepository.findById(payment.getPropertyId()).map(Property::getName).orElse("StayHub Property");
        String roomNumber = (tenant != null) ? roomRepository.findById(tenant.getRoomId()).map(Room::getRoomNumber).orElse("-") : "-";

        return paymentMapper.toResponse(payment, tenantName, propertyName, roomNumber);
    }
}
