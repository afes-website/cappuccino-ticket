import { Reservation, Term } from "@afes-website/docs";
import { isList, isNumber, isObject, isString } from "typescanner";

const RSV_LS_KEY = "reservation";

export const getReservationFromLS = (): Reservation | null => {
  const lsItem = localStorage.getItem(RSV_LS_KEY);
  if (!lsItem) return null;

  const obj = JSON.parse(lsItem);
  return isReservation(obj) ? obj : null;
};

export const setReservationToLS = (value: Reservation | null): void => {
  localStorage.setItem(RSV_LS_KEY, JSON.stringify(value));
};

export const isReservation = (value: unknown): value is Reservation =>
  isObject(value) &&
  isString(value.id) &&
  isTerm(value.term) &&
  isNumber(value.member_all) &&
  isNumber(value.member_checked_in);

export const isTerm = (value: unknown): value is Term =>
  isObject(value) &&
  isString(value.id) &&
  isString(value.enter_scheduled_time) &&
  isString(value.exit_scheduled_time) &&
  isList(value.guest_type, guestTypeList);

const guestTypeList = [
  "GuestBlue",
  "GuestRed",
  "GuestYellow",
  "GuestGreen",
  "GuestPurple",
  "GuestOrange",
  "GuestWhite",
  "StudentGray",
  "TestBlue",
  "TestRed",
  "TestYellow",
];
