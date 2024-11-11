import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export const formatDate = (date: Date) => {
  const dayjsDate = dayjs(date);
  return dayjsDate.format("YYYY-MM-DD HH:mm");
};
