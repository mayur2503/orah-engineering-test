import { DateTime } from "luxon";

export const formatDate = (date:string,format?:string) => {
    return DateTime.fromISO(date)
        .setLocale('fr')
        .toFormat(format?format:'D t');
}