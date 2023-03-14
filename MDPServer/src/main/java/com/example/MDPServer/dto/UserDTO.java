package com.example.MDPServer.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
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


}
