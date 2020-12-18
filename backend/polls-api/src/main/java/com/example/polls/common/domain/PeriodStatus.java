package com.example.polls.common.domain;

public enum PeriodStatus {
    BEFORE ("시작 전"),
    ING ("진행중"),
    AFTER ("종료");

    private String koStatus;

    PeriodStatus(String koStatus) { this.koStatus = koStatus; }

    public String getKoStatus() { return this.koStatus; }
}
