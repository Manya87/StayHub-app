package com.stayhub.auth;

import com.stayhub.auth.dto.LoginRequest;
import com.stayhub.auth.dto.LoginResponse;
import com.stayhub.common.enums.RoleType;
import com.stayhub.security.JwtService;
import com.stayhub.security.SecurityUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthRepository authRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder()
                .id("u-1")
                .email("test@stayhub.com")
                .passwordHash("hashed")
                .firstName("Test")
                .lastName("User")
                .role(RoleType.PROPERTY_OWNER)
                .isActive(true)
                .build();
    }

    @Test
    void testLoginSuccess() {
        LoginRequest request = new LoginRequest("test@stayhub.com", "password123");
        Authentication auth = mock(Authentication.class);
        SecurityUser secUser = new SecurityUser(sampleUser);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(auth);
        when(auth.getPrincipal()).thenReturn(secUser);
        when(jwtService.generateToken(any())).thenReturn("mock-access-token");
        when(jwtService.generateRefreshToken(any())).thenReturn("mock-refresh-token");

        LoginResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("test@stayhub.com", response.getEmail());
        assertEquals("mock-access-token", response.getToken());
    }
}
