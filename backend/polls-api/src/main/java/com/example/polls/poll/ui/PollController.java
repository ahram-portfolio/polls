package com.example.polls.poll.ui;

import com.example.polls.common.exception.NotPresentEntityException;
import com.example.polls.common.ui.PageView;
import com.example.polls.poll.domain.Poll;
import com.example.polls.poll.domain.PollItem;
import com.example.polls.poll.domain.PollRepository;
import com.example.polls.poll.domain.UserPolledRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Transactional(readOnly = true)
@RestController
public class PollController {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private UserPolledRepository userPolledRepository;



    @GetMapping(value = "/polls")
    public ResponseEntity<PageView<PollView>> search(
        @PageableDefault Pageable pageable
    ) {
        Page<PollView> pollViewPage = pollRepository.findAll(
            PageRequest.of(
                pageable.getPageNumber(),
                11,
                Sort.by(
                    Sort.Direction.DESC,
                    "pollNo"
                )
            )
        )
        .map(PollView::new);

        return new ResponseEntity<>(
                new PageView<>(pollViewPage),
                HttpStatus.OK
        );
    }


    @GetMapping(value = "/polls/{pollNo}")
    public ResponseEntity<Map> get(
        @PathVariable(value = "pollNo") Long pollNo
    ) {
        // TODO Login 기능 개발 후
        // userNo: Authentication 정보로 변경
        Long userNo = 1L;

        Optional<Poll> pollOptional = pollRepository.findById(pollNo);
        if (!pollOptional.isPresent())
            throw new NotPresentEntityException("투표");

        Poll poll = pollOptional.get();

        List<PollItemView> itemViews
                = poll.getItems().stream()
                .map(item -> {
                    List<Long> polledUserNos = userPolledRepository.findAllUserNosByPollNoAndItemNo(pollNo, item.getItemNo());

                    return new PollItemView(
                        item.getContent(),
                        item.getItemNo(),
                        polledUserNos.size(),
                        polledUserNos.contains(userNo)
                    );
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(
            new HashMap() {{
                put("id", poll.getPollNo());
                put("subject", poll.getSubject());
                put("period", poll.getPeriod());
                put(
                    "creator",
                    (poll.getCreator() != null) ? poll.getCreator().getName() : null
                );
                put(
                    "polled",
                    new HashMap() {{
                        put("totalCnt", userPolledRepository.getPolledTotalCntByPollNo(pollNo));
                        put("items", itemViews);
                    }}
                );
            }},
            HttpStatus.OK
        );
    }
}
