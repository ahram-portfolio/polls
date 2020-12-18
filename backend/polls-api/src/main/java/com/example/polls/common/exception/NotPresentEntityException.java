package com.example.polls.common.exception;

public class NotPresentEntityException extends RuntimeException {

    private String message = "등록되지 않은 정보입니다.";

    public String getMessage() {
        return this.message;
    }

    public NotPresentEntityException() {}
    public NotPresentEntityException(String field) {
        if (field != null) {
            this.message
                    = "등록되지 않은 " + field + "입니다.";
        }
    }
}
