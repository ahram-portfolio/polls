package com.example.polls.common.domain;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Embeddable
public class PeriodDate {

    @Column(name = "begin_at")
    private LocalDate beginDate;

    @Column(name = "end_at")
    private LocalDate endDate;

    protected PeriodDate() {}

    public PeriodDate(LocalDate beginDate, LocalDate endDate) {
        if (beginDate == null)
            beginDate = LocalDate.now();
        this.beginDate = beginDate;

        if (endDate == null)
            endDate = LocalDate.of(9999, 12, 31);
        this.endDate = endDate;
    }

    public PeriodStatus getStatus() {
        LocalDate today = LocalDateTime.now().toLocalDate();

        if (this.beginDate.isAfter(today)) {
            return PeriodStatus.BEFORE;

        } else if (this.endDate.isBefore(today)) {
            return PeriodStatus.AFTER;

        } else {
            return PeriodStatus.ING;
        }

    }

    public String getKoStatus() {
        return this.getStatus().getKoStatus();
    }

}
