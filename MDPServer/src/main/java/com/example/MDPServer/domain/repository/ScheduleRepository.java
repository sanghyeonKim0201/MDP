package com.example.MDPServer.domain.repository;

import com.example.MDPServer.domain.entity.Schedule;
import com.example.MDPServer.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<?> findAllByUserNo(User UserNo);
    Optional<Schedule> findByScheduleNo(Long scheduleNo);
}
