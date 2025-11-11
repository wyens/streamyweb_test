

export const parseBetweens = (some:string) => {
    try{
        const betweens = some.split(' - ')
        return betweens
    } catch {
        return null
    }
}

export const timeParse = (some: string) => {
    try {
        const times = some.split(':')
        // console.error("SOME", some, "TIMES", times, "RESULT", parseInt(times[0])*60+parseInt(times[1]))
        return (parseInt(times[0])*60)+parseInt(times[1])
    } catch(e){
        return 0
    }
}

export const hourseAndMinutesNow = () =>{
    const newDate = new Date()
    return `${newDate.getHours()}:${newDate.getMinutes()}`
}

export const HMOnTime = () =>{
    return timeParse(hourseAndMinutesNow())
}


export const dayDifference = (date: Date) => {
    const dateNow = new Date()
    return dateNow.getDay()===date.getDay() ? 0 : 1
}

export const dayDifferenceFromString = (dateString: string) => {
  const dateNow = new Date();
  
  // Parse as local date to avoid timezone issues
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  // Reset time to midnight for accurate day comparison
  dateNow.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  // Calculate difference in days
  const diffTime = date.getTime() - dateNow.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}


export const convertMinutesToHoursAndMinutes = (minutes: number) => {
    if (minutes < 0) {
      return 'Invalid input';
    }
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    const hoursText = hours > 0 ? `${hours}h` : '';
    const minutesText = remainingMinutes > 0 ? ` ${remainingMinutes}m` : '';
  
    return hoursText + minutesText;
  }