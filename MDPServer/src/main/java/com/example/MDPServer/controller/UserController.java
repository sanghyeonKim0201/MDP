package com.example.MDPServer.controller;

import com.example.MDPServer.domain.entity.User;
import com.example.MDPServer.dto.UserDTO;
import com.example.MDPServer.service.UserService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Objects;
import java.util.logging.Logger;

@RestController
public class UserController {
    private UserService userService;
    private final HttpHeaders headers = new HttpHeaders();
    {
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    }
//    private Logger logger = (Logger) LoggerFactory.getLogger(UserController.class);
    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }
    @PostMapping("/api/users/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO){

        var user = userService.login(userDTO.getUserId(), userDTO.getUserPw());
        if(user == null){
            return null;
        }
        return new ResponseEntity<>(user, headers, HttpStatus.OK);
    }
    @PostMapping("/api/users/join")
    public ResponseEntity<?> join(@RequestBody UserDTO userDTO){
        var join = userService.join(userDTO);
        if(join == null){
            return null;
        }
        return new ResponseEntity<>(join, headers, HttpStatus.CREATED);
    }

}
