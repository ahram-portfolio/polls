package com.example.polls.poll.domain;

import com.example.polls.common.domain.PeriodDate;
import com.example.polls.user.domain.User;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "polls")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "poll_no")
    private Long pollNo;

    @Column(name = "subject")
    private String subject;

    @Embedded
    private PeriodDate period;

    @ManyToOne
    @JoinColumn(name = "creator_no", updatable = false)
    private User creator;

    @ElementCollection
    @CollectionTable(
            name = "poll_items",
            joinColumns = @JoinColumn(name = "poll_no")
    )
    @OrderBy(value = "itemNo")
    private List<PollItem> items = new ArrayList<>();


    protected Poll() {}

    public Poll(String subject, PeriodDate period, User creator, List<PollItem> items) {
        this.subject = subject;
        this.period = period;
        this.creator = creator;
        this.items = items;
    }

}
