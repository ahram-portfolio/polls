package com.example.polls.poll.ui;

import com.example.polls.common.domain.PeriodDate;
import com.example.polls.poll.domain.Poll;
import lombok.Getter;

@Getter
public class PollView {

    private long id;
    private String subject;
    private PeriodDate period;
    private String creator;


    protected PollView() {}

    public PollView(Poll poll) {
        this.id = poll.getPollNo();
        this.subject = poll.getSubject();
        this.period = poll.getPeriod();
        if (poll.getCreator() != null)
            this.creator = poll.getCreator().getName();
    }
}
