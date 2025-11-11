import { controllers } from '../Controllers/Controllers';
import { capitalize } from './Helpers';

// READ WORD
export const RW = (key: string | undefined) => {
  if (typeof key !== 'string') {
    return key;
  }
  return controllers().language.lang?.r(key);
};

// READ WORD CAPITALIZE
export const RWC = (key: string | undefined) => {
  if (typeof key !== 'string') {
    return key;
  }
  return capitalize(controllers().language.lang?.r(key));
};
