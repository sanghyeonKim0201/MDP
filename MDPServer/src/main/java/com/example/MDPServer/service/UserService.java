package com.example.MDPServer.service;

import com.example.MDPServer.domain.repository.UserRepository;
import com.example.MDPServer.dto.UserDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityService securityService;
    @Value("${jwt.secret}")
    private String secretKey;
    private Long expireMs = 1000 * 60 * 60L;

    public JSONObject login(String userId, String userPw) {

        var byUser = userRepository.findByUserId(userId);

        JSONObject json = new JSONObject();

        if(!byUser.isPresent()){
            json.put("status", "FAIL");
            return json;
        }

        if(!securityService.passwordEncoder().matches(userPw, byUser.get().getUserPw())){
            json.put("status", "FAIL");
            return json;
        }
        UserDTO user =  UserDTO.builder()
                .userNo(byUser.get().getUserNo())
                .userName1(byUser.get().getUserName1())
                .userName2(byUser.get().getUserName2())
                .userPhone(byUser.get().getUserPhone())
                .userBirth(byUser.get().getUserBirth())
                .userId(byUser.get().getUserId())
                .userPw(byUser.get().getUserPw())
                .userPicture(byUser.get().getUserPicture())
                .finger(byUser.get().getFinger()).build();
        HashMap<String, Object>userMap = new HashMap<>();
        for (Field field : UserDTO.class.getDeclaredFields()) {
            field.setAccessible(true);
            Object value = "";
            try{
                value = field.get(user);
            }catch (Exception e){
                e.printStackTrace();
            }
            userMap.put(field.getName(), value);
        }
        var token = securityService.createToken(byUser.get().getUserNo().toString(), userId);
        json.put("status", "OK");
        json.put("token", token);
        json.put("user", userMap);
        return json;
    }
    public JSONObject userIdCheck(String userId){
        var user = userRepository.findByUserId(userId);
        JSONObject json = new JSONObject();
        if(user.isPresent()){
            json.put("status", "FAIL");
            return json;
        }

        json.put("status", "OK");
        return json;
    }
    public JSONObject join(UserDTO userDTO){

        var user = userIdCheck(userDTO.getUserId());
        JSONObject json = new JSONObject();
        if(user.getString("status").equals("FAIL")){
            json.put("status", "FAIL");
            return json;
        }
        userDTO.setUserPw(securityService.passwordEncoder().encode(userDTO.getUserPw()));

        userRepository.save(userDTO.toEntity());
        return user;
    }

}
