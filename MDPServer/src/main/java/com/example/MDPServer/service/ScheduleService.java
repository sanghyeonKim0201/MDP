package com.example.MDPServer.service;

import com.example.MDPServer.domain.repository.ScheduleRepository;
import com.example.MDPServer.dto.ScheduleDTO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
