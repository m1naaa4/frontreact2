export const capitalizeFirst = str =>{
    if (! str && str !== 0) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const relativeTimeFilter = value =>{
    return moment.utc(value).local().locale('en-short').fromNow();
}

/**
 * Format the given date as a timestamp.
 */
export const dateTimeFilter = value =>{
    return moment.utc(value).local().format('MMMM Do, YYYY h:mm A');
}

/**
 * Format the given date.
 */
 export const dateFilter = value =>{
    return moment.utc(value).local().format('MMMM Do, YYYY');
}