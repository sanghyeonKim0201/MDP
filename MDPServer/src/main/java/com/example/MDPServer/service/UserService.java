package com.example.MDPServer.service;

import com.example.MDPServer.Utils.JwtUtil;
import com.example.MDPServer.domain.repository.UserRepository;
import com.example.MDPServer.dto.UserDTO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Value("${jwt.secret}")
    private String secretKey;
    private Long expireMs = 1000 * 60 * 60L;
    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public String login(String userId, String userPw) {

        var byUser = userRepository.findByUserId(userId);

        if(byUser.isPresent()){
            if(!passwordEncoder.matches(userPw, byUser.get().getUserPw())){
                return null;
            }
        }else{
            return null;
        }

//        UserDTO user = UserDTO.builder().
//                userNo(byUser.get().getUserNo()).
//                userId(byUser.get().getUserId()).0
//                userPw(byUser.get().getUserPw()).
//                userName1(byUser.get().getUserName1()).
//                userName2(byUser.get().getUserName2()).
//                userPhone(byUser.get().getUserPhone()).
//                userBirth(byUser.get().getUserBirth()).
//                userPicture(byUser.get().getUserPicture()).
//                finger(byUser.get().getFinger())
//                .build();

        System.out.println(byUser.get().getUserNo());

        return JwtUtil.createJwt(byUser.get().getUserNo(), secretKey, expireMs);
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
        userDTO.setUserPw(passwordEncoder.encode(userDTO.getUserPw()));

        userRepository.save(userDTO.toEntity());
        return user;
    }
}
