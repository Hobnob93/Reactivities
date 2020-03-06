import { format } from 'date-fns';

export const combineDateAndTime = (date: Date, time: Date) => {
    return new Date(`${format(date, "YYYY-MM-dd")} ${format(time, "HH:mm")}:00`);
};