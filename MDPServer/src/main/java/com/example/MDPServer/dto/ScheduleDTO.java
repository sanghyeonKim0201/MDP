package com.example.MDPServer.dto;

import com.example.MDPServer.domain.entity.Schedule;
import com.example.MDPServer.domain.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ScheduleDTO {
    private Long scheduleNo = 0L;
    private String airlineName;
    private String arrAirportId;
    private String depAirportId;
    private String arrPlandTime;
    private String depPlandTime;
    private String vihicleId;
    private User userNo;

    public Schedule toEntity(){
        return Schedule.builder()
                .scheduleNo(scheduleNo)
                .airlineName(airlineName)
                .arrAirportId(arrAirportId)
                .depAirportId(depAirportId)
                .arrPlandTime(arrPlandTime)
                .depPlandTime(depPlandTime)
                .vihicleId(vihicleId)
                .userNo(userNo)
                .build();
    }

    @Builder
    public ScheduleDTO(Long scheduleNo, String airlineName, String arrAirportId, String depAirportId, String arrPlandTime, String depPlandTime, String vihicleId, User userNo){
        this.airlineName = airlineName;
        this.scheduleNo = scheduleNo;
        this.arrAirportId = arrAirportId;
        this.depAirportId = depAirportId;
        this.arrPlandTime = arrPlandTime;
        this.depPlandTime = depPlandTime;
        this.vihicleId = vihicleId;
        this.userNo = userNo;
    }
}
