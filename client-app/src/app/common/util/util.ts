import { format } from 'date-fns';
import agent from '../../api/agent';

export const combineDateAndTime = (date: Date, time: Date) => {
    return new Date(`${format(date, "YYYY-MM-dd")} ${format(time, "HH:mm")}:00`);
};