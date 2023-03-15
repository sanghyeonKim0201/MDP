package com.example.MDPServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MdpServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MdpServerApplication.class, args);
	}

}
