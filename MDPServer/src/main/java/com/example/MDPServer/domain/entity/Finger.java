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
public class Finger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "f_no")
    private Long fingerNo = 0L;
    @Column(name = "f_finger", columnDefinition = "varchar(10000)")
    private String finger;
    @ManyToOne
    @JoinColumn(name = "u_no")
    private User userNo;
    @Builder
    public Finger(Long fingerNo, String finger, User userNo){
        this.fingerNo = fingerNo;
        this.finger = finger;
        this.userNo = userNo;
    }
}
