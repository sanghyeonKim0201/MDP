package com.example.MDPServer.controller;

import com.example.MDPServer.dto.ScheduleDTO;
import com.example.MDPServer.dto.UserDTO;
import com.example.MDPServer.service.ScheduleService;
import com.example.MDPServer.service.SecurityService;
import jakarta.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;
    private final HttpHeaders headers = new HttpHeaders();
    {
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    }

    @Autowired
    private SecurityService securityService;

    @PostMapping("/reservation")
    public ResponseEntity reservation(@RequestBody ScheduleDTO scheduleDTO, HttpServletRequest request){
        try {
            scheduleDTO.setUserNo(UserDTO.builder()
                    .userNo(securityService.getUserNo(securityService.resolveToken(request))).build().toEntity());
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
    @GetMapping
    public ResponseEntity<?> reservationList(@RequestParam("userNo")String userNo){
        System.out.println(userNo);
        List<?> scheduleList = scheduleService.getScheduleList(Long.parseLong(userNo));
        JSONObject json = new JSONObject();
        json.put("list", scheduleList);
        return new ResponseEntity<>(json.toString(), headers, HttpStatus.OK);
    }
    @GetMapping("/{scheduleNo}")
    public ResponseEntity<?> reservationInfo(@PathVariable("scheduleNo")String scheduleNo){
        System.out.println(scheduleNo);
        var schedule = scheduleService.getSchedule(Long.parseLong(scheduleNo));
        return new ResponseEntity<>(schedule, headers, HttpStatus.OK);
    }
    @DeleteMapping("/{scheduleNo}")
    public ResponseEntity<?> reservationDelete(@PathVariable("scheduleNo")String scheduleNo){
        var data = scheduleService.deleteSchedule(Long.parseLong(scheduleNo));
        if(data.getString("status").equals("FAIL")){
            return new ResponseEntity<>(data.toString(), headers, HttpStatus.UNAUTHORIZED);
        }else{
            return new ResponseEntity<>(data.toString(), headers, HttpStatus.OK);
        }
    }

}
