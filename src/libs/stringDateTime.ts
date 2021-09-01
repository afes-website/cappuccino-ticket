import "moment/locale/ja";
import moment from "moment";

export const stringDate = (timestamp: string): string =>
  moment(timestamp).format("M 月 D 日（dd）");

export const stringTime = (timestamp: string): string =>
  moment(timestamp).format("H:mm");
