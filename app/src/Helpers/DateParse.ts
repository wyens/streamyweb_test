export const DateParse = (serverDate: string): Date => {
    if(serverDate === undefined || serverDate === null){
        return new Date(0)
    }
    const dates = serverDate.split(' ').join('T')
    return new Date(dates)
}

export const minTen = (some: number) => {
    return some < 10 ? `0${some}` : `${some}`
}

export const DateToDateString = (date: Date) => {
    return `${minTen(date.getDate())}.${minTen(date.getMonth()+1)}.${date.getFullYear()}`
}

export const DateToTimeString = (date: Date) => {
    return `${minTen(date.getHours())}:${minTen(date.getMinutes())}`
}


export const ServerDate = (serverString: string) => {
    return DateToDateString(DateParse(serverString))
}
export const ServerTime = (serverString: string) => {
    return DateToTimeString(DateParse(serverString))
}

export const dayDifferenceFromNow = (date: Date) => {
    const dateNow = new Date()
    if(date<dateNow){
        return '0'
    }
    const milisecondsDifference = date.getTime() - dateNow.getTime()
    return Math.ceil(milisecondsDifference/(1000*60*60*24))
}

export const dayDifference = (date: Date) => {
    const dateNow = new Date()
    return dateNow.getDay()===date.getDay() ? 0 : 1
}

export const timeParse = (some: string) => {
    try {
        const times = some.split(':')
        return parseInt(times[0])*60+parseInt(times[1])
    } catch(e){
        return 0
    }
}

export const dateToTimerFormat = (date: Date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
} 

export const hourseAndMinutesNow = () =>{
    const newDate = new Date()
    return `${newDate.getHours()}:${newDate.getMinutes()}`
}

export const HMOnTime = () =>{
    return timeParse(hourseAndMinutesNow())
}

export const secondsToMinutes = (sec: number) => {
    const seconds = typeof sec === "string" ? parseInt(sec) : sec
    if(typeof seconds !== "number"){
        console.log('Not number', seconds)
        return seconds
    }
    // less than hour
    return seconds/60
}

// export const formatSecondsToTime = (totalSeconds:number) => {
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
  
//     const formattedHours = String(hours).padStart(2, '0');
//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(seconds).padStart(2, '0');
  
//     return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
//   }

export const formatSecondsToTime = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds / 86400); // 1 day = 24 * 60 * 60 seconds
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const timeParts = [];
    if (days > 0) {
      timeParts.push(`${days}d`);
    }
    if (hours > 0) {
      timeParts.push(`${hours}h`);
    }
    if (minutes > 0) {
      timeParts.push(`${minutes}m`);
    }
    if (seconds > 0) {
      timeParts.push(`${seconds}s`);
    }
  
    return timeParts.join(' ') || '0s'; // Return "0s" if no time parts are greater than 0
  };