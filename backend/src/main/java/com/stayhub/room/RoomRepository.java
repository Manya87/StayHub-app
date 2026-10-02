package com.stayhub.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    List<Room> findByPropertyId(String propertyId);
    Optional<Room> findByPropertyIdAndRoomNumber(String propertyId, String roomNumber);
    boolean existsByPropertyIdAndRoomNumber(String propertyId, String roomNumber);
}
