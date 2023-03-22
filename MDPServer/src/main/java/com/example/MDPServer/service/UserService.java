package com.example.MDPServer.service;

import com.example.MDPServer.domain.repository.UserRepository;
import com.example.MDPServer.dto.UserDTO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
        var token = securityService.createToken(byUser.get().getUserNo().toString(), userId);
        json.put("status", "OK");
        json.put("token", token);

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
