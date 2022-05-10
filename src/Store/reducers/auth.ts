import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_FETCHING,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../types/auth";

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const auth = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_FETCHING:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...action.payload, loading: false, error: null };
    case LOGIN_FAIL:
      return { token: null, user: null, loading: false, error: action.payload };

    case SIGNUP_FETCHING:
      return { ...state, loading: true };
    case SIGNUP_SUCCESS:
      return { ...action.payload, loading: false, error: null };
    case SIGNUP_FAIL:
      return { token: null, user: null, loading: false, error: action.payload };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default auth;
