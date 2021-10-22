import { Reservation, Term } from "@afes-website/docs";

const parseRsvId = (rsvId: string): Reservation => {
  const dayNo = +rsvId.charAt(2);
  const termNo = +rsvId.charAt(3);
  const member_all = +rsvId.charAt(4);

  return {
    id: rsvId,
    term: getTerm(`Day${dayNo}-Term${termNo}`),
    member_all: member_all,
    member_checked_in: 0,
  };
};

const getTerm = (id: string): Term =>
  id in terms
    ? terms[id]
    : {
        id: "-",
        // 開催期間すべて
        enter_scheduled_time: "2021-11-13T09:00:00+09:00",
        exit_scheduled_time: "2021-11-14T15:30:00+09:00",
        guest_type: "GuestWhite",
      };

const terms: { [termId: string]: Term } = {
  "Day1-Term1": {
    id: "Day1-Term1",
    enter_scheduled_time: "2021-11-13T09:00:00+09:00",
    exit_scheduled_time: "2021-11-13T11:00:00+09:00",
    guest_type: "GuestBlue",
  },
  "Day1-Term2": {
    id: "Day1-Term2",
    enter_scheduled_time: "2021-11-13T09:30:00+09:00",
    exit_scheduled_time: "2021-11-13T11:30:00+09:00",
    guest_type: "GuestRed",
  },
  "Day1-Term3": {
    id: "Day1-Term3",
    enter_scheduled_time: "2021-11-13T10:00:00+09:00",
    exit_scheduled_time: "2021-11-13T12:00:00+09:00",
    guest_type: "GuestYellow",
  },
  "Day1-Term4": {
    id: "Day1-Term4",
    enter_scheduled_time: "2021-11-13T12:30:00+09:00",
    exit_scheduled_time: "2021-11-13T14:30:00+09:00",
    guest_type: "GuestBlue",
  },
  "Day1-Term5": {
    id: "Day1-Term5",
    enter_scheduled_time: "2021-11-13T13:00:00+09:00",
    exit_scheduled_time: "2021-11-13T15:00:00+09:00",
    guest_type: "GuestRed",
  },
  "Day1-Term6": {
    id: "Day1-Term6",
    enter_scheduled_time: "2021-11-13T13:30:00+09:00",
    exit_scheduled_time: "2021-11-13T15:30:00+09:00",
    guest_type: "GuestYellow",
  },
  "Day2-Term1": {
    id: "Day2-Term1",
    enter_scheduled_time: "2021-11-14T09:00:00+09:00",
    exit_scheduled_time: "2021-11-14T11:00:00+09:00",
    guest_type: "GuestBlue",
  },
  "Day2-Term2": {
    id: "Day2-Term2",
    enter_scheduled_time: "2021-11-14T09:30:00+09:00",
    exit_scheduled_time: "2021-11-14T11:30:00+09:00",
    guest_type: "GuestRed",
  },
  "Day2-Term3": {
    id: "Day2-Term3",
    enter_scheduled_time: "2021-11-14T10:00:00+09:00",
    exit_scheduled_time: "2021-11-14T12:00:00+09:00",
    guest_type: "GuestYellow",
  },
  "Day2-Term4": {
    id: "Day2-Term4",
    enter_scheduled_time: "2021-11-14T12:30:00+09:00",
    exit_scheduled_time: "2021-11-14T14:30:00+09:00",
    guest_type: "GuestBlue",
  },
  "Day2-Term5": {
    id: "Day2-Term5",
    enter_scheduled_time: "2021-11-14T13:00:00+09:00",
    exit_scheduled_time: "2021-11-14T15:00:00+09:00",
    guest_type: "GuestRed",
  },
  "Day2-Term6": {
    id: "Day2-Term6",
    enter_scheduled_time: "2021-11-14T13:30:00+09:00",
    exit_scheduled_time: "2021-11-14T15:30:00+09:00",
    guest_type: "GuestYellow",
  },
};

export default parseRsvId;
