package com.example.polls.poll.domain;


import lombok.Getter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "user_polled")
public class UserPolled {

    @EmbeddedId
    private UserPolledId id;

    protected UserPolled() {}

    public UserPolled(UserPolledId id) {
        this.id = id;
    }

}
