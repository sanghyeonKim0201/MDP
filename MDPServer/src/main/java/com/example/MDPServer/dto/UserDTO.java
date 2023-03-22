package com.example.MDPServer.dto;

import com.example.MDPServer.domain.entity.User;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;

@Data
@NoArgsConstructor
public class UserDTO implements UserDetails {
    private Long userNo = 0L;
    private String userName1;
    private String userName2;
    private String userId;
    private String userPw;
    private LocalDate userBirth;
    private String userPhone;
    private Byte[] userPicture;
    private String finger;

    public User toEntity(){
        User user = User.builder().
                userNo(userNo).
                userName1(userName1).
                userName2(userName2).
                userId(userId).
                userPw(userPw).
                userBirth(userBirth).
                userPhone(userPhone).
                userPicture(userPicture).
                finger(finger).build();
        return user;
    }

    @Builder
    public UserDTO(Long userNo, String userName1, String userName2, String userId, String userPw, LocalDate userBirth, String userPhone, Byte[] userPicture, String finger){
        this.userNo = userNo;
        this.userName1 = userName1;
        this.userName2 = userName2;
        this.userId = userId;
        this.userPw = userPw;
        this.userBirth = userBirth;
        this.userPhone = userPhone;
        this.userPicture = userPicture;
        this.finger = finger;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return this.userPw;
    }

    @Override
    public String getUsername() {
        return this.userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
