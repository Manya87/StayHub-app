package com.stayhub.config;

import com.stayhub.auth.AuthRepository;
import com.stayhub.auth.User;
import com.stayhub.common.enums.PropertyStatus;
import com.stayhub.common.enums.RoleType;
import com.stayhub.property.Property;
import com.stayhub.property.PropertyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final AuthRepository authRepository;
    private final PropertyRepository propertyRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        User admin = authRepository.findByEmail("admin@pghub.com").orElse(null);
        if (admin == null) {
            admin = User.builder()
                    .email("admin@pghub.com")
                    .passwordHash(passwordEncoder.encode("Password123!"))
                    .firstName("Admin")
                    .lastName("Kumar")
                    .phone("9876543210")
                    .role(RoleType.PROPERTY_OWNER)
                    .isActive(true)
                    .build();
            admin = authRepository.save(admin);
        } else {
            admin.setPasswordHash(passwordEncoder.encode("Password123!"));
            admin.setActive(true);
            admin = authRepository.save(admin);
        }
        User savedAdmin = admin;

            if (!propertyRepository.existsByOwnerId(savedAdmin.getId())) {
                Property pgProperty = Property.builder()
                        .ownerId(savedAdmin.getId())
                        .name("Sunrise PG")
                        .code("SUN-BLR-01")
                        .address("123, Green Park")
                        .city("Bengaluru")
                        .state("Karnataka")
                        .pincode("560034")
                        .contactNumber("9876543210")
                        .status(PropertyStatus.ACTIVE)
                        .build();
                propertyRepository.save(pgProperty);
            }
            log.info("Demo user ready: admin@pghub.com / Password123!");

        if (!authRepository.existsByEmail("owner@stayhub.com")) {
            log.info("Seeding initial administrative and demo user...");
            User owner = User.builder()
                    .email("owner@stayhub.com")
                    .passwordHash(passwordEncoder.encode("Password123!"))
                    .firstName("Alex")
                    .lastName("Rivera")
                    .phone("+919876543210")
                    .role(RoleType.PROPERTY_OWNER)
                    .isActive(true)
                    .build();
            User savedOwner = authRepository.save(owner);

            if (propertyRepository.count() == 0) {
                Property demoProperty = Property.builder()
                        .ownerId(savedOwner.getId())
                        .name("StayHub Silicon Heights")
                        .code("SH-BLR-01")
                        .address("120 5th Main Road, Indiranagar")
                        .city("Bengaluru")
                        .state("Karnataka")
                        .pincode("560038")
                        .contactNumber("+918023456789")
                        .status(PropertyStatus.ACTIVE)
                        .build();
                propertyRepository.save(demoProperty);
                log.info("Seeded demo property: StayHub Silicon Heights");
            }

            log.info("Demo user ready: owner@stayhub.com / Password123!");
        }
    }
}
