package com.example.MDPServer.controller;

import com.example.MDPServer.dto.ScheduleDTO;
import com.example.MDPServer.service.ScheduleService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private ScheduleService scheduleService;
    private final HttpHeaders headers = new HttpHeaders();
    {
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    }

    @Autowired
    public ScheduleController(ScheduleService scheduleService){
        this.scheduleService = scheduleService;
    }

    @PostMapping("/reservation")
    public ResponseEntity reservation(@RequestBody ScheduleDTO scheduleDTO){
        try {
            System.out.println(scheduleDTO);
            var s = scheduleService.postSchedule(scheduleDTO);
            if(s.getString("status").equals("FAIL")){
                return new ResponseEntity(s.toString(), headers, HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity(s.toString(), headers, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(new JSONObject().put("status", "FAIL").toString(), headers, HttpStatus.UNAUTHORIZED);
        }
    }

}
