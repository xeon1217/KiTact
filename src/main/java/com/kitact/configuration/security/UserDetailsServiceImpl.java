package com.kitact.configuration.security;

import com.kitact.data.model.User;
import com.kitact.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    private final UserRepository userRepository;

    @Autowired
    UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String userPK) throws UsernameNotFoundException {
        User user = userRepository.findById(Long.valueOf(userPK))
                .orElseThrow(() -> new UsernameNotFoundException("Can't find " + userPK));

        return new UserDetailsImpl(user);
    }
}