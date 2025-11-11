import { UPDATE } from '../Helpers/constants';

const initialState = {
  loader: 0,
  auth: 0,
  alert: 0,
  menu: 0,
  userinfo: 0,
  dictionary: 0,
  lang: 0,
  app_navigation: 0,
};

function update(state) {
  return state + 1;
}

function updateReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE.LANG:
      return {
        ...state,
        lang: update(state.lang),
      };
    case UPDATE.DICTIONARY:
      return {
        ...state,
        dictionary: update(state.dictionary),
      };
    case UPDATE.USERINFO:
      return {
        ...state,
        userinfo: update(state.userinfo),
      };
    case UPDATE.APP_NAVIGATION:
      return {
        ...state,
        app_navigation: update(state.app_navigation),
      };
    case UPDATE.LOADER:
      return {
        ...state,
        loader: update(state.loader),
      };
    case UPDATE.AUTH:
      return {
        ...state,
        auth: update(state.auth),
      };
    case UPDATE.ALERT:
      return {
        ...state,
        alert: update(state.alert),
      };
    case UPDATE.MENU:
      return {
        ...state,
        menu: update(state.menu),
      };

    default:
      return state;
  }
}

export default updateReducer;
