package com.example.MDPServer.controller;

import com.example.MDPServer.dto.UserDTO;
import com.example.MDPServer.service.SecurityService;
import com.example.MDPServer.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.logging.Log;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserService userService;
    private final HttpHeaders headers = new HttpHeaders();
    {
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO){
        var user = userService.login(userDTO.getUserId(), userDTO.getUserPw());
        if(user.getString("status").equals("FAIL")){
            return new ResponseEntity<>(new JSONObject().put("status", "FAIL").toString(), headers, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(user.toString(), headers, HttpStatus.OK);
    }
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserDTO userDTO){
        var join = userService.join(userDTO);
        if(join.getString("status").equals("FAIL")){
            return new ResponseEntity<>(join.toString(), headers, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(join.toString(), headers, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?>userIdCheck(@RequestParam("userId") String userId){
        System.out.println(userId);
        var check = userService.userIdCheck(userId);
        if(check.getString("status").equals("FAIL")){
            return new ResponseEntity<>(check.toString(), headers, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(check.toString(), headers, HttpStatus.OK);
    }
    @GetMapping("/{userNo}")
    public ResponseEntity<?>userInfo(@PathVariable("userNo") String userNo){
        System.out.println(userNo);
        var user = userService.getUser(Long.parseLong(userNo));
        if(user.getString("status").equals("FAIL")){
            return new ResponseEntity<>(user.toString(), headers, HttpStatus.UNAUTHORIZED);
        }else{
            return new ResponseEntity<>(user.toString(), headers, HttpStatus.OK);
        }
    }

}
