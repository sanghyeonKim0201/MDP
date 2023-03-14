package com.example.MDPServer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;

@RestController
public class UserController {
    @PostMapping("/api/users/login")
    public ResponseEntity<?> login(@RequestBody HashMap<String, Object>param){
        
        return null;
    }
    @PostMapping("/api/users/join")
    public ResponseEntity<?> join(){
        return null;
    }

}
