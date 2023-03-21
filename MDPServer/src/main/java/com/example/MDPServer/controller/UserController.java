package com.example.MDPServer.controller;

import com.example.MDPServer.domain.entity.User;
import com.example.MDPServer.dto.UserDTO;
import com.example.MDPServer.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Objects;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;
    private final HttpHeaders headers = new HttpHeaders();
    {
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    }
    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO, HttpServletRequest httpServletRequest, BindingResult result){
        HttpSession session = httpServletRequest.getSession();
        var user = userService.login(userDTO.getUserId(), userDTO.getUserPw());
        if(user == null){
            session.invalidate();
            return new ResponseEntity<>(new JSONObject().put("status", "FAIL").toString(), headers, HttpStatus.UNAUTHORIZED);
        }
        session.setAttribute("login", user);
        System.out.println(session.getAttribute("login").toString());
        return new ResponseEntity<>(user, headers, HttpStatus.OK);
    }
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserDTO userDTO){
        var join = userService.join(userDTO);
        if(join.getString("status").equals("FAIL")){
            return new ResponseEntity<>(join.toString(), headers, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(join.toString(), headers, HttpStatus.CREATED);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<?>userIdCheck(@PathVariable("userId") String userId){
        System.out.println(userId);
        var check = userService.userIdCheck(userId);
        if(check.getString("status").equals("FAIL")){
            return new ResponseEntity<>(check.toString(), headers, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(check.toString(), headers, HttpStatus.OK);
    }
    @GetMapping("/login")
    public ResponseEntity<?>loginUser(HttpServletRequest httpServletRequest){
        try{
            HttpSession session = httpServletRequest.getSession();
            System.out.println("session : " + session.getAttribute("login"));
            HashMap<String, Object>map = new HashMap<>();
            int cnt = 0;
            for (Field field : UserDTO.class.getDeclaredFields()) {
                field.setAccessible(true);
                Object value = "";
                try{
                    value = field.get(session.getAttribute("login"));
                    map.put("userNo,userName1,userName2,userId,userPw,userBirth,userPhone,userPicture,finger".split(",")[cnt], value);
                    cnt++;
                }catch (Exception e){

                }
            }
            System.out.println(new JSONObject(map).toString());
            return new ResponseEntity<>(new JSONObject(map).toString(), headers, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new JSONObject().put("status", "FAIL"), headers, HttpStatus.UNAUTHORIZED);
        }
    }
}
