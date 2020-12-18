package com.example.polls.poll.domain;

import lombok.Getter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Getter
@Embeddable
public class PollItem {

    @Column(name = "item_no")
    private Integer itemNo;

    @Column(name = "contents")
    private String content;


    protected PollItem() {}

    public PollItem(Integer itemNo, String content) {
        this.itemNo = itemNo;
        this.content = content;
    }
}
