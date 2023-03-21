package com.example.MDPServer.domain.repository;

import com.example.MDPServer.domain.entity.Schedule;
import com.example.MDPServer.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

}
