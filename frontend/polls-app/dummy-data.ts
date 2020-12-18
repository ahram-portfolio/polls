export const dummy = {
  polls: {
    contents: [
      {
        id: 3,
        subject: "투표 3",
        period: {
          beginDate: "2021-01-01",
          endDate: "2021-10-30",
          koStatus: "시작 전"
        },
        creator: "아루"
      },
      {
        id: 2,
        subject: "투표 2",
        period: {
          beginDate: "2020-01-01",
          endDate: "2020-12-31",
          koStatus: "진행중"
        },
        creator: "테스형"
      },
      {
        id: 1,
        subject: "투표 1",
        period: {
          beginDate: "2020-01-01",
          endDate: "2020-10-30",
          koStatus: "종료"
        },
        creator: "늘네생각만해"
      }
    ],
    page: 0,
    totalPages: 2
  },
  poll: {
    id: 1,
    subject: '나는 누구인가',
    period: {
      beginDate: '2020-10-01',
      endDate: '2020-12-31',
      koStatus: '진행중'
    },
    creator: '늘네생각만해',
    polled: {
      totalCnt: 3,
      items: [
        { ordering: 1, content: '굿걸', cnt: 1, isPolled: true },
        { ordering: 2, content: '굿보이', cnt: 2, isPolled: false },
        { ordering: 3, content: '배드걸', cnt: 0, isPolled: false },
        { ordering: 4, content: '배드보이', cnt: 0, isPolled: false }
      ]
    }
  },
  user: {
    id: 1,
    name: "늘네생각만해"
  }
}
