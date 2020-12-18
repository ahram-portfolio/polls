package com.example.polls;

import com.example.polls.common.domain.PeriodDate;
import com.example.polls.common.domain.PeriodStatus;
import com.example.polls.poll.domain.*;
import com.example.polls.user.domain.User;
import com.example.polls.user.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class DataLoader {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private UserPolledRepository userPolledRepository;



    @PostConstruct
    public void loadData() {
        // 사용자와 투표 더미데이터 저장
        List<User> users = userRepository.saveAll(this.getDummyDataOfUsers());
        List<Poll> polls = pollRepository.saveAll(this.getDummyDataOfPolls(users));

        // 투표하기
        this.polled(
                users.stream().map(User::getUserNo).collect(Collectors.toList()),
                polls
        );
    }

    private List<User> getDummyDataOfUsers() {
        return Stream.of(
                new User("늘네생각만해"),
                new User("화이트크리스마스"),
                new User("늘푸른나무"),
                new User("테스형"),
                new User("아리언니"),
                new User("느긋한선비"),
                new User("아루야"),
                new User("치느님"),
                new User("핏쨔"),
                new User("댕댕이")
        ).collect(Collectors.toList());
    }

    private List<Poll> getDummyDataOfPolls(List<User> users) {
        return Stream.of(
                new Poll(
                        "1. 나는 누구인가",
                        new PeriodDate(LocalDate.of(2020, 1, 1), LocalDate.of(2020, 1, 31)),
                        users.get(0),
                        Stream.of(
                                new PollItem(1, "굿보이"),
                                new PollItem(2, "굿걸"),
                                new PollItem(3, "배드보이"),
                                new PollItem(4, "배드걸")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "2. 너는 누구?",
                        new PeriodDate(LocalDate.of(2020, 2, 1), LocalDate.of(2020, 12, 28)),
                        users.get(1),
                        Stream.of(
                                new PollItem(1, "굿보이"),
                                new PollItem(2, "굿걸"),
                                new PollItem(3, "배드보이"),
                                new PollItem(4, "배드걸"),
                                new PollItem(5, "사람")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "3. 오늘 날씨는 어떨까요?",
                        new PeriodDate(LocalDate.of(2020, 3, 1), LocalDate.of(2020, 12, 31)),
                        users.get(2),
                        Stream.of(
                                new PollItem(1, "맑음"),
                                new PollItem(2, "흐림"),
                                new PollItem(3, "눈"),
                                new PollItem(4, "비"),
                                new PollItem(5, "어정쩡")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "4. 코로나 어때요?",
                        new PeriodDate(LocalDate.of(2020, 4, 1), LocalDate.of(2020, 4, 30)),
                        users.get(3),
                        Stream.of(
                                new PollItem(1, "싫어요"),
                                new PollItem(2, "좋아요"),
                                new PollItem(3, "짜증나요"),
                                new PollItem(4, "우울해요"),
                                new PollItem(4, "화나요")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "5. 자가격리를 잘 하는 법은?",
                        new PeriodDate(LocalDate.of(2020, 5, 1), LocalDate.of(2020, 12, 31)),
                        users.get(4),
                        Stream.of(
                                new PollItem(1, "집콕하기"),
                                new PollItem(2, "온라인 쇼핑하기"),
                                new PollItem(3, "사람 안 만나기"),
                                new PollItem(4, "그냥 돌아다닐까?")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "6. 여행가고 싶은 곳은?",
                        new PeriodDate(LocalDate.of(2020, 6, 1), LocalDate.of(2020, 6, 30)),
                        users.get(5),
                        Stream.of(
                                new PollItem(1, "집"),
                                new PollItem(2, "제주도"),
                                new PollItem(3, "도시"),
                                new PollItem(4, "농촌"),
                                new PollItem(5, "바다")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "7. 보고싶은 사람은?",
                        new PeriodDate(LocalDate.of(2020, 7, 1), LocalDate.of(2020, 12, 31)),
                        users.get(6),
                        Stream.of(
                                new PollItem(1, "연인"),
                                new PollItem(2, "엄마"),
                                new PollItem(3, "아빠"),
                                new PollItem(4, "자식"),
                                new PollItem(5, "조부모")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "8. 제일 좋아하는 음식은?",
                        new PeriodDate(LocalDate.of(2020, 8, 1), LocalDate.of(2020, 8, 31)),
                        users.get(7),
                        Stream.of(
                                new PollItem(1, "짜장면/짬뽕"),
                                new PollItem(2, "족발"),
                                new PollItem(3, "스시"),
                                new PollItem(4, "한정식"),
                                new PollItem(5, "쌀국수")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "9. 하루 적정 공부 시간은?",
                        new PeriodDate(LocalDate.of(2020, 9, 1), LocalDate.of(2020, 9, 30)),
                        users.get(8),
                        Stream.of(
                                new PollItem(1, "1시간 미만"),
                                new PollItem(2, "1 ~ 3시간"),
                                new PollItem(3, "3 ~ 6시간"),
                                new PollItem(4, "6 ~ 9시간"),
                                new PollItem(5, "9시간 이상")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "10. 좋아하는 언어는?",
                        new PeriodDate(LocalDate.of(2020, 10, 1), LocalDate.of(2020, 12, 31)),
                        users.get(9),
                        Stream.of(
                                new PollItem(1, "Angular"),
                                new PollItem(2, "Typescript"),
                                new PollItem(3, "React"),
                                new PollItem(4, "Vue.js"),
                                new PollItem(5, "JAVA")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "11. 모르는 것이 나타났다!!!",
                        new PeriodDate(LocalDate.of(2020, 10, 1), LocalDate.of(2020, 12, 31)),
                        users.get(0),
                        Stream.of(
                                new PollItem(1, "공식 레퍼런스"),
                                new PollItem(2, "도서"),
                                new PollItem(3, "동료"),
                                new PollItem(4, "지인"),
                                new PollItem(5, "온라인 강의")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "12. 제일 어려운 작업은?",
                        new PeriodDate(LocalDate.of(2020, 10, 1), LocalDate.of(2020, 12, 31)),
                        users.get(0),
                        Stream.of(
                                new PollItem(1, "기획"),
                                new PollItem(2, "디자인/퍼블리싱"),
                                new PollItem(3, "프론트엔드"),
                                new PollItem(4, "백엔드"),
                                new PollItem(5, "인프라")
                        ).collect(Collectors.toList())
                ),
                new Poll(
                        "13. 2021년 새해 소망은?",
                        new PeriodDate(LocalDate.of(2021, 1, 1), LocalDate.of(2021, 1, 31)),
                        users.get(0),
                        Stream.of(
                                new PollItem(1, "건강"),
                                new PollItem(2, "자아성취"),
                                new PollItem(3, "로또"),
                                new PollItem(4, "애정")
                        ).collect(Collectors.toList())
                )
        ).collect(Collectors.toList());
    }

    private void polled(List<Long> userNos, List<Poll> polls) {
        polls.stream()
            .filter(e -> !e.getPeriod().getStatus().equals(PeriodStatus.BEFORE))
            .forEach(poll-> {
                userPolledRepository.saveAll(
                    userNos.stream()
                        .map(userNo -> new UserPolled(
                                new UserPolledId(
                                    userNo,
                                    poll.getPollNo(),
                                    this.getRandomNumberUsingInts(poll.getItems().size()))
                            )
                        )
                        .collect(Collectors.toList())
                );
            });
    }

    private int getRandomNumberUsingInts(int max) {
        int min = 1;
        Random random = new Random();

        return random.ints(min, max)
                .findFirst()
                .getAsInt();
    }
}
