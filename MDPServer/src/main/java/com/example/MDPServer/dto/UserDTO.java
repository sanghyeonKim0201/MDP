package com.example.MDPServer.dto;

import com.example.MDPServer.domain.entity.User;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class UserDTO {
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
}
