package com.example.MDPServer.service;

import com.example.MDPServer.domain.repository.ScheduleRepository;
import com.example.MDPServer.dto.ScheduleDTO;
import com.example.MDPServer.dto.UserDTO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {
    private ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository){
        this.scheduleRepository = scheduleRepository;
    }

    public JSONObject postSchedule(ScheduleDTO scheduleDTO){
        JSONObject json = new JSONObject();
        try{
            scheduleRepository.save(scheduleDTO.toEntity());
            json.put("status", "OK");
            return json;
        }catch (Exception e){
            e.printStackTrace();
            json.put("status", "FAIL");
            return json;
        }
    }

    public List<?> getScheduleList(Long userNo){
        return scheduleRepository.findAllByUserNo(UserDTO.builder().userNo(userNo).build().toEntity());
    }
    public ScheduleDTO getSchedule(Long scheduleNo){
        var schedule = scheduleRepository.findByScheduleNo(scheduleNo).get();
        ScheduleDTO scheduleDTO = ScheduleDTO.builder()
                .scheduleNo(schedule.getScheduleNo())
                .airlineId(schedule.getAirlineId())
                .depAirportName(schedule.getDepAirportName())
                .depAirportId(schedule.getDepAirportId())
                .arrAirportName(schedule.getArrAirportName())
                .arrAirportId(schedule.getArrAirportId())
                .arrPlandTime(schedule.getArrPlandTime())
                .depPlandTime(schedule.getDepPlandTime())
                .airlineName(schedule.getAirlineName())
                .vihicleId(schedule.getVihicleId())
                .userNo(UserDTO.builder().userNo(schedule.getUserNo().getUserNo()).build().toEntity())
                .build();
        return scheduleDTO;
    }
    public JSONObject deleteSchedule(Long scheduleNo){
        try{
            scheduleRepository.deleteById(scheduleNo);
            return new JSONObject().put("status", "OK");
        }catch (Exception e){
            return new JSONObject().put("status", "FAIL");
        }

    }
}
