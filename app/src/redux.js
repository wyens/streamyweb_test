import { createStore } from 'redux';
import updateReducer from './reducers/updateReducer';

const store = createStore(updateReducer);

export default store;
