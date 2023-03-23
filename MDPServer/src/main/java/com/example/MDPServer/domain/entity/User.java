package com.example.MDPServer.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "u_no")
    private Long userNo = 0L;
    @Column(nullable = false, name = "u_name1")
    private String userName1;
    @Column(name = "u_name2", nullable = false)
    private String userName2;
    @Column(name = "u_id", nullable = false)
    private String userId;
    @Column(name = "u_pw", nullable = false)
    private String userPw;
    @Column(name = "u_birth", nullable = false)
    private LocalDate userBirth;
    @Column(name = "u_phone", nullable = false)
    private String userPhone;
    @Column(name = "u_picture", columnDefinition = "LONGBLOB")
    private Byte[] userPicture;
    @Column(name = "u_finger", columnDefinition = "varchar(10000)")
    private String finger;

    @Builder
    public User(Long userNo, String userName1, String userName2, String userId, String userPw, LocalDate userBirth, String userPhone, Byte[] userPicture, String finger){
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
