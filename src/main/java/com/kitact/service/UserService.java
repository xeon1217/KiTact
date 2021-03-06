package com.kitact.service;

import com.kitact.configuration.security.JWTProvider;
import com.kitact.data.dto.SignInRequestDTO;
import com.kitact.data.dto.SignUpRequestDTO;
import com.kitact.data.model.User;
import com.kitact.data.model.UserRole;
import com.kitact.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private static final String ADMIN_TOKEN = "AAABnv/xRVklrnYxKZ0aHgTBcXukeZygoC";

    //회원가입
    public User signUpUser(SignUpRequestDTO signUpRequestDTO) {
        String username = signUpRequestDTO.getUsername();
        Optional<User> found = userRepository.findByUsername(username);
        if (found.isPresent()) {
            throw new IllegalArgumentException("사용자 이름 : "+username+"을 누군가 사용중입니다!");
        }

        //패스워드 인코딩
        String password = passwordEncoder.encode(signUpRequestDTO.getPassword());

        //기본은 고객으로 회원가입을 시도했다고 가정
        UserRole userRole = UserRole.CUSTOMER;

        //관리자로 회원가입을 시도했는지?
        if (signUpRequestDTO.isAdmin()) {
            if (!signUpRequestDTO.getAdminToken().equals(ADMIN_TOKEN)) {
                throw new IllegalArgumentException("관리자 암호가 틀려 등록이 불가능합니다.");
            }
            userRole = UserRole.ADMIN;
        }

        //점주로 회원가입을 시도했는지?
        if (signUpRequestDTO.isOwner()) {
            userRole = UserRole.OWNER;
        }

        //입력된 정보를 이용하여 DB에 저장합니다.
        User user = new User(username, password, userRole);
        return userRepository.save(user);
    }

    public String signInUser(SignInRequestDTO signInRequestDTO) {
        String username = signInRequestDTO.getUsername();

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new IllegalArgumentException("로그인에 실패했습니다!")
        );

        if (!passwordEncoder.matches(signInRequestDTO.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("로그인에 실패했습니다!");
        }

        return jwtProvider.createToken(user.getUser_id().toString(), user.getRole());
    }

}