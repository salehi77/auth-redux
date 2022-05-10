import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_FETCHING,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../types/auth";

import { loginApi, signupApi } from "../../Api";

// login actions
const loginFetching = () => ({ type: LOGIN_FETCHING });
const loginSuccess = (res: any) => ({ type: LOGIN_SUCCESS, payload: res });
const loginFail = (error: any) => ({ type: LOGIN_FAIL, payload: error });

export const loginAction =
  (data: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(loginFetching());

    const body = { email: data.email, password: data.password };
    return loginApi(body)
      .then(async (res) => {
        await dispatch(loginSuccess(res));

        if (data.remember) {
          localStorage.setItem("auth", JSON.stringify(res));
        } else {
          sessionStorage.setItem("auth", JSON.stringify(res));
        }

        return res;
      })
      .catch(async (error) => {
        await dispatch(loginFail(error));
        return Promise.reject(error);
      });
  };

// signup actions
const signupFetching = () => ({ type: SIGNUP_FETCHING });
const signupSuccess = (res: any) => ({ type: SIGNUP_SUCCESS, payload: res });
const signupFail = (error: any) => ({ type: SIGNUP_FAIL, payload: error });

export const signupAction =
  (data: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(signupFetching());

    const body = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    };
    return signupApi(body)
      .then(async (res) => {
        await dispatch(signupSuccess(res));

        if (data.remember) {
          localStorage.setItem("auth", JSON.stringify(res));
        } else {
          sessionStorage.setItem("auth", JSON.stringify(res));
        }

        return res;
      })
      .catch(async (error) => {
        await dispatch(signupFail(error));
        return Promise.reject(error);
      });
  };

// logout actions
export const logoutAction =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    await dispatch({ type: LOGOUT });
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
  };

// login from storage
export const loginStorage =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const auth = localStorage.getItem("auth") || sessionStorage.getItem("auth");

    if (auth) {
      try {
        await dispatch(loginSuccess(JSON.parse(auth)));
      } catch (e) {
        await dispatch({ type: LOGOUT });
      }
    } else {
      await dispatch({ type: LOGOUT });
    }
  };
