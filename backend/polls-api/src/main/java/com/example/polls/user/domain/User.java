package com.example.polls.user.domain;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Long userNo;

    @Column(name = "name")
    private String name;


    protected User() {}

    public User(Long userNo, String name) {
        this.userNo = userNo;
        this.name = name;
    }

    public User(String name) {
        this.name = name;
    }
}
