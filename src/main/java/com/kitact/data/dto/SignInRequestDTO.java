package com.kitact.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 유저의 로그인시 전달되는 DTO 클래스
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequestDTO {
    private String username;
    private String password;
}
