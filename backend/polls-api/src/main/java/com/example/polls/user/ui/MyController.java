package com.example.polls.user.ui;

import com.example.polls.common.exception.NotPresentEntityException;
import com.example.polls.user.domain.User;
import com.example.polls.user.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class MyController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/my")
    public ResponseEntity<User> getMyInfo() {
        // TODO Login 기능 개발 후
        // userNo: Authentication 정보로 변경
        Long userNo = 1L;

        Optional<User> userOptional = userRepository.findById(userNo);
        if (!userOptional.isPresent())
            throw new NotPresentEntityException("사용자");

        return new ResponseEntity<>(
            userOptional.get(),
            HttpStatus.OK
        );
    }
}
