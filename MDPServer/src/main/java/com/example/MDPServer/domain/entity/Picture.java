package com.example.MDPServer.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_no")
    private Long pictureNo = 0L;
    @Column(name = "p_picture", columnDefinition = "LONGBLOB")
    private Byte[] picture;
    @ManyToOne
    @JoinColumn(name = "u_no")
    private User userNo;
    @Builder
    public Picture(Long pictureNo, Byte[] picture, User userNo){
        this.pictureNo = pictureNo;
        this.picture = picture;
        this.userNo = userNo;
    }
}
