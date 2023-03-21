package com.example.MDPServer.service;

import com.example.MDPServer.domain.repository.UserRepository;
import com.example.MDPServer.dto.UserDTO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public UserDTO login(String userId, String userPw){
        var byUser = userRepository.findByUserIdAndUserPw(userId, userPw);
        if(!byUser.isPresent()){
            return null;
        }

        return UserDTO.builder().
                userNo(byUser.get().getUserNo()).
                userId(byUser.get().getUserId()).
                userPw(byUser.get().getUserPw()).
                userName1(byUser.get().getUserName1()).
                userName2(byUser.get().getUserName2()).
                userPhone(byUser.get().getUserPhone()).
                userBirth(byUser.get().getUserBirth()).
                userPicture(byUser.get().getUserPicture()).
                finger(byUser.get().getFinger())
                .build();
    }
    public JSONObject userIdCheck(String userId){
        var user = userRepository.findByUserId(userId);
        System.out.println(user.isPresent());
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
        userRepository.save(userDTO.toEntity());
        return user;
    }
}
