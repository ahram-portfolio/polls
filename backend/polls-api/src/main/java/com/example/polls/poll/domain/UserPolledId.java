package com.example.polls.poll.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@EqualsAndHashCode
@Embeddable
public class UserPolledId implements Serializable {

    @Column(name = "user_no")
    private Long userNo;

    @Column(name = "poll_no")
    private Long pollNo;

    @Column(name = "item_no")
    private Integer itemNo;

    protected UserPolledId() {}

    public UserPolledId(Long userNo, Long pollNo, Integer itemNo) {
        this.userNo = userNo;
        this.pollNo = pollNo;
        this.itemNo = itemNo;
    }

}
