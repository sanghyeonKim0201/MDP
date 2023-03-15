package com.example.MDPServer.service;

import com.example.MDPServer.domain.repository.UserRepository;
import com.example.MDPServer.dto.UserDTO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
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
    public String join(UserDTO userDTO){
        var join = userRepository.findByUserId(userDTO.getUserId());

        if(join.isPresent()){
            return null;
        }
        userRepository.save(userDTO.toEntity());
        JsonObject json = new JsonObject();
        json.addProperty("success", "OK");
        return new Gson().toJson(json);
    }
}
