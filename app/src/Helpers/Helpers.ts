export const capitalize = (string: any) => {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export function percentage(percent: number, total: number) {
  return (percent / 100) * total;
}
export function numberWithSpaces(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
export function formatDeadLineDate(date: string) {
  let tempDate = new Date(date);
  let fullYear = tempDate.getFullYear().toString();
  return [tempDate.getMonth() + 1, tempDate.getDate(), fullYear.slice(fullYear.length - 2)].join('.');
}
export function months(month: number) {
  switch (month) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sept';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
    default:
      return '';
  }
}
// yyyy-mm-dd to dd/mm
export function getDay(date: string) {
  let datePart = date.match(/\d+/g);
  if (datePart == null) {
    return '';
  }
  return datePart[2];
}
export function getMonth(date: string) {
  let datePart = date.match(/\d+/g);
  if (datePart == null) {
    return '';
  }
  let month = datePart[1];
  let monthNumber = month[0] === '0' ? month[1] : month;
  return months(+monthNumber);
}

export function phoneSpaces(phone: string) {
  try {
    return [phone.slice(0, 2), ' ', phone.slice(2, 5), ' ', phone.slice(5, 7), ' ', phone.slice(7, 9)].join('');
  } catch (ex) {
    return '';
  }
}

export function defaultCompareFn(a: number, b: number) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}



export const slised = (string: string|undefined, maxlength: number) => {
  if(typeof string !== "string"){
    return string
  }
  return string.slice(0, maxlength)+`${string.length>maxlength ? '...' : ''}`
}


export const pronunciation = (count: number, txtArr: Array<string>) => {
  let cases = [2, 0, 1, 1, 1, 2];
  return txtArr[count % 100 > 4 && count % 100 < 20 ? 2 : cases[count % 10 < 5 ? count % 10 : 5]];
}


export const timeToFormat = (time: number) => {
  if(typeof time !== 'number'){
      return time
  }
  if(time<60){
      return getSmallTime(time)
  } else if(time<3600){
      return getMiddleTime(time)
  } else {
      return getBigTime(time)
  }
}

const getSmallTime = (time: number) => {
  if(Math.round(time) === 60){
    return `00:01:00`;
  }
  return `00:00:${tb(time)}`;
}

const getMiddleTime = (time: number) => {
  const minutes = Math.floor(time/60);
  const seconds = time - minutes * 60;
  if(Math.round(seconds) === 60){
    return `00:${tb(minutes+1)}:00`
  }
  return `00:${tb(minutes)}:${tb(seconds)}`
}

const getBigTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours*3600)/60);
  const seconds = time - minutes * 60 - hours*3600;
  return `${tb(hours)}:${tb(minutes)}:${tb(seconds)}`
}

//time beautify
const tb = (val: number) => {
  val = Math.round(val)
  return val<10 ? `0${val}`:`${val}`
}

export const makeSimplyName = (name: any) => {
  if(typeof name !== "string"){
    return name
  }
  // console.log("name", name)
  const replaced = replaceStringAll(name,[[' ','__'],[',', '%2C'],['&','%26'],['!','%21']])
  // console.log("name replaced", replaced)
  return replaced
}

export const decodeSimplyName = (name: any) => {
  if(typeof name !== "string"){
    return name
  }
  return replaceString(name,'__', ' ')
}

export const replaceStringAll = (str:string, inputs: Array<any>) => {
  try{
    var retString = str
    inputs.forEach(inp=> {
      retString = replaceString(retString,inp[0],inp[1])
    })
    return retString
  } catch(e){
    return str
  }
}

export const replaceString = (str: string, search: string, replace: string) => {
  if(typeof str !== "string"){
    return str
  }
  // @ts-ignore
  if(typeof str.replaceAll === "function"){
    // @ts-ignore
    return str.replaceAll(search, replace)
  } else {
    return replaceES5(str,search,replace)
  }
}

export const replaceES5 = (s: string, e: string, r: string) => {
    var replaced = s
    while(replaced.indexOf(e)!==-1){
        replaced = replaced.replace(e,r)
    }
    return replaced
}


export const stringParser = (strnum: string|number): number => {
  return typeof strnum === "string" ? parseInt(strnum) : strnum
}
