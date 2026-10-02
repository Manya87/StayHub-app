package com.stayhub.auth;

import com.stayhub.auth.dto.LoginRequest;
import com.stayhub.auth.dto.LoginResponse;
import com.stayhub.auth.dto.RefreshTokenRequest;
import com.stayhub.auth.dto.RegisterRequest;
import com.stayhub.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User registration, login, and token rotation endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user/owner account")
    public ResponseEntity<ApiResponse<LoginResponse>> register(@Valid @RequestBody RegisterRequest request) {
        LoginResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", response));
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user with email and password")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("User authenticated successfully", response));
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Rotate expired access token using refresh token")
    public ResponseEntity<ApiResponse<LoginResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        LoginResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", response));
    }

    @PostMapping("/google")
    @Operation(summary = "Authenticate or register user with Google account profile")
    public ResponseEntity<ApiResponse<LoginResponse>> googleLogin(@Valid @RequestBody com.stayhub.auth.dto.GoogleAuthRequest request) {
        LoginResponse response = authService.googleLogin(request);
        return ResponseEntity.ok(ApiResponse.success("Google authentication successful", response));
    }
}
