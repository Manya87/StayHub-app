package com.stayhub.room;

import com.stayhub.common.enums.RoomType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "rooms", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"property_id", "room_number"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "property_id", nullable = false)
    private String propertyId;

    @Column(name = "room_number", nullable = false, length = 30)
    private String roomNumber;

    @Column(nullable = false)
    @Builder.Default
    private int floor = 1;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RoomType type;

    @Column(nullable = false)
    @Builder.Default
    private int capacity = 2;

    @Column(name = "base_rent", nullable = false, precision = 10, scale = 2)
    private BigDecimal baseRent;

    @Column(name = "has_attached_bathroom", nullable = false)
    @Builder.Default
    private boolean hasAttachedBathroom = false;

    @Column(name = "has_balcony", nullable = false)
    @Builder.Default
    private boolean hasBalcony = false;

    @Column(name = "has_ac", nullable = false)
    @Builder.Default
    private boolean hasAc = false;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "AVAILABLE";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
