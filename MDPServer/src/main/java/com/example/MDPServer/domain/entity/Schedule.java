package com.example.MDPServer.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity(name = "schedules")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_no")
    private Long scheduleNo = 0L;
    @Column(name = "s_airlineId")
    private String airlineId;
    @Column(name = "s_airlineName")
    private String airlineName;
    @Column(name = "s_arrAirportName")
    private String arrAirportName;
    @Column(name = "s_depAirportName")
    private String depAirportName;
    @Column(name = "s_arrAirportId")
    private String arrAirportId;
    @Column(name = "s_depAirportId")
    private String depAirportId;
    @Column(name = "s_arrPlandTime")
    private String arrPlandTime;
    @Column(name = "s_depPlandTime")
    private String depPlandTime;
    @Column(name = "s_vihicleId")
    private String vihicleId;
    @Column(name = "s_seat")
    private String seat;
    @ManyToOne
    @JoinColumn(name = "u_no")
    private User userNo;

    @Builder
    public Schedule(Long scheduleNo, String airlineName, String arrAirportId, String depAirportId, String arrPlandTime, String depPlandTime, String vihicleId, User userNo, String airlineId, String arrAirportName, String depAirportName, String seat){
        this.scheduleNo = scheduleNo;
        this.airlineName = airlineName;
        this.arrAirportName = arrAirportName;
        this.depAirportName = depAirportName;
        this.arrPlandTime = arrPlandTime;
        this.depPlandTime = depPlandTime;
        this.vihicleId = vihicleId;
        this.userNo = userNo;
        this.arrAirportId= arrAirportId;
        this.depAirportId= depAirportId;
        this.airlineId= airlineId;
        this.seat = seat;
    }
}
