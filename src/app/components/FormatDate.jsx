import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');

export function FormatDate(dateString) {
  return dayjs(dateString).format('DD MMMM YYYY, HH:mm');
}
