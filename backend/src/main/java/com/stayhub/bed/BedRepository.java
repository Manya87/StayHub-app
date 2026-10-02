package com.stayhub.bed;

import com.stayhub.common.enums.BedStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BedRepository extends JpaRepository<Bed, String> {
    List<Bed> findByRoomId(String roomId);
    List<Bed> findByStatus(BedStatus status);
}
