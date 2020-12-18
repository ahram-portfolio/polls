package com.example.polls.common.exception;

public class PeriodException extends RuntimeException {

    private String message = "기간을 확인해주세요.";

    public String getMessage() {
        return this.message;
    }

    public PeriodException() {}
    public PeriodException(String field) {
        if (field != null) {
            this.message
                =  field + "할 수 있는 기간이 아닙니다.";
        }
    }
}
