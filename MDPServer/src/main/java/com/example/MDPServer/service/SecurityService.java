package com.example.MDPServer.service;

import com.example.MDPServer.domain.repository.UserRepository;
import com.example.MDPServer.dto.UserDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;

@Service
public class SecurityService implements UserDetailsService {

    @Value("${jwt.header}")
    private String header;
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.token-validity-in-seconds}")
    private int jwtExpirationInMs;

    @Autowired
    private UserRepository userRepository;


    public String createToken(String userNo, String userId){

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(secret);
        Key signingkey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        HashMap<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());

        HashMap<String, Object>claim = new HashMap<>();
        claim.put("userNo", userNo);
        claim.put("userName", userId);
        return Jwts.builder()
                .setClaims(claim)
                .setHeader(header)
                .setSubject(userNo)//setClaims보다 밑에 있어야 함
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(signingkey, signatureAlgorithm)
                .compact();
    }
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = loadUserByUsername(this.getUserNo(token).toString());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Long userNo = Long.parseLong(username);
        var byUser = userRepository.findByUserNo(userNo);
        return UserDTO.builder().
                userNo(byUser.get().getUserNo()).
                userId(byUser.get().getUserId()).
                userPw(byUser.get().getUserPw()).
                userName1(byUser.get().getUserName1()).
                userName2(byUser.get().getUserName2()).
                userPhone(byUser.get().getUserPhone()).
                userBirth(byUser.get().getUserBirth())
                .build();
    }
    public Long getUserNo(String token){
        return Long.parseLong(Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(secret))
                .build()
                .parseClaimsJws(token)
                .getBody().get("userNo").toString());
    }
    public String getUserName(String token){
        return Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(secret))
                .build()
                .parseClaimsJws(token)
                .getBody().get("userName").toString();
    }
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secret)).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    public String resolveToken(HttpServletRequest request){
        return  request.getHeader(header);
    }
}
