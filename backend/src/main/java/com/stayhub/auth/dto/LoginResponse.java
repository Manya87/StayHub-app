package com.stayhub.auth.dto;

import com.stayhub.common.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String refreshToken;
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private RoleType role;
    private String avatarUrl;
}
