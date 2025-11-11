import store from '../redux';
import { transliterate } from './functions';

export const coreupdate = (type: any) => {
  store.dispatch({ type });
};

export const makeid = (length: number) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const replaceES5 = (s: string, e: string, r: string) => {
  var replaced = s;
  while (replaced.indexOf(e) !== -1) {
    replaced = replaced.replace(e, r);
  }
  return replaced;
};

export const translite = (word: string) => {
  return transliterate(word);
};
