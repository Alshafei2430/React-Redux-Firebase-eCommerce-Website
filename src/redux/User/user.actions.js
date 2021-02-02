import { auth, handleUserProfile, GoogleProvider } from "../../firebase/utils";

import userTypes from "./user.types";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const resetAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});
export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true,
    });
  } catch (err) {
    handleSignInErrors(err, dispatch);
  }
};

export const signUpUser = ({
  email,
  password,
  confirmPassword,
  displayName,
}) => async (dispatch) => {
  if (password !== confirmPassword) {
    const err = { message: "Password doesn't match" };
    handleSignUpErrors(err, dispatch);

    return;
  }
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    await handleUserProfile(user, { displayName });
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true,
    });
  } catch (err) {
    handleSignUpErrors(err, dispatch);
  }
};

export const resetPassword = ({ email }) => async (dispatch) => {
  try {
    const config = {
      url: "http://localhost:3000/login",
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD,
          payload: true,
        });
      })
      .catch(() => {
        const err = { message: "Email not found. Please try again" };
        handleReserPasswordErrors(err, dispatch);
      });
  } catch (error) {
    //   console.log(error);
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const handleSignUpErrors = (err, dispatch) => {
  const { message } = err;
  dispatch({
    type: userTypes.SIGN_UP_ERRORS,
    payload: message,
  });
};
const handleSignInErrors = (err, dispatch) => {
  const { message } = err;
  dispatch({
    type: userTypes.SIGN_IN_ERRORS,
    payload: message,
  });
};
const handleReserPasswordErrors = (err, dispatch) => {
  const { message } = err;
  dispatch({
    type: userTypes.RESET_PASSWORD_ERRORS,
    payload: message,
  });
};
