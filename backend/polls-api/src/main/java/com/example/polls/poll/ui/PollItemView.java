package com.example.polls.poll.ui;

import lombok.Getter;

@Getter
public class PollItemView {

    private String content;
    private Integer ordering;
    private Integer cnt = 0;
    private Boolean isPolled = false;

    protected PollItemView() {}

    public PollItemView(String content, Integer ordering, Integer cnt, Boolean isPolled) {
        this.content = content;
        this.ordering = ordering;
        this.cnt = cnt;
        this.isPolled = isPolled;
    }
}
