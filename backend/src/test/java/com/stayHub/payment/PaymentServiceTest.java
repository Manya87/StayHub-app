package com.stayhub.payment;

import com.stayhub.common.enums.PaymentMethod;
import com.stayhub.common.enums.PaymentStatus;
import com.stayhub.payment.dto.CreatePaymentRequest;
import com.stayhub.payment.dto.PaymentResponse;
import com.stayhub.property.Property;
import com.stayhub.property.PropertyRepository;
import com.stayhub.room.RoomRepository;
import com.stayhub.tenant.Tenant;
import com.stayhub.tenant.TenantRepository;
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
class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private TenantRepository tenantRepository;

    @Mock
    private PropertyRepository propertyRepository;

    @Mock
    private RoomRepository roomRepository;

    @Spy
    private PaymentMapper paymentMapper;

    @InjectMocks
    private PaymentService paymentService;

    @Test
    void testRecordPayment() {
        CreatePaymentRequest request = CreatePaymentRequest.builder()
                .tenantId("t-1")
                .propertyId("prop-1")
                .amount(new BigDecimal("8000"))
                .paymentType("RENT")
                .mode(PaymentMethod.UPI)
                .status(PaymentStatus.PAID)
                .transactionReference("UPI12345")
                .paymentDate(LocalDate.now())
                .dueDate(LocalDate.now())
                .build();

        Payment saved = Payment.builder()
                .id("pay-1")
                .tenantId("t-1")
                .propertyId("prop-1")
                .amount(new BigDecimal("8000"))
                .paidAmount(new BigDecimal("8000"))
                .paymentType("RENT")
                .mode(PaymentMethod.UPI)
                .status(PaymentStatus.PAID)
                .transactionReference("UPI12345")
                .paymentDate(LocalDate.now())
                .dueDate(LocalDate.now())
                .build();

        when(paymentRepository.save(any(Payment.class))).thenReturn(saved);
        when(tenantRepository.findById("t-1")).thenReturn(Optional.of(Tenant.builder().firstName("John").lastName("Doe").build()));
        when(propertyRepository.findById("prop-1")).thenReturn(Optional.of(Property.builder().name("Grand PG").build()));

        PaymentResponse response = paymentService.recordPayment(request);

        assertNotNull(response);
        assertEquals(new BigDecimal("8000"), response.getAmount());
        assertEquals("UPI12345", response.getTransactionReference());
    }
}
