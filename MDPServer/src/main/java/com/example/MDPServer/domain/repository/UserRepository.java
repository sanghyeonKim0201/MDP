package com.example.MDPServer.domain.repository;

import com.example.MDPServer.domain.entity.User;
import com.example.MDPServer.dto.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserIdAndUserPw(String userId, String userPw);
    Optional<User> findByUserId(String userId);
}
