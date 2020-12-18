package com.example.polls.poll.ui;

import com.example.polls.common.domain.PeriodDate;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Size;
import java.util.List;

@Getter
public class PollForm {

    @Length(min = 1, max = 100, message = "{poll.subject.length}")
    private String subject;

    @Size(min = 2, max = 5, message = "{poll.items.size}")
    private List<String> items;

    private PeriodDate period;


    protected PollForm() {}

    public PollForm(String subject, List<String> items, PeriodDate period) {
        this.subject = subject;
        this.items = items;

        if (period == null)
            period = new PeriodDate(null, null);
        this.period = period;
    }
}
