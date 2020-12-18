package com.example.polls.poll.command;


import com.example.polls.poll.app.PolledService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PolledCommandController {

    @Autowired
    private PolledService polledService;


    @PutMapping(value = "/polls/{pollNo}/polled")
    public ResponseEntity polled(
        @PathVariable(value = "pollNo") Long pollNo,
        @RequestBody List<Integer> itemNos
    ) {
        // TODO Login 기능 개발 후
        // userNo: Authentication 정보로 변경
        Long userNo = 1L;

        polledService.polled(
                userNo,
                pollNo,
                itemNos
        );

        return new ResponseEntity(HttpStatus.OK);
    }
}
