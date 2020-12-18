package com.example.polls.poll.app;

import com.example.polls.common.domain.PeriodStatus;
import com.example.polls.common.exception.NotPresentEntityException;
import com.example.polls.common.exception.PeriodException;
import com.example.polls.poll.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PolledService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private UserPolledRepository userPolledRepository;

    @Transactional
    public void polled(
        Long userNo,
        Long pollNo,
        List<Integer> itemNos
    ) {
        Optional<Poll> pollOptional = pollRepository.findById(pollNo);
        if (!pollOptional.isPresent())
            throw new NotPresentEntityException("투표");

        if (!pollOptional.get().getPeriod().getStatus().equals(PeriodStatus.ING))
            throw new PeriodException("투표");

        userPolledRepository.deleteAllByPollNoAndUserNo(pollNo, userNo);

        userPolledRepository.saveAll(
                itemNos.stream()
                .map(itemNo -> new UserPolled(
                        new UserPolledId(
                                userNo,
                                pollNo,
                                itemNo
                        )
                ))
                .collect(Collectors.toList())
        );
    }
}
