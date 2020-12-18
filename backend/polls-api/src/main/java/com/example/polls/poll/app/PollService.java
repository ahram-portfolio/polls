package com.example.polls.poll.app;

import com.example.polls.common.domain.PeriodDate;
import com.example.polls.common.exception.NotPresentEntityException;
import com.example.polls.poll.domain.Poll;
import com.example.polls.poll.domain.PollItem;
import com.example.polls.poll.domain.PollRepository;
import com.example.polls.poll.ui.PollForm;
import com.example.polls.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Transactional
    public Poll create(
        Long userNo,
        PollForm pollForm
    ) {
        List<String> items = pollForm.getItems().stream()
                .distinct()
                .collect(Collectors.toList());

        return pollRepository.save(
            new Poll(
                pollForm.getSubject(),
                new PeriodDate(
                    pollForm.getPeriod().getBeginDate(),
                    pollForm.getPeriod().getEndDate()
                ),
                (userNo != null) ? new User(userNo, "") : null,
                IntStream.range(0, items.size())
                    .mapToObj(idx -> new PollItem(
                        idx +1,
                        items.get(idx)
                    ))
                    .collect(Collectors.toList())
            )
        );
    }


    @Transactional
    public void delete(long pollNo) {
        Optional<Poll> pollOptional = pollRepository.findById(pollNo);

        if (!pollOptional.isPresent())
            throw new NotPresentEntityException("투표");

        pollRepository.delete(pollOptional.get());
    }

}
