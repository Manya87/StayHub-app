package com.stayhub.dashboard;

import com.stayhub.bed.BedRepository;
import com.stayhub.common.enums.BedStatus;
import com.stayhub.common.enums.ComplaintStatus;
import com.stayhub.common.enums.PaymentStatus;
import com.stayhub.complaint.ComplaintRepository;
import com.stayhub.dashboard.dto.DashboardStatsResponse;
import com.stayhub.payment.Payment;
import com.stayhub.payment.PaymentRepository;
import com.stayhub.property.PropertyRepository;
import com.stayhub.room.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PropertyRepository propertyRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final PaymentRepository paymentRepository;
    private final ComplaintRepository complaintRepository;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getStats(String propertyId) {
        long totalProperties = propertyRepository.count();
        long totalRooms = roomRepository.count();
        long totalBeds = bedRepository.count();
        long occupiedBeds = bedRepository.findByStatus(BedStatus.OCCUPIED).size();
        int occupancyRate = totalBeds > 0 ? (int) Math.round(((double) occupiedBeds / totalBeds) * 100) : 0;

        List<Payment> paidPayments = paymentRepository.findByStatus(PaymentStatus.PAID);
        BigDecimal monthlyRevenue = paidPayments.stream()
                .map(Payment::getPaidAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Payment> pendingPayments = paymentRepository.findByStatus(PaymentStatus.PENDING);
        BigDecimal pendingDues = pendingPayments.stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long openComplaints = complaintRepository.findByStatus(ComplaintStatus.OPEN).size()
                + complaintRepository.findByStatus(ComplaintStatus.IN_PROGRESS).size();

        return DashboardStatsResponse.builder()
                .totalProperties(totalProperties)
                .totalRooms(totalRooms)
                .totalBeds(totalBeds)
                .occupiedBeds(occupiedBeds)
                .occupancyRate(occupancyRate)
                .monthlyRevenue(monthlyRevenue)
                .pendingDues(pendingDues)
                .openComplaints(openComplaints)
                .build();
    }
}
