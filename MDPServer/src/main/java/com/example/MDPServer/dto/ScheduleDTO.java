package com.example.MDPServer.dto;

import com.example.MDPServer.domain.entity.Schedule;
import com.example.MDPServer.domain.entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ScheduleDTO {
    private Long scheduleNo = 0L;
    private String airlineId;
    private String airlineName;
    private String arrAirportName;
    private String depAirportName;
    private String arrAirportId;
    private String depAirportId;
    private String arrPlandTime;
    private String depPlandTime;
    private String vihicleId;
    private User userNo;

    public Schedule toEntity(){
        return Schedule.builder()
                .airlineName(airlineName)
                .airlineId(airlineId)
                .arrAirportId(arrAirportId)
                .arrAirportName(arrAirportName)
                .depAirportId(depAirportId)
                .depAirportName(depAirportName)
                .arrPlandTime(arrPlandTime)
                .depPlandTime(depPlandTime)
                .vihicleId(vihicleId)
                .userNo(userNo).build();
    }

    @Builder
    public ScheduleDTO(Long scheduleNo, String airlineName, String arrAirportName, String depAirportName, String arrPlandTime, String depPlandTime, String vihicleId, User userNo, String airlineId, String depAirportId, String arrAirportId){
        this.airlineName = airlineName;
        this.scheduleNo = scheduleNo;
        this.arrAirportName = arrAirportName;
        this.depAirportName = depAirportName;
        this.arrPlandTime = arrPlandTime;
        this.depPlandTime = depPlandTime;
        this.vihicleId = vihicleId;
        this.userNo = userNo;
        this.airlineId = airlineId;
        this.arrAirportId = arrAirportId;
        this.depAirportId = depAirportId;
    }
}
