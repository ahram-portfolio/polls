package com.example.polls.poll.domain;

import com.example.polls.poll.ui.PollItemView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserPolledRepository extends JpaRepository<UserPolled, UserPolledId>, JpaSpecificationExecutor  {


    // 총 투표 수
    @Query(
        "select count(p) " +
        "from UserPolled p " +
        "where p.id.pollNo = ?1 "
    )
    Integer getPolledTotalCntByPollNo(Long pollNo);

    @Query(
            "select distinct(p.id.userNo) " +
            "from UserPolled p " +
            "where p.id.pollNo = ?1 and p.id.itemNo = ?2"
    )
    List<Long> findAllUserNosByPollNoAndItemNo(Long pollNo, Integer itemNo);


    @Transactional
    @Modifying
    @Query(
        "delete " +
        "from UserPolled p " +
        "where p.id.pollNo = ?1 and p.id.userNo = ?2"
    )
    void deleteAllByPollNoAndUserNo(Long pollNo, Long userNo);

}
