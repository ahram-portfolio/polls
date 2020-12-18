package com.example.polls.poll.command;

import com.example.polls.poll.app.PollService;
import com.example.polls.poll.domain.Poll;
import com.example.polls.poll.ui.PollForm;
import com.example.polls.poll.ui.PollView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PollCommandController {

    @Autowired
    private PollService pollService;


    @PostMapping(value = "/polls")
    public ResponseEntity<Long> add(
        @RequestBody PollForm pollForm
    ) {
        // TODO Login 기능 개발 후
        // userNo: Authentication 정보로 변경
        Long userNo = 1L;

        Poll poll = pollService.create(userNo, pollForm);

        return new ResponseEntity<Long>(
                poll.getPollNo(),
                HttpStatus.CREATED
        );
    }

    @DeleteMapping(value = "/polls/{pollNo}")
    public ResponseEntity delete(
        @PathVariable(value = "pollNo") Long pollNo
    ) {
        pollService.delete(pollNo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
