package com.example.MDPServer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @PostMapping("/api/users/login")
    public ResponseEntity<?> login(){

        return null;
    }
    @PostMapping("/api/users/join")
    public ResponseEntity<?> join(){
        return null;
    }

}
