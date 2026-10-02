package com.stayhub.property;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property, String> {
    List<Property> findByOwnerId(String ownerId);
    Optional<Property> findByCode(String code);
    boolean existsByCode(String code);
    boolean existsByOwnerId(String ownerId);
}
