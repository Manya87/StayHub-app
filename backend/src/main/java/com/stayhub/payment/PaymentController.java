package com.stayhub.payment;

import com.stayhub.common.response.ApiResponse;
import com.stayhub.payment.dto.CreatePaymentRequest;
import com.stayhub.payment.dto.PaymentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Tag(name = "Payments", description = "Tenant rent, deposit, and payment collection endpoints")
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    @Operation(summary = "Get list of payments, optionally filtered by property")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getPayments(
            @RequestParam(required = false) String propertyId
    ) {
        List<PaymentResponse> payments = paymentService.getPayments(propertyId);
        return ResponseEntity.ok(ApiResponse.success(payments));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get payment transaction details by ID")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentById(@PathVariable String id) {
        PaymentResponse payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(ApiResponse.success(payment));
    }

    @PostMapping
    @Operation(summary = "Record a new payment transaction")
    public ResponseEntity<ApiResponse<PaymentResponse>> recordPayment(@Valid @RequestBody CreatePaymentRequest request) {
        PaymentResponse response = paymentService.recordPayment(request);
        return ResponseEntity.ok(ApiResponse.success("Payment recorded successfully", response));
    }
}
